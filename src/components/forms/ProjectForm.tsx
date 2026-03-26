"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const projectSchema = z.object({
  title: z.string().min(3, "টাইটেল অন্তত ৩ অক্ষরের হতে হবে"),
  location: z.string().min(3, "অবস্থান অন্তত ৩ অক্ষরের হতে হবে"),
  description: z.string().min(10, "বর্ণনা অন্তত ১০ অক্ষরের হতে হবে"),
  status: z.enum(ProjectStatus),
  totalUnits: z.union([z.number(), z.nan().transform(() => undefined)]).optional(),
  address: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: IProject | null;
  onSuccess: () => void;
}

export function ProjectForm({ open, onOpenChange, project, onSuccess }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      status: ProjectStatus.ONGOING,
      totalUnits: 0,
      address: "",
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        location: project.location,
        description: project.description,
        status: project.status,
        totalUnits: project.totalUnits || 0,
        address: project.address || "",
      });
    } else {
      reset({
        title: "",
        location: "",
        description: "",
        status: ProjectStatus.ONGOING,
        totalUnits: 0,
        address: "",
      });
    }
  }, [project, reset]);

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    try {
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
        reset();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("রোজেক্ট সেভ করার সময় সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{project ? "প্রজেক্ট এডিট করুন" : "নতুন প্রজেক্ট যোগ করুন"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">প্রজেক্টের নাম</Label>
              <Input
                {...register("title")}
                placeholder="উদা: Golden Tower"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">স্ট্যাটাস</Label>
              <Select
                onValueChange={(val) => setValue("status", val as ProjectStatus)}
                defaultValue={project?.status || ProjectStatus.ONGOING}
              >
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
            <Input
              {...register("location")}
              placeholder="উদা: মাতুয়াইল, ঢাকা"
              className={errors.location ? "border-destructive" : ""}
            />
            {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">বিস্তারিত বর্ণনা</Label>
            <Textarea
              {...register("description")}
              className={`min-h-[100px] ${errors.description ? "border-destructive" : ""}`}
              placeholder="প্রজেক্ট সম্পর্কে কিছু লিখুন"
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalUnits">মোট ইউনিট সংখ্যা</Label>
              <Input
                {...register("totalUnits", { valueAsNumber: true })}
                type="number"
                placeholder="উদা: ৪৮"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">পুরো ঠিকানা</Label>
              <Input
                {...register("address")}
                placeholder="উদা: মাতুয়াইল, ঢাকা-১৩৬২"
              />
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
