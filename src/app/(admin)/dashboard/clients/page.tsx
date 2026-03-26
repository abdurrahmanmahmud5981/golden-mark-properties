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
import { Pagination } from "@/components/layout/Pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { IClient } from "@/lib/types";

export default function ClientListPage() {
  const [clients, setClients] = useState<IClient[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;

  async function loadClients() {
    setLoading(true);
    try {
      const { data, totalPages, totalItems } = await getClients(currentPage, limit, search);
      setClients(data);
      setTotalPages(totalPages);
      setTotalItems(totalItems);
    } catch (error) {
      toast.error("ক্লায়েন্ট লোড করা সম্ভব হয়নি।");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, [currentPage, search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">ক্লায়েন্ট লিস্ট</h1>
          <p className="text-muted-foreground italic">স্বর্ণপদক প্রোপার্টিজের সকল সম্মানিত ক্লায়েন্টদের তালিকা</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="নাম দিয়ে খুঁজুন..." 
              className="pl-9 h-10 rounded-lg"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 gap-2 shrink-0 w-full md:w-auto">
            <Plus className="h-4 w-4" /> নতুন ক্লায়েন্ট
          </Button>
        </div>
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
                <TableCell colSpan={5} className="text-center py-24">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <span className="text-muted-foreground italic">লোড হচ্ছে...</span>
                  </div>
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
        {!loading && clients.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
