import Image from "next/image";
import Link from "next/link";
import { getAsset } from "@/src/config/assets";
import { PillLink, SectionHeading } from "@/src/components/site/PageParts";
import { DeckPhoto } from "@/src/components/wizard/StepChrome";
import { homeHero, styleSectionTitle, styleTiles } from "@/src/content/pages";

// Home (spec section 3: "/"). Hero from reference screen 02, style row from screen 03.
// Deck geometry (1440px design): hero photo 1440 x 611.8 starting at the top of the promo strip;
// copy column x 951, 408 wide; title box 154px below the photo top, price 210, paragraph 261,
// pill 479. Style row: heading box 60.3px below the section top, seven 197.6 x 297 tiles 7.5px apart.

export default function Home() {
  return (
    <>
      <Hero />
      <StyleRow />
    </>
  );
}

function Hero() {
  return (
    // -mt-strip: the photo starts at the top of the translucent promo strip, as in screen 02.
    <section className="relative -mt-strip flex justify-end overflow-hidden" style={{ aspectRatio: "1440 / 611.8" }}>
      {/* Deck crop: photo scaled to page width, top-aligned (fillRect t -0.292%, b -22.254%). */}
      <DeckPhoto image="home.hero" crop={{ left: 0, top: -0.292, right: 0, bottom: -22.254 }} width={1440} className="-z-0" />
      <div className="relative flex w-[408px] max-w-[calc(100%-32px)] flex-col items-center pt-[154px] pb-10 text-paper mr-gutter max-md:mx-auto">
        {/* translate-y: the deck sets this text lower inside its box (measured on screen 02). */}
        <h1 className="pl-[0.463em] translate-y-[12px] text-center text-display uppercase">{homeHero.title}</h1>
        <p className="pl-[0.463em] translate-y-[6px] text-center text-tagline uppercase">{homeHero.priceLine}</p>
        <p className="mt-[25.5px] text-justify text-lead">{homeHero.paragraph}</p>
        <PillLink href={homeHero.cta.href} className="mt-[25px]">
          {homeHero.cta.label}
        </PillLink>
      </div>
    </section>
  );
}

function StyleRow() {
  return (
    <section className="flex flex-col items-center px-[6.4px] pt-[60.3px] pb-16">
      <SectionHeading>{styleSectionTitle}</SectionHeading>
      <ul className="mt-[27.9px] grid w-full max-w-[1428px] grid-cols-7 gap-x-[7.5px] gap-y-6 max-lg:grid-cols-4 max-sm:grid-cols-2">
        {styleTiles.map((tile) => {
          const asset = getAsset(tile.image);
          if (asset.kind !== "image") throw new Error(`Asset ${tile.image} is not an image.`);
          return (
            <li key={tile.label}>
              <Link
                href={tile.href}
                className="group block outline-offset-4 focus-visible:outline-2 focus-visible:outline-ink"
              >
                <span className="relative block overflow-hidden" style={{ aspectRatio: "197.6 / 297" }}>
                  {/* Design crop: the whole photo, scaled to the tile (fillRect 0 on slide 3). */}
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    sizes="(min-width: 1024px) 198px, (min-width: 640px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                </span>
                <span className="mt-[28.1px] block pl-[0.194em] text-center text-label text-ink uppercase">{tile.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
