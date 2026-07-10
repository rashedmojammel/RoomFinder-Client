"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getRole, roleDashboardPath } from "@/lib/dashboard-nav";

export default function DashboardIndexPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    const role = getRole(session?.user?.userRole);
    router.replace(roleDashboardPath[role]);
  }, [isPending, session, router]);

  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-500" />
    </div>
  );
}