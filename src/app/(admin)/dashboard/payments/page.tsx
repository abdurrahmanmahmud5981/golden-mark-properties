"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Printer, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getPayments } from "@/lib/actions/payment-actions";
import { IPayment, IClient, IBooking, IUnit } from "@/lib/types";
import { Pagination } from "@/components/layout/Pagination";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function PaymentListPage() {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;

  async function loadPayments() {
    setLoading(true);
    try {
      const { data, totalPages, totalItems } = await getPayments(currentPage, limit, search);
      setPayments(data);
      setTotalPages(totalPages);
      setTotalItems(totalItems);
    } catch (error) {
      toast.error("পেমেন্ট লোড করা সম্ভব হয়নি।");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
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
          <h1 className="text-3xl font-bold">পেমেন্ট ও কালেকশন</h1>
          <p className="text-muted-foreground italic">সকল কিস্তি এবং বুকিং মানি সংগ্রহের ইতিহাস</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="রিসিট নং দিয়ে খুঁজুন..." 
              className="pl-9 h-10 rounded-lg"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 gap-2 shrink-0 w-full md:w-auto">
            <Plus className="h-4 w-4" /> নতুন পেমেন্ট
          </Button>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">তারিখ</TableHead>
              <TableHead className="font-bold">ক্লায়েন্ট</TableHead>
              <TableHead className="font-bold">বিবরণ</TableHead>
              <TableHead className="font-bold">পরিমাণ (৳)</TableHead>
              <TableHead className="font-bold">মাধ্যম</TableHead>
              <TableHead className="font-bold">স্ট্যাটাস</TableHead>
              <TableHead className="text-right font-bold">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-24">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <span className="text-muted-foreground italic">লোড হচ্ছে...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground italic">
                  কোনো পেমেন্ট রেকর্ড পাওয়া হয়নি।
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment._id} className="hover:bg-muted/30">
                  <TableCell className="text-xs">
                    {new Date(payment.createdAt || Date.now()).toLocaleDateString('bn-BD')}
                  </TableCell>
                  <TableCell className="font-bold">
                    {((payment.booking as IBooking)?.client as IClient)?.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{payment.description || "কিস্তি"}</span>
                      <span className="text-xs text-muted-foreground">ইউনিট: {((payment.booking as IBooking)?.unit as IUnit)?.unitNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-green-600">
                    {payment.amount?.toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-600 border-green-600 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="h-3 w-3" /> পরিশোধিত
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Printer className="h-4 w-4" /> মানি রিসিট প্রিন্ট
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {!loading && payments.length > 0 && (
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
