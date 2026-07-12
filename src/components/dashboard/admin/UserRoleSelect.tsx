"use client";

import { updateUserRole } from "@/lib/actions/user";
import { Role } from "@/types/user";
import { useState, useTransition } from "react";
// import { updateUserRole } from "@/lib/actions/users";
// import { Role } from "@/config/dashboard-nav";

const roles: Role[] = ["tenant", "owner", "admin"];

export default function UserRoleSelect({ userId, currentRole }: { userId: string; currentRole: string }) {
  const [role, setRole] = useState(currentRole);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Role;
    const prev = role;
    setRole(next);
    setError(null);

    startTransition(async () => {
      try {
        await updateUserRole(userId, next);
      } catch (err) {
        setRole(prev);
        setError(err instanceof Error ? err.message : "Failed to update role");
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <select
        value={role}
        onChange={handleChange}
        disabled={isPending}
        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 outline-none transition focus:border-cyan-400 disabled:opacity-60"
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}