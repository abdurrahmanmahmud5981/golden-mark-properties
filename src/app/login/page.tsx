"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const res = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });
      if (res?.error) {
        throw new Error(res.error);
      }
      return res;
    },
    onSuccess: async () => {
      toast.success("লগইন সফল হয়েছে।");
      const session = await getSession();
      const role = (session?.user as any)?.role as string | undefined;

      const redirectMap: Record<string, string> = {
        "সেলস এক্সিকিউটিভ": "/dashboard/leads",
        "ফাইন্যান্স": "/dashboard/payments",
        "প্রজেক্ট ম্যানেজার": "/dashboard/projects",
        "সুপার অ্যাডমিন": "/dashboard",
      };

      router.push(role ? (redirectMap[role] ?? "/dashboard") : "/dashboard");
      router.refresh();
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("Login form submitted");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("Mutating login with:", email);
    loginMutation.mutate({ email, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">লগইন করুন</CardTitle>
          <CardDescription>
            অ্যাডমিন প্যানেলে প্রবেশ করতে আপনার ইমেইল ও পাসওয়ার্ড দিন
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>
              <Input name="email" id="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">পাসওয়ার্ড</Label>
              <Input name="password" id="password" type="password" required />
            </div>
            <Button type="submit" disabled={loginMutation.isPending} className="w-full bg-primary hover:bg-primary/90">
              {loginMutation.isPending ? "প্রবেশ হচ্ছে..." : "প্রবেশ করুন"}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-center text-muted-foreground">
            <p>নতুন ইউজার?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                নিবন্ধন করুন
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
