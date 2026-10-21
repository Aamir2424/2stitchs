import Image from "next/image";
import Link from "next/link";
import { getAsset } from "@/src/config/assets";
import { designCta, mainNav, regionBadge } from "@/src/config/site";

// Burgundy linen header (reference/screen_02.png; geometry in DESIGN.md, "Shell").
// Positions are CSS px at the 1440px design, measured from the screenshot ink:
//   nav row centred about 75px below the header top; left nav from x = 83 (gutter 81 plus
//   glyph side bearing), 24px between items; right cluster ends 29px from the edge;
//   logo 138 x 78, centred, 32px from the top.

// Deck text-box widths for HOME, OUR STORY, HOW IT WORKS (screen 02), in mainNav order.
const NAV_WIDTHS = ["w-[40px]", "w-[78px]", "w-[104px]"] as const;

const linkClass =
  "rounded-badge text-nav text-paper uppercase outline-offset-4 hover:opacity-80 " +
  "focus-visible:outline-2 focus-visible:outline-paper";

export default function Header() {
  const texture = getAsset("brand.headerTexture");
  const logo = getAsset("brand.logo");
  const cart = getAsset("ui.icon.cart");
  const account = getAsset("ui.icon.account");

  return (
    <header
      className="relative h-header w-full bg-burgundy bg-no-repeat"
      style={{
        backgroundImage: `url(${texture.src})`,
        backgroundSize: "100% auto",
        backgroundPosition: "var(--header-texture-position)",
      }}
    >
      <Link
        href="/"
        className="absolute top-[32px] left-1/2 -translate-x-1/2 rounded-badge outline-offset-4 focus-visible:outline-2 focus-visible:outline-paper"
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          loading="eager"
          className="h-auto w-[138px]"
        />
      </Link>

      <nav aria-label="Main" className="absolute inset-x-0 top-[65.5px] flex h-[18px] items-center justify-between pr-[29px] pl-gutter">
        {/* Like the design, each item is a fixed-width box with centred text (deck boxes
            81-121, 141-219, 240-344), so positions don't drift when the font changes. */}
        <ul className="flex items-center gap-[20px]">
          {mainNav.map((item, i) => (
            <li key={item.href} className={NAV_WIDTHS[i]}>
              <Link href={item.href} className={`${linkClass} block text-center whitespace-nowrap`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right cluster, laid out from the right edge: account 1394.6-1411 (29px margin),
            cart 1368.5-1385, badge 1337-1363, then the link, which sizes to its text so a
            wider fallback font can't push it into the badge. It sits 1px higher, as in the design. */}
        <div className="flex items-center">
          <Link href={designCta.href} className={`${linkClass} -translate-y-px whitespace-nowrap`}>
            {designCta.label}
          </Link>
          {/* Region badge: display only. */}
          <span className="ml-[6px] flex h-[13.6px] w-[25.7px] items-center justify-center rounded-badge bg-paper pl-[0.194em] text-nav text-burgundy">
            {regionBadge}
          </span>
          {/* Cart and account: visual only until their behaviour is decided (see src/config/site.ts). */}
          <Image src={cart.src} alt="" aria-hidden width={cart.width} height={cart.height} unoptimized className="ml-[5.6px] size-[16.5px]" />
          <Image src={account.src} alt="" aria-hidden width={account.width} height={account.height} unoptimized className="ml-[9.6px] size-[16.5px]" />
        </div>
      </nav>
    </header>
  );
}
