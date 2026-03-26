"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Shield, MoreVertical, Trash2, Mail, Briefcase, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getUsers, deleteUser } from "@/lib/actions/user-actions";
import { toast } from "sonner";
import { UserForm } from "@/components/forms/UserForm";

import { IUser, UserRole } from "@/lib/types";

export default function UserListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userRole = (session?.user as any)?.role as UserRole | undefined;

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  async function loadUsers() {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই স্টাফ মেম্বারকে ডিলিট করতে চান?")) return;
    const res = await deleteUser(id);
    if (res.success) {
      toast.success("স্টাফ সফলভাবে ডিলিট করা হয়েছে।");
      loadUsers();
    } else {
      toast.error(res.error);
    }
  }

  // Client-side guard (middleware already blocks, this is defense-in-depth)
  if (status === "authenticated" && userRole !== UserRole.SUPER_ADMIN) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center">
        <ShieldOff className="h-16 w-16 text-destructive opacity-70" />
        <h2 className="text-2xl font-bold">অ্যাক্সেস নেই</h2>
        <p className="text-muted-foreground max-w-md">
          এই পেজটি শুধুমাত্র সুপার অ্যাডমিনের জন্য। আপনার রোলে এই পেজ দেখার অনুমতি নেই।
        </p>
        <Button onClick={() => router.push("/dashboard")} variant="outline">
          ড্যাশবোর্ডে ফিরে যান
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ইউজার ও রোল ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground italic">অ্যাডমিন প্যানেলে অ্যাক্সেস লেভেল এবং স্টাফ মেম্বারদের তালিকা</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4" /> নতুন ইউজার
        </Button>
      </div>

      <UserForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSuccess={loadUsers} 
      />

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">নাম</TableHead>
              <TableHead className="font-bold">ইমেইল</TableHead>
              <TableHead className="font-bold">ডেজিগনেশন/রোল</TableHead>
              <TableHead className="font-bold">অ্যাক্সেস লেভেল</TableHead>
              <TableHead className="text-right font-bold">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground italic">
                  লোড হচ্ছে...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground italic">
                  কোনো ইউজার পাওয়া হয়নি।
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id} className="hover:bg-muted/30">
                  <TableCell className="font-bold flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" /> {user.name}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" /> {user.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-xs">
                      <Briefcase className="h-3 w-3" /> {user.designation || "স্টাফ"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === UserRole.SUPER_ADMIN ? "destructive" : "default"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(user._id)}>
                          <Trash2 className="h-4 w-4" /> ডিলিট করুন
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
