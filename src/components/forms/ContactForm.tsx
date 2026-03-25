"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitLead } from "@/lib/actions/lead-actions";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const result = await submitLead(formData);
      if (result.success) {
        toast.success("আপনার মেসেজ সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করবো।");
        (document.getElementById("contact-form") as HTMLFormElement).reset();
      } else {
        toast.error("দুঃখিত, মেসেজ পাঠানো সম্ভব হয়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      toast.error("একটি সমস্যা হয়েছে। অনুগ্রহ করে পরে চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm">
      <h3 className="text-2xl font-bold mb-8">মেসেজ পাঠান</h3>
      <form id="contact-form" action={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">আপনার নাম</label>
            <Input name="name" required placeholder="নাম লিখুন" className="rounded-xl h-12" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">ফোন নাম্বার</label>
            <Input name="phone" required placeholder="ফোন নাম্বার লিখুন" className="rounded-xl h-12" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">আপনার ইমেইল (যদি থাকে)</label>
          <Input name="email" type="email" placeholder="ইমেইল এড্রেস" className="rounded-xl h-12" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">আপনি কোন প্রজেক্টে আগ্রহী?</label>
          <Input name="projectName" placeholder="প্রজেক্টের নাম" className="rounded-xl h-12" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">আপনার মেসেজ</label>
          <Textarea name="message" placeholder="আপনার মেসেজ এখানে লিখুন" className="rounded-xl min-h-[150px]" />
        </div>
        <Button 
          disabled={loading}
          type="submit" 
          size="lg" 
          className="w-full rounded-xl bg-destructive hover:bg-destructive/90 text-white py-6 text-md font-bold"
        >
          {loading ? "পাঠানো হচ্ছে..." : "মেসেজ পাঠান"}
        </Button>
      </form>
    </div>
  );
}
