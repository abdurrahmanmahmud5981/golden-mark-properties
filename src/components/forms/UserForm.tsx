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
import { createUser } from "@/lib/actions/user-actions";
import { toast } from "sonner";
import { IUser, UserRole } from "@/lib/types";

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function UserForm({ open, onOpenChange, onSuccess }: UserFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as Partial<IUser> & { password?: string, confirmPassword?: string };
    
    if (data.password !== data.confirmPassword) {
      toast.error("পাসওয়ার্ড ম্যাচ করেনি!");
      setLoading(false);
      return;
    }

    const res = await createUser(data);

    if (res.success) {
      toast.success("নতুন ইউজার সফলভাবে তৈরি করা হয়েছে।");
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
          <DialogTitle>নতুন স্টাফ/ইউজার যোগ করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>নাম</Label>
            <Input name="name" required placeholder="স্টাফের নাম লিখুন" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ইমেইল</Label>
              <Input name="email" type="email" required placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label>রোল</Label>
              <Select name="role" defaultValue={UserRole.SALES}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UserRole).map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>পদবি (Designation)</Label>
            <Input name="designation" placeholder="উদা: সিনিয়র সেলস এক্সিকিউটিভ" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>পাসওয়ার্ড</Label>
              <Input name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label>কনফার্ম পাসওয়ার্ড</Label>
              <Input name="confirmPassword" type="password" required />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>বাতিল</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "তৈরি হচ্ছে..." : "ইউজার তৈরি করুন"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
