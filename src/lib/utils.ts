/** Tiny class-name joiner — avoids pulling in clsx for this. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Splits a headline into words so each can be animated independently. */
export function splitWords(text: string) {
  return text.split(" ").filter(Boolean);
}
