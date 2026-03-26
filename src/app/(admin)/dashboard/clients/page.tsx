"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Edit, User, FileText } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getClients } from "@/lib/actions/client-actions";
import { toast } from "sonner";

export default function ClientListPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadClients() {
    setLoading(true);
    const data = await getClients();
    setClients(data);
    setLoading(false);
  }

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ক্লায়েন্ট লিস্ট</h1>
          <p className="text-muted-foreground italic">স্বর্ণপদক প্রোপার্টিজের সকল সম্মানিত ক্লায়েন্টদের তালিকা</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" /> নতুন ক্লায়েন্ট
        </Button>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">নাম</TableHead>
              <TableHead className="font-bold">ফোন ও ইমেইল</TableHead>
              <TableHead className="font-bold">NID/পাসপোর্ট</TableHead>
              <TableHead className="font-bold">স্থায়ী ঠিকানা</TableHead>
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
            ) : clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground italic">
                  কোনো ক্লায়েন্ট পাওয়া হয়নি।
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client._id} className="hover:bg-muted/30">
                  <TableCell className="font-bold flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" /> {client.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs">
                      <span>{client.phone}</span>
                      <span className="text-muted-foreground">{client.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{client.nid || "সংযুক্ত নেই"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{client.permanentAddress}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" /> প্রোফাইল এডিট
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <FileText className="h-4 w-4" /> সকল বুকিং দেখুন
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
