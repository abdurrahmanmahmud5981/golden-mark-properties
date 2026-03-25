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
import { createUnit, updateUnit } from "@/lib/actions/unit-actions";
import { toast } from "sonner";
import { IUnit, IProject, UnitStatus } from "@/lib/types";

interface UnitFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit: IUnit | null;
  projects: IProject[];
  onSuccess: () => void;
}

export function UnitForm({ open, onOpenChange, unit, projects, onSuccess }: UnitFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as Partial<IUnit>;
    
    data.price = Number(data.price);
    data.status = data.status || UnitStatus.AVAILABLE;

    let res;
    if (unit) {
      res = await updateUnit(unit._id, data);
    } else {
      res = await createUnit(data);
    }

    if (res.success) {
      toast.success(`ইউনিট সফলভাবে ${unit ? "আপডেট" : "তৈরি"} করা হয়েছে।`);
      onSuccess();
      onOpenChange(false);
    } else {
      toast.error(res.error);
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{unit ? "ইউনিট এডিট করুন" : "নতুন ইউনিট যোগ করুন"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project">প্রজেক্ট সিলেক্ট করুন</Label>
              <Select name="project" defaultValue={(unit?.project as IProject)?._id || (unit?.project as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="প্রজেক্ট পছন্দ করুন" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p._id} value={p._id}>{p.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">স্ট্যাটাস</Label>
              <Select name="status" defaultValue={unit?.status || UnitStatus.AVAILABLE}>
                <SelectTrigger>
                  <SelectValue placeholder="সিলেক্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UnitStatus).map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unitNumber">ইউনিট নং</Label>
              <Input name="unitNumber" defaultValue={unit?.unitNumber} required placeholder="উদা: 4-B" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floor">তলা</Label>
              <Input name="floor" defaultValue={unit?.floor} required placeholder="উদা: ৪র্থ তলা" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">সাইজ (বর্গফুট)</Label>
              <Input name="size" defaultValue={unit?.size} required placeholder="উদা: ১২৫০ বর্গফুট" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">মূল্য (৳)</Label>
              <Input name="price" type="number" defaultValue={unit?.price} required placeholder="উদা: ৬৫০০০০০" />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>বাতিল</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "সেভ হচ্ছে..." : "তথ্য সেভ করুন"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
