"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2, Phone, Mail, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getLeads, updateLeadStatus, deleteLead } from "@/lib/actions/crm-actions";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ILead, LeadStatus } from "@/lib/types";

export default function LeadListPage() {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
    setLoading(true);
    const data = await getLeads();
    setLeads(data);
    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function handleStatusChange(id: string, status: LeadStatus) {
    const res = await updateLeadStatus(id, status);
    if (res.success) {
      toast.success("লিড স্ট্যাটাস আপডেট করা হয়েছে।");
      loadLeads();
    } else {
      toast.error(res.error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই লিডটি ডিলিট করতে চান?")) return;
    const res = await deleteLead(id);
    if (res.success) {
      toast.success("লিড সফলভাবে ডিলিট করা হয়েছে।");
      loadLeads();
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">লিড ম্যানেজমেন্ট (CRM)</h1>
        <p className="text-muted-foreground italic">ওয়েবসাইট থেকে আসা সকল ইনকোয়ারি এবং যোগাযোগের তালিকা</p>
      </div>

      <div className="border rounded-2xl bg-card overflow-hidden overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">তারিখ</TableHead>
              <TableHead className="font-bold">নাম</TableHead>
              <TableHead className="font-bold">যোগাযোগ</TableHead>
              <TableHead className="font-bold">মেসেজ/আগ্রহ</TableHead>
              <TableHead className="font-bold">স্ট্যাটাস</TableHead>
              <TableHead className="text-right font-bold">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground italic">
                  লোড হচ্ছে...
                </TableCell>
              </TableRow>
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground italic">
                  কোনো লিড পাওয়া যায়নি।
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead._id} className="hover:bg-muted/30">
                  <TableCell className="text-xs">
                    {new Date(lead.createdAt || Date.now()).toLocaleDateString('bn-BD')}
                  </TableCell>
                  <TableCell className="font-bold">{lead.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>
                      {lead.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={lead.message}>
                    {lead.message}
                  </TableCell>
                  <TableCell>
                    <Select defaultValue={lead.status} onValueChange={(v) => v && handleStatusChange(lead._id, v)}>
                      <SelectTrigger className="h-8 border-none bg-transparent hover:bg-muted/50 transition-colors w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(LeadStatus).map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <UserPlus className="h-4 w-4" /> ক্লায়েন্টে রূপান্তর
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(lead._id)}>
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
    </div>
  );
}
