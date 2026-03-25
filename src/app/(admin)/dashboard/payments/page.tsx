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

export default function PaymentListPage() {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPayments() {
    setLoading(true);
    const data = await getPayments();
    setPayments(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">পেমেন্ট ও কালেকশন</h1>
          <p className="text-muted-foreground italic">সকল কিস্তি এবং বুকিং মানি সংগ্রহের ইতিহাস</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" /> নতুন পেমেন্ট
        </Button>
      </div>

      <div className="border rounded-2xl bg-card overflow-hidden">
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
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground italic">
                  লোড হচ্ছে...
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
                  <TableCell className="font-bold">{(payment.client as IClient)?.name}</TableCell>
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
      </div>
    </div>
  );
}
