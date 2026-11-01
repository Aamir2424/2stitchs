import type { Metadata } from "next";
import Image from "next/image";
import { getAsset } from "@/src/config/assets";
import { PillLink, SectionHeading } from "@/src/components/site/PageParts";
import { ourStory } from "@/src/content/pages";

export const metadata: Metadata = { title: "Our story | 2Stitchs" };

// Our Story (spec section 3). The design has no Our Story screen, so this page uses the brand's
// own splash composition (reference screen 01: linen texture with the logo centred, logo 290px
// on a 1440 x 809 slide) and the site's heading style. Copy is a placeholder: see
// src/content/pages.ts (`ourStory`).
export default function OurStoryPage() {
  const texture = getAsset("brand.headerTexture");
  const logo = getAsset("brand.logo");

  return (
    <section className="flex flex-col items-center px-4 pt-[39.3px] pb-16">
      <SectionHeading as="h1">{ourStory.title}</SectionHeading>

      <div className="relative mt-[28px] w-full max-w-[720px] overflow-hidden" style={{ aspectRatio: "1440 / 809" }}>
        <Image src={texture.src} alt="" fill sizes="720px" className="object-cover" />
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="absolute top-1/2 left-1/2 h-auto w-[20.17%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="mt-8 w-full max-w-[720px]">
        {ourStory.paragraphs.map((p) => (
          <p key={p} className="text-center text-lead text-ink">
            {p}
          </p>
        ))}
      </div>

      <PillLink href={ourStory.cta.href} className="mt-10">
        {ourStory.cta.label}
      </PillLink>
    </section>
  );
}
