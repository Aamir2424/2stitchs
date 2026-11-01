"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { getAsset, type AssetKey } from "@/src/config/assets";
import type { DeckCrop } from "@/src/config/steps.config";

// Shared pieces of every wizard step: title, Back/Next, and deck-cropped photos.

import { trackLabel, trackWide } from "./tracking";
export { trackLabel, trackWide };

type TitleProps = { id: string; children: string; /** Move focus here when the step appears. */ autoFocus?: boolean };

/** Step heading (text-heading, maroon). Focusable so screen readers announce a new step. */
export function StepTitle({ id, children, autoFocus }: TitleProps) {
  const inner = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (autoFocus) inner.current?.focus();
  }, [autoFocus, children]);
  return (
    <h1
      id={id}
      ref={inner}
      tabIndex={-1}
      // translate-y: the deck sets title text 10.5px lower inside its 47px text box
      // (measured on screens 14-16); translating keeps the content below where it is.
      className={`${trackWide} translate-y-[10.5px] text-center text-heading text-maroon uppercase outline-none`}
    >
      {children}
    </h1>
  );
}

/** Hover, disabled and keyboard-focus states shared by every pill button. */
export const pillStates =
  "uppercase transition-opacity hover:enabled:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

const pillShapes = {
  /** The design's standard pill, 287 x 42 (DESIGN.md). */
  standard: "h-control w-cta rounded-control text-button",
  /** SUBMIT's shape, 287 x 47.5 (screen 25). */
  large: "h-control-lg w-cta rounded-control-lg text-button-lg",
};

type NavProps = {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  /** False on a step that has its own continue button (SUBMIT on screen 25). Default true. */
  showNext?: boolean;
  /** "large" matches SUBMIT on screen 25. Default "standard". */
  size?: keyof typeof pillShapes;
};

/** Back / Next pills. Not in the design; styled as the design's standard pill (DESIGN.md). */
export function StepNav({ onBack, onNext, canGoBack, canGoNext, showNext = true, size = "standard" }: NavProps) {
  const pillBase = `${pillShapes[size]} ${pillStates}`;
  return (
    <nav aria-label="Wizard steps" className="mt-8 flex flex-wrap justify-center gap-6">
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        className={`${trackWide} ${pillBase} border-[1.5px] border-burgundy bg-paper text-burgundy`}
      >
        BACK
      </button>
      {showNext && (
        <button type="button" onClick={onNext} disabled={!canGoNext} className={`${trackWide} ${pillBase} bg-burgundy text-paper`}>
          NEXT
        </button>
      )}
    </nav>
  );
}

type PhotoProps = {
  image: AssetKey;
  /** The deck's crop. Without one, the photo covers the box, centred. */
  crop?: DeckCrop;
  /** Rendered width at the design size, for the browser's image-size choice. */
  width: number;
  /** Empty alt for decorative layers (e.g. hover previews of an already-labelled swatch). */
  alt?: string;
  className?: string;
};

/** A photo from src/config/assets.ts placed exactly as the deck crops it (insets in % of the box). */
export function DeckPhoto({ image, crop, width, alt, className = "" }: PhotoProps) {
  const asset = getAsset(image);
  if (asset.kind !== "image") throw new Error(`Asset ${image} is not an image.`);
  const c = crop ?? { left: 0, top: 0, right: 0, bottom: 0 };
  const photoWidth = Math.round(width * (1 - c.left / 100 - c.right / 100));
  return (
    <span
      className={`absolute ${className}`}
      style={{ left: `${c.left}%`, top: `${c.top}%`, right: `${c.right}%`, bottom: `${c.bottom}%` }}
    >
      <Image src={asset.src} alt={alt ?? asset.alt} fill sizes={`${photoWidth}px`} className="object-cover" />
    </span>
  );
}
