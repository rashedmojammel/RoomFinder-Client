"use client";

import { Modal } from "@heroui/react";
import { Pencil, X } from "lucide-react";
import EditListingForm from "@/components/dashboard/owner/EditListingForm";
import { Listing } from "@/types/listing";

export default function EditListingModal({ listing }: { listing: Listing }) {
  return (
    <Modal>
      <Modal.Trigger className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </Modal.Trigger>

      <Modal.Backdrop className="bg-slate-900/50">
        <Modal.Container placement="center" scroll="inside" size="lg">
          <Modal.Dialog className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white shadow-xl">
            {({ close }) => (
              <>
                <Modal.Header className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                  <Modal.Heading className="text-lg font-bold text-slate-900">
                    Edit &ldquo;{listing.title}&rdquo;
                  </Modal.Heading>
                  <button
                    onClick={close}
                    aria-label="Close"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 hover:rotate-90"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Modal.Header>
                <Modal.Body className="p-6">
                  <EditListingForm listing={listing} onSuccess={close} />
                </Modal.Body>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}