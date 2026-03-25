"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { createPayment } from "@/lib/actions/payment-actions";
import { toast } from "sonner";
import { IBooking, IClient, IUnit, IProject, IPayment, PaymentMethod, PaymentType } from "@/lib/types";

interface PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookings: IBooking[];
  onSuccess: () => void;
}

export function PaymentForm({ open, onOpenChange, bookings, onSuccess }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as Partial<IPayment>;
    
    data.amount = Number(data.amount);
    data.paymentType = PaymentType.INSTALLMENT; // Default or from form
    
    // Find client from booking
    const booking = bookings.find((b) => b._id === data.booking);
    if (booking) {
      data.client = (booking.client as IClient)?._id;
    }

    const res = await createPayment(data);

    if (res.success) {
      toast.success("পেমেন্ট সফলভাবে রেকর্ড করা হয়েছে।");
      onSuccess();
      onOpenChange(false);
    } else {
      toast.error(res.error);
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>পেমেন্ট কালেকশন ফর্ম</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>বুকিং সিলেক্ট করুন (ক্লায়েন্ট ও ইউনিট)</Label>
            <Select name="booking" required>
              <SelectTrigger>
                <SelectValue placeholder="বুকিং পছন্দ করুন" />
              </SelectTrigger>
              <SelectContent>
                {bookings.map((b) => (
                  <SelectItem key={b._id} value={b._id}>
                    {(b.client as IClient)?.name} - {(b.unit as IUnit)?.unitNumber} ({( (b.unit as IUnit)?.project as IProject)?.title})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>পরিমাণ (৳)</Label>
              <Input name="amount" type="number" required placeholder="উদা: ৫০,০০০" />
            </div>
            <div className="space-y-2">
              <Label>পেমেন্ট মাধ্যম</Label>
              <Select name="paymentMethod" defaultValue={PaymentMethod.CASH}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PaymentMethod).map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>বিবরণ</Label>
            <Input name="description" placeholder="উদা: ৪র্থ কিস্তি / ডেকোরেশন খরচ" />
          </div>

          <div className="space-y-2">
            <Label>রেফারেন্স / চেক নং (যদি থাকে)</Label>
            <Input name="receiptNumber" placeholder="উদা: RCPT-123456" required />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>বাতিল</Button>
            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-white">
              {loading ? "সেভ হচ্ছে..." : "পেমেন্ট রেকর্ড করুন"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
