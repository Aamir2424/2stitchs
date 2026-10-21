import { freeShippingMessage } from "@/src/config/site";

// Grey promo strip under the header: 30px, black at 67% (renders #545454 on white).
// It is translucent by design: on the home page the hero photo runs underneath it
// (screen 02), so it sits above page content (z-10).
export default function PromoStrip() {
  return (
    <div className="relative z-10 flex h-strip w-full items-center justify-center bg-strip">
      {/* pl offsets the trailing letter-spacing so the text is optically centred. */}
      <p className="pl-[0.463em] text-banner text-strip-text uppercase">{freeShippingMessage()}</p>
    </div>
  );
}
