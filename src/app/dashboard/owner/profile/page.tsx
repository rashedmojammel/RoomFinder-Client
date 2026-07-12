import ProfileSettingsForm from "@/components/profile/ProfileSettingsForm";

export default function OwnerProfilePage() {
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Profile Settings</h2>
        <p className="mt-1 text-sm text-slate-500">Update your name, avatar, and password.</p>
      </div>
      <ProfileSettingsForm />
    </div>
  );
}