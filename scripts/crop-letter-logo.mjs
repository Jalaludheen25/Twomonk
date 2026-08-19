import sharp from "sharp";

const SRC = "E:/development/Twomonk/public/logos/Two Monk Logo Letter style.png";
const OUT_DIR = "E:/development/Twomonk/public/logos";

const img = sharp(SRC);
const meta = await img.metadata();
console.log("size:", meta.width, "x", meta.height, "channels:", meta.channels);

const { data, info } = await img
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

function rowHasInk(y) {
  const rowStart = y * width * channels;
  for (let x = 0; x < width; x++) {
    const alpha = data[rowStart + x * channels + 3];
    if (alpha > 10) return true;
  }
  return false;
}

const bands = [];
let inBand = false;
let bandStart = 0;
for (let y = 0; y < height; y++) {
  const ink = rowHasInk(y);
  if (ink && !inBand) {
    inBand = true;
    bandStart = y;
  } else if (!ink && inBand) {
    inBand = false;
    bands.push([bandStart, y - 1]);
  }
}
if (inBand) bands.push([bandStart, height - 1]);

console.log(
  "bands found:",
  bands.map(([a, b]) => `${a}-${b} (h=${b - a + 1})`),
);

if (bands.length < 2) {
  throw new Error(`Expected at least 2 text bands, found ${bands.length}`);
}

function colBoundsInRows(y0, y1) {
  let minX = width;
  let maxX = -1;
  for (let y = y0; y <= y1; y++) {
    const rowStart = y * width * channels;
    for (let x = 0; x < width; x++) {
      const alpha = data[rowStart + x * channels + 3];
      if (alpha > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  return [minX, maxX];
}

async function saveCrop(name, y0, y1) {
  const [x0, x1] = colBoundsInRows(y0, y1);
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;
  await sharp(SRC)
    .extract({ left: x0, top: y0, width: w, height: h })
    .png()
    .toFile(`${OUT_DIR}/${name}`);
  console.log(`saved ${name}  ${w}x${h}  (aspect ${(w / h).toFixed(3)})`);
}

// Two-line crop ("two" + "monk") for compact/nav use.
// "two" and "monk" have no fully-transparent row between them (tight rounded
// letterforms), so they land in a single ink band together — band[0] alone is
// exactly "two two + monk" with "Innovations" (band[1]) excluded.
await saveCrop("twomonk-logo-letter-2line.png", bands[0][0], bands[0][1]);

// Full crop (all bands, tight-trimmed), renamed with no spaces, for
// large-format use elsewhere.
await saveCrop("twomonk-logo-letter-full.png", bands[0][0], bands[bands.length - 1][1]);

console.log("done");
