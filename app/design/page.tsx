import type { Metadata } from "next";
import Wizard from "@/src/components/wizard/Wizard";
import { WizardProvider } from "@/src/components/wizard/WizardContext";

export const metadata: Metadata = { title: "Design your suit | 2Stitchs" };

// The suit configurator (spec section 3: /design). The shared shell comes from app/layout.tsx.
export default function DesignPage() {
  return (
    <WizardProvider>
      <Wizard />
    </WizardProvider>
  );
}
