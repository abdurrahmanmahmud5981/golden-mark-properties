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
import { createBooking } from "@/lib/actions/booking-actions";
import { toast } from "sonner";

import { IBooking, IClient, IUnit, IProject, BookingStatus, UnitStatus } from "@/lib/types";

interface BookingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: IClient[];
  units: IUnit[];
  onSuccess: () => void;
}

export function BookingForm({ open, onOpenChange, clients, units, onSuccess }: BookingFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as Partial<IBooking>;

    data.totalAmount = Number(data.totalAmount);
    data.bookingAmount = Number(data.bookingAmount);
    data.downPayment = Number(data.downPayment);
    data.installmentCount = Number(data.installmentCount);
    data.installmentAmount = Number(data.installmentAmount);
    data.balanceAmount = (data.totalAmount || 0) - (data.bookingAmount || 0) - (data.downPayment || 0);
    data.status = BookingStatus.PENDING;

    const res = await createBooking(data);

    if (res.success) {
      toast.success("বুকিং সফলভাবে সম্পন্ন হয়েছে।");
      onSuccess();
      onOpenChange(false);
    } else {
      toast.error(res.error);
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>নতুন বুকিং ফর্ম</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ক্লায়েন্ট সিলেক্ট করুন</Label>
              <Select name="client" required>
                <SelectTrigger>
                  <SelectValue placeholder="ক্লায়েন্ট পছন্দ করুন" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c._id} value={c._id}>{c.name} ({c.phone})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>ইউনিট/ফ্ল্যাট সিলেক্ট করুন</Label>
              <Select name="unit" required>
                <SelectTrigger>
                  <SelectValue placeholder="ইউনিট পছন্দ করুন" />
                </SelectTrigger>
                <SelectContent>
                  {units.filter((u) => u.status === UnitStatus.AVAILABLE).map((u) => (
                    <SelectItem key={u._id} value={u._id}>
                      {(u.project as IProject)?.title} - {u.unitNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>মোট মূল্য (৳)</Label>
              <Input name="totalAmount" type="number" required />
            </div>
            <div className="space-y-2">
              <Label>বুকিং মানি (৳)</Label>
              <Input name="bookingAmount" type="number" required />
            </div>
            <div className="space-y-2">
              <Label>ডাউন পেমেন্ট (৳)</Label>
              <Input name="downPayment" type="number" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-xl">
            <div className="space-y-2">
              <Label>মোট কিস্তি সংখ্যা</Label>
              <Input name="installmentCount" type="number" required />
            </div>
            <div className="space-y-2">
              <Label>প্রতি কিস্তির পরিমাণ (৳)</Label>
              <Input name="installmentAmount" type="number" required />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>বাতিল</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "প্রসেস হচ্ছে..." : "বুকিং কনফার্ম করুন"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
