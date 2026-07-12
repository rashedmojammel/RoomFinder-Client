"use client";

import { Modal, Button } from "@heroui/react";
import { Plus, X } from "lucide-react";
import AddListingForm from "@/components/dashboard/owner/AddListingForm";

export default function AddListingModal() {
  return (
    <Modal>
      <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <Plus className="h-4 w-4" />
        Add Listing
      </Button>

      <Modal.Backdrop className="bg-slate-900/50">
        <Modal.Container placement="center" scroll="inside" size="lg">
          <Modal.Dialog className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white shadow-xl">
            {({ close }) => (
              <>
                <Modal.Header className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                  <Modal.Heading className="text-lg font-bold text-slate-900">
                    Add a New Listing
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
                  <AddListingForm onSuccess={close} />
                </Modal.Body>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}