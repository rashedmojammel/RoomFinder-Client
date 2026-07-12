import { notFound, redirect } from "next/navigation";
// import { getUserSession } from "@/lib/session";
import { getListingById } from "@/lib/api/listing";
import EditListingForm from "@/components/dashboard/owner/EditListingForm";
import { getUserSession } from "@/lib/core/session";

interface EditListingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditListingPage({ params }: EditListingPageProps) {
  const { id } = await params;
  const user = await getUserSession();
  if (!user) redirect("/sign-in");

  const listing = await getListingById(id);
  if (!listing) notFound();
  if (listing.ownerId !== user.id) redirect("/dashboard/owner/listings");

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Edit Listing</h2>
        <p className="mt-1 text-sm text-slate-500">Update details for &ldquo;{listing.title}&rdquo;.</p>
      </div>
      <EditListingForm listing={listing} />
    </div>
  );
}