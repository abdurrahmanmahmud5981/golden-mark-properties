"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { createProject, updateProject } from "@/lib/actions/project-actions";
import { toast } from "sonner";
import { IProject, ProjectStatus } from "@/lib/types";

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: IProject | null;
  onSuccess: () => void;
}

export function ProjectForm({ open, onOpenChange, project, onSuccess }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as Partial<IProject>;
    
    // Simple status mapping
    data.status = data.status || ProjectStatus.ONGOING;

    let res;
    if (project) {
      res = await updateProject(project._id, data);
    } else {
      res = await createProject(data);
    }

    if (res.success) {
      toast.success(`প্রজেক্ট সফলভাবে ${project ? "আপডেট" : "তৈরি"} করা হয়েছে।`);
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
          <DialogTitle>{project ? "প্রজেক্ট এডিট করুন" : "নতুন প্রজেক্ট যোগ করুন"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">প্রজেক্টের নাম</Label>
              <Input name="title" defaultValue={project?.title} required placeholder="উদা: Golden Tower" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">স্ট্যাটাস</Label>
              <Select name="status" defaultValue={project?.status || ProjectStatus.ONGOING}>
                <SelectTrigger>
                  <SelectValue placeholder="সিলেক্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ProjectStatus).map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">অবস্থান / এলাকা</Label>
            <Input name="location" defaultValue={project?.location} required placeholder="উদা: মাতুয়াইল, ঢাকা" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">বিস্তারিত বর্ণনা</Label>
            <Textarea name="description" defaultValue={project?.description} className="min-h-[100px]" placeholder="প্রজেক্ট সম্পর্কে কিছু লিখুন" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalUnits">মোট ইউনিট সংখ্যা</Label>
              <Input name="totalUnits" type="number" defaultValue={project?.totalUnits} placeholder="উদা: ৪৮" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">পুরো ঠিকানা</Label>
              <Input name="address" defaultValue={project?.address} placeholder="উদা: মাতুয়াইল, ঢাকা-১৩৬২" />
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
