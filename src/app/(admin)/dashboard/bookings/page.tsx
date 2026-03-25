"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Eye, FileText, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { getBookings } from "@/lib/actions/booking-actions";
import { getClients } from "@/lib/actions/client-actions";
import { getUnits } from "@/lib/actions/unit-actions";
import { BookingStatus, IBooking, IClient, IProject, IUnit } from "@/lib/types";
import { BookingForm } from "@/components/forms/BookingForm";

export default function BookingListPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [clients, setClients] = useState<IClient[]>([]);
  const [units, setUnits] = useState<IUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  async function loadData() {
    setLoading(true);
    const [bookingsData, clientsData, unitsData] = await Promise.all([
      getBookings(),
      getClients(),
      getUnits()
    ]);
    setBookings(bookingsData);
    setClients(clientsData || []);
    setUnits(unitsData || []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">বুকিং ও সেলস</h1>
          <p className="text-muted-foreground italic">প্রজেক্ট ভিত্তিক ফ্ল্যাট বুকিং এবং বিক্রয়ের রেকর্ড</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4" /> নতুন বুকিং
        </Button>
      </div>

      <BookingForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        clients={clients}
        units={units}
        onSuccess={loadData}
      />

      <div className="border rounded-2xl bg-card overflow-hidden overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">তারিখ</TableHead>
              <TableHead className="font-bold">ক্লায়েন্ট</TableHead>
              <TableHead className="font-bold">প্রজেক্ট ও ইউনিট</TableHead>
              <TableHead className="font-bold">মোট মূল্য (৳)</TableHead>
              <TableHead className="font-bold">বুকিং মানি</TableHead>
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
            ) : bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground italic">
                  কোনো বুকিং পাওয়া হয়নি।
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking._id} className="hover:bg-muted/30">
                  <TableCell className="text-xs">
                    {new Date(booking.createdAt || Date.now()).toLocaleDateString('bn-BD')}
                  </TableCell>
                  <TableCell className="font-bold">{(booking.client as IClient)?.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-primary">{((booking.unit as IUnit)?.project as IProject)?.title}</span>
                      <span className="text-xs text-muted-foreground">ইউনিট: {(booking.unit as IUnit)?.unitNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">{booking.totalAmount?.toLocaleString()}</TableCell>
                  <TableCell>{booking.bookingAmount?.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={booking.status === BookingStatus.APPROVED ? "default" : "secondary"}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" /> বিস্তারিত দেখুন
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <CreditCard className="h-4 w-4" /> পেমেন্ট গ্রহণ
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <FileText className="h-4 w-4" /> এগ্রিমেন্ট ডাউনলোড
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
