import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-catch-black min-h-screen">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="bg-catch-black flex items-end section-padding pt-36 pb-16">
        <div>
          <p className="label-xs text-catch-muted mb-4">The Brand</p>
          <h1 className="heading-display text-6xl md:text-8xl leading-none">
            About
            <br />
            CATCH
          </h1>
        </div>
      </section>

      {/* ─── MISSION ──────────────────────────────────────── */}
      <section className="section-padding py-20 md:py-28 max-w-4xl">
        <p className="label-xs text-catch-muted mb-6">Our Mission</p>
        <p className="heading-display text-3xl md:text-5xl leading-tight text-catch-light">
          &ldquo;CATCH was built for the man who moves through the world
          with intention — who demands more from his wardrobe than
          just clothing.&rdquo;
        </p>
      </section>

      {/* ─── FOUNDER STORY ────────────────────────────────── */}
      <section className="section-padding pb-20 md:pb-28 border-t border-catch-mid pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Founder Photo */}
          <div className="relative aspect-[3/4] overflow-hidden bg-catch-gray">
            <Image
              src="/founder.jpg"
              alt="Mirlan — Founder of CATCH"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-catch-black/80 to-transparent p-6">
              <p className="heading-display text-xl text-catch-white">Mirlan</p>
              <p className="label-xs text-catch-muted mt-1">Founder &amp; Creative Director</p>
            </div>
          </div>

          {/* Story Text */}
          <div>
            <p className="label-xs text-catch-muted mb-4">The Founder</p>
            <h2 className="heading-display text-3xl md:text-4xl mb-6">
              Born from a desire
              <br />
              for something real.
            </h2>
            <div className="space-y-4 text-catch-muted text-sm leading-relaxed">
              <p>
                CATCH started with a simple question: why does premium quality have to
                mean losing your identity? Too many luxury brands ask you to dress like
                them. I built CATCH to help you dress like you.
              </p>
              <p>
                Every piece in the CATCH collection is designed with one man in mind
                — the modern man who values craft, comfort, and edge in equal measure.
                No excess. No noise. Just the pieces that belong in your wardrobe forever.
              </p>
              <p>
                We source our fabrics from mills in Portugal, Italy, and Japan.
                We work with craftsmen who take their time, because I believe
                the details are the difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────── */}
      <section className="bg-catch-dark border-y border-catch-mid section-padding py-16 md:py-24">
        <p className="label-xs text-catch-muted mb-10">What We Stand For</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "Quality First",
              body: "We never compromise on material or construction. Every stitch is intentional.",
            },
            {
              num: "02",
              title: "Men Only",
              body: "CATCH is built exclusively for men. Focused design means better product.",
            },
            {
              num: "03",
              title: "Responsible Craft",
              body: "Sustainable sourcing and ethical manufacturing are non-negotiable for us.",
            },
            {
              num: "04",
              title: "Timeless Style",
              body: "We don't follow trends. We build wardrobe staples that transcend seasons.",
            },
          ].map((val) => (
            <div key={val.num} className="border-t border-catch-mid pt-6">
              <p className="font-mono text-catch-muted text-xs mb-3">{val.num}</p>
              <h3 className="heading-display text-xl mb-3">{val.title}</h3>
              <p className="text-catch-muted text-sm leading-relaxed">{val.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="section-padding py-20 md:py-28 text-center">
        <p className="label-xs text-catch-muted mb-4">Ready to Explore?</p>
        <h2 className="heading-display text-4xl md:text-6xl mb-8">
          Shop the
          <br />
          Collection
        </h2>
        <Link href="/shop" className="btn-primary inline-block">
          View All Products
        </Link>
      </section>
    </div>
  );
}
