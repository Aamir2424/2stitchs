import Link from "next/link";

// Shared pieces of the public pages. Styles follow DESIGN.md (type scale, standard pill).

const trackWide = "pl-[0.463em]";

type HeadingProps = { children: string; as?: "h1" | "h2"; className?: string };

/** Section heading (text-heading, maroon), positioned like the wizard titles: the deck sets the
 * text 10.5px lower inside its 47px box, so the translate keeps everything below in place. */
export function SectionHeading({ children, as: Tag = "h2", className = "" }: HeadingProps) {
  return (
    <Tag className={`${trackWide} translate-y-[10.5px] text-center text-heading text-maroon uppercase ${className}`}>
      {children}
    </Tag>
  );
}

/** The design's standard 287 x 42 burgundy pill (DESIGN.md, Controls) as a link. */
export function PillLink({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  return (
    <Link
      href={href}
      className={
        `${trackWide} flex h-control w-cta max-w-full items-center justify-center rounded-control bg-burgundy ` +
        `text-button text-paper uppercase transition-opacity hover:opacity-90 ` +
        `focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${className}`
      }
    >
      {children}
    </Link>
  );
}
