import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function TermsDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Placeholder terms — TODO(client): replace with the clinic's final wording.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Appointment requests are confirmed by the clinic over WhatsApp or phone. Timings may
            shift depending on treatment length and emergency cases.
          </p>
          <p>
            The consultation fee is PKR 1,500 and is payable at the clinic. Treatment plans and
            costs are discussed after an in-person examination.
          </p>
          <p>
            Details you share in this form are used only to contact you about your appointment.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
