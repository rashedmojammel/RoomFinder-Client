"use client";

import { useState } from "react";
import {
  Modal,
  TextField,
  Label,
  Input,
  TextArea,
  Description,
  Button,
  Spinner,
} from "@heroui/react";
import { Send } from "lucide-react";
import { createBooking } from "@/lib/actions/bookings";
import { BookingStatus } from "@/types/booking";

interface BookingRequestModalProps {
  listingId: string;
  tenantId: string;
  defaultName?: string;
  onClose: () => void;
  onSuccess: (status: BookingStatus) => void;
}

export default function BookingRequestModal({
  listingId,
  tenantId,
  defaultName = "",
  onClose,
  onSuccess,
}: BookingRequestModalProps) {
  const [tenantName, setTenantName] = useState(defaultName);
  const [tenantPhone, setTenantPhone] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!tenantName.trim() || !tenantPhone.trim()) {
      setError("Please provide your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const booking = await createBooking({
        listingId,
        tenantId,
        tenantName: tenantName.trim(),
        tenantPhone: tenantPhone.trim(),
        moveInDate: moveInDate || undefined,
        message: message.trim() || undefined,
      });
      onSuccess(booking.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send booking request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      {/* Controlled: this component only ever mounts while the booking flow
          is open, so isOpen is always true. When the backdrop, ESC, or a
          slot="close" button fires onOpenChange(false), we call the parent's
          onClose - which unmounts us. */}
      <Modal.Backdrop
        isOpen
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        variant="blur"
      >
        <Modal.Container placement="center" size="md">
          <Modal.Dialog className="rounded-2xl border border-gray-100 bg-white shadow-xl">
            <Modal.CloseTrigger />

            <form onSubmit={handleSubmit}>
              <Modal.Header>
                <Modal.Heading className="text-lg font-bold text-slate-900">
                  Request to Book
                </Modal.Heading>
                <p className="mt-1 text-sm font-normal text-slate-500">
                  Share a few details so the owner can review your request and get in touch.
                </p>
              </Modal.Header>

              <Modal.Body className="gap-4 py-5">
                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <TextField
                  isRequired
                  name="tenantName"
                  value={tenantName}
                  onChange={setTenantName}
                  className="w-full"
                >
                  <Label>Full name</Label>
                  <Input placeholder="Your name" />
                </TextField>

                <TextField
                  isRequired
                  name="tenantPhone"
                  type="tel"
                  value={tenantPhone}
                  onChange={setTenantPhone}
                  className="w-full"
                >
                  <Label>Phone number</Label>
                  <Input placeholder="+880 1XXX-XXXXXX" />
                </TextField>

                <TextField
                  name="moveInDate"
                  type="date"
                  value={moveInDate}
                  onChange={setMoveInDate}
                  className="w-full"
                >
                  <Label>Preferred move-in date</Label>
                  <Input />
                  <Description>Optional</Description>
                </TextField>

                <TextField
                  name="message"
                  value={message}
                  onChange={setMessage}
                  className="w-full"
                >
                  <Label>Message to owner</Label>
                  <TextArea
                    rows={3}
                    placeholder="Anything the owner should know — occupants, timeline, questions…"
                  />
                  <Description>Optional</Description>
                </TextField>
              </Modal.Body>

              <Modal.Footer>
                <Button slot="close" variant="ghost" className="rounded-xl">
                  Cancel
                </Button>

                <Button
                  type="submit"
                  isPending={isSubmitting}
                  isDisabled={isSubmitting}
                  className="gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 font-semibold text-white shadow-lg"
                >
                  {isSubmitting ? <Spinner size="sm" /> : <Send className="h-4 w-4" />}
                  {isSubmitting ? "Sending…" : "Send Request"}
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}