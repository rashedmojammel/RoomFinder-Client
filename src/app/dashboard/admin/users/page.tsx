import Image from "next/image";
import { User as UserIcon } from "lucide-react";
import { getAllUsers } from "@/lib/api/user";
import UserRoleSelect from "@/components/dashboard/admin/UserRoleSelect";
import UserBanToggle from "@/components/dashboard/admin/UserBanToggle";

export default async function ManageUsersPage() {
  const users = await getAllUsers();
  console.log("users", users);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Manage Users</h2>
        <p className="mt-1 text-sm text-slate-500">{users.length} registered users.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-md">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
                      {user.image ? (
                        <Image src={user.image} alt={user.name} fill sizes="36px" className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <UserIcon className="h-4 w-4 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-slate-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-500">{user.email}</td>
                <td className="px-5 py-3">
                  <UserRoleSelect userId={user.id} currentRole={user.role ?? "tenant"} />
                </td>
                <td className="px-5 py-3">
                  <UserBanToggle userId={user.id} initialBanned={Boolean(user.banned)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}