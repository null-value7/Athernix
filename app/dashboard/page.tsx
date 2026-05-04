// ============================================================
// LAYOUT — app/dashboard/layout.tsx
// Server Component — NO lleva "use client".
// getNavSession, redirect y next/headers solo funcionan aquí.
// ============================================================

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getNavSession } from "@/lib/supabase/navSession";
import NavBar from "@/app/navbar/NavBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getNavSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <NavBar user={user} />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}