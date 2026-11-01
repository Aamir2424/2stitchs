import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { SummaryGrid, summaryGridWidth } from "@/src/components/summary/SummaryGrid";
import { StepTitle } from "@/src/components/wizard/StepChrome";
import { trackLabel, trackWide } from "@/src/components/wizard/tracking";
import { summaryLayout as L, ticketCopy, ticketLayout } from "@/src/config/summary.config";
import { effectivePantsFabric } from "@/src/lib/selections";
import { hasAdminSession, isAdminConfigured } from "@/src/server/admin-auth";
import { getOrder, isOrderId, listOrders, type ProductionOrder } from "@/src/server/orders";
import { logout } from "./actions";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Production tickets | 2Stitchs",
  robots: { index: false, follow: false },
};

/**
 * Admin production tickets (screen 27). Only the empty shell is prerendered; the session check
 * and every order read happen on the server per request, behind the Suspense boundary, so
 * nothing about an order is in the page source or client data without a valid session.
 */
export default function AdminPage({ searchParams }: PageProps<"/admin">) {
  return (
    <Suspense fallback={<Message>LOADING…</Message>}>
      <AdminContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminContent({ searchParams }: Pick<PageProps<"/admin">, "searchParams">) {
  // Everything below runs per request, never at build time: the configuration is read from
  // the server's runtime environment, and nothing here may be baked into the static shell.
  await connection();
  if (!isAdminConfigured()) {
    return <Message>ADMIN ACCESS IS NOT CONFIGURED.</Message>;
  }
  if (!(await hasAdminSession())) {
    return (
      <Panel title="ADMIN">
        <LoginForm />
      </Panel>
    );
  }

  const { order } = await searchParams;
  if (order !== undefined) {
    const result = isOrderId(order) ? await getOrder(order) : ({ status: "ok", data: null } as const);
    if (result.status === "notConfigured") return <StoreNotConfigured />;
    if (!result.data) {
      return (
        <Panel title="ORDER NOT FOUND">
          <AdminLinks />
        </Panel>
      );
    }
    return <ProductionTicket order={result.data} />;
  }

  const result = await listOrders();
  if (result.status === "notConfigured") return <StoreNotConfigured />;
  return (
    <Panel title="SUBMITTED ORDERS">
      {result.data.length === 0 ? (
        <p className={`${trackLabel} text-caption text-ink`}>NO SUBMITTED ORDERS.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {result.data.map((o) => (
            <li key={o.id}>
              <Link
                href={`/admin?order=${encodeURIComponent(o.id)}`}
                prefetch={false}
                className={`${trackLabel} text-caption text-ink underline underline-offset-4 hover:text-burgundy`}
              >
                {o.customerName.toUpperCase()} — {new Date(o.submittedAt).toISOString().slice(0, 10)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <LogoutButton />
    </Panel>
  );
}

/** Screen 27: the customer's name as the title, the summary grid with fabric codes, and the notes line. No price. */
function ProductionTicket({ order }: { order: ProductionOrder }) {
  const { selections } = order;
  const note = selections.tailorNote?.trim();
  const width = { width: summaryGridWidth, maxWidth: "100%", transform: `translateX(${L.gridOffsetX}px)` };
  return (
    <section className="flex flex-col items-center pb-10">
      <div style={{ marginTop: L.titleTop }}>
        <StepTitle id="ticket-title">{order.customerName}</StepTitle>
      </div>
      <SummaryGrid
        selections={selections}
        pantsFabric={effectivePantsFabric(selections)}
        variant="ticket"
        marginTop={L.gridTop - (L.titleTop + L.titleBoxHeight)}
      />
      <p className={`${trackLabel} mx-auto text-caption whitespace-pre-line text-ink uppercase`} style={{ ...width, marginTop: ticketLayout.notesTop }}>
        {ticketCopy.notes}: {note || ticketCopy.noNotes}
      </p>
      <AdminLinks />
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center gap-8 px-4 pt-10 pb-10">
      <h1 className={`${trackWide} text-center text-heading text-maroon`}>{title}</h1>
      {children}
    </section>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return <p className={`${trackLabel} px-4 py-16 text-center text-caption text-ink`}>{children}</p>;
}

function StoreNotConfigured() {
  return (
    <Panel title="NO ORDER STORE">
      <p className={`${trackLabel} max-w-[40rem] text-center text-caption text-ink`}>
        ORDERS CANNOT BE SHOWN YET: NO ORDER STORE IS CONFIGURED ON THE SERVER.
      </p>
      <LogoutButton />
    </Panel>
  );
}

function AdminLinks() {
  return (
    <nav aria-label="Admin" className="mt-10 flex flex-col items-center gap-4">
      <Link href="/admin" prefetch={false} className={`${trackLabel} text-caption text-ink underline underline-offset-4`}>
        ALL ORDERS
      </Link>
      <LogoutButton />
    </nav>
  );
}

function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className={`${trackWide} h-control w-cta rounded-control bg-burgundy text-button text-paper hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink`}
      >
        LOG OUT
      </button>
    </form>
  );
}
