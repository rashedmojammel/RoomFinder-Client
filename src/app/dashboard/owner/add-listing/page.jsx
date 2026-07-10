import AddListingForm from "@/components/dashboard/owner/AddListingForm";

export default function AddListingPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Add a New Listing</h2>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the details below to publish a room for tenants to discover.
        </p>
      </div>

      <AddListingForm />
    </div>
  );
}