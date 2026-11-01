import type { Metadata } from "next";
import Image from "next/image";
import { getAsset } from "@/src/config/assets";
import { PillLink, SectionHeading } from "@/src/components/site/PageParts";
import { howItWorks } from "@/src/content/pages";

export const metadata: Metadata = { title: "How it works | 2Stitchs" };

// How It Works (spec section 3), reference screen 04. Deck geometry below the promo strip:
// heading box at 39.3px, subtitle 4.7px under it; three 299px columns 75.5px apart; number,
// 136.2px icon and label; GET STARTED pill 91px below the labels.
export default function HowItWorksPage() {
  return (
    <section className="flex flex-col items-center px-4 pt-[38.3px] pb-16">
      <SectionHeading as="h1">{howItWorks.title}</SectionHeading>
      <p className="mt-[7.7px] pl-[0.194em] text-center text-eyebrow text-ink uppercase">{howItWorks.subtitle}</p>

      <ol className="mt-[26px] flex flex-wrap justify-center gap-x-[75.5px] gap-y-10">
        {howItWorks.steps.map((step) => {
          const icon = getAsset(step.icon);
          return (
            <li key={step.number} className="flex w-[299px] flex-col items-center">
              <span aria-hidden className="pl-[0.194em] text-center text-step-number text-ink">
                {step.number}
              </span>
              <Image src={icon.src} alt="" width={icon.width} height={icon.height} className="mt-[6.2px] size-step-icon" />
              <span className="mt-[8.6px] pl-[0.194em] text-center text-label-lg text-ink uppercase">
                <span className="sr-only">Step {step.number}: </span>
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>

      <PillLink href={howItWorks.cta.href} className="mt-[93px]">
        {howItWorks.cta.label}
      </PillLink>
    </section>
  );
}
