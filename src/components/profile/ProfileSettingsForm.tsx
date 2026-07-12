"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import ImageUploader from "@/components/ui/ImageUploader";

export default function ProfileSettingsForm() {
  const { data: session, isPending, refetch } = useSession();

  const [name, setName] = useState(session?.user?.name ?? "");
  const [image, setImage] = useState<string[]>(session?.user?.image ? [session.user.image] : []);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileMessage(null);

    if (isImageUploading) {
      setProfileError("Please wait for the image to finish uploading.");
      return;
    }

    setIsSavingProfile(true);
    try {
      await authClient.updateUser({ name, image: image[0] ?? undefined });
      await refetch?.();
      setProfileMessage("Profile updated.");
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordMessage(null);

    if (!currentPassword || !newPassword) {
      setPasswordError("Please fill in both password fields.");
      return;
    }

    setIsSavingPassword(true);
    try {
      await authClient.changePassword({ currentPassword, newPassword, revokeOtherSessions: true });
      setPasswordMessage("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8">
      <form onSubmit={handleProfileSubmit} className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h3 className="font-bold text-slate-900">Basic info</h3>

        {profileError && <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{profileError}</div>}
        {profileMessage && <div className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-700">{profileMessage}</div>}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Avatar</label>
          <ImageUploader value={image} onChange={setImage} onUploadingChange={setIsImageUploading} maxImages={1} />
        </div>

        <button
          type="submit"
          disabled={isSavingProfile || isImageUploading}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSavingProfile && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSavingProfile ? "Saving…" : "Save Changes"}
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <h3 className="font-bold text-slate-900">Change password</h3>

        {passwordError && <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{passwordError}</div>}
        {passwordMessage && <div className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-700">{passwordMessage}</div>}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Current password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <button
          type="submit"
          disabled={isSavingPassword}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSavingPassword && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSavingPassword ? "Updating…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}