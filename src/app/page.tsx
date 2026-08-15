import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="statement" className="tm-shell py-40">
        <p className="tm-eyebrow">Next up</p>
        <p className="mt-6 max-w-2xl text-lead text-fog">
          Brand statement section lands here.
        </p>
      </section>
    </>
  );
}
