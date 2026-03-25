"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post("/api/auth/register", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("নিবন্ধন সফল হয়েছে। এখন লগইন করুন।");
      router.push("/login");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "নিবন্ধন করা সম্ভব হয়নি।";
      toast.error(message);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("Registration form submitted");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return toast.error("পাসওয়ার্ড মেলেনি।");
    }

    console.log("Mutating registration with:", email);
    registerMutation.mutate({ name, email, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">নিবন্ধন করুন</CardTitle>
          <CardDescription>
            নতুন অ্যাকাউন্ট তৈরি করতে আপনার তথ্য দিন
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">পুরো নাম</Label>
              <Input name="name" id="name" type="text" placeholder="আপনার নাম" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>
              <Input name="email" id="email" type="email" placeholder="email@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">পাসওয়ার্ড</Label>
              <Input name="password" id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input name="confirmPassword" id="confirmPassword" type="password" required />
            </div>
            <Button type="submit" disabled={registerMutation.isPending} className="w-full bg-primary hover:bg-primary/90">
              {registerMutation.isPending ? "নিবন্ধন হচ্ছে..." : "নিবন্ধন করুন"}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-center text-muted-foreground">
            <p>ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                লগইন করুন
              </Link>
            </p>
            <div className="mt-4">
              <Link href="/" className="hover:text-primary transition-colors">
                মূল ওয়েবসাইটে ফিরে যান
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
