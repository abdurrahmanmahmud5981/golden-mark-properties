"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Edit, Trash2, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getUnits, deleteUnit } from "@/lib/actions/unit-actions";
import { getProjects } from "@/lib/actions/project-actions";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { UnitForm } from "@/components/forms/UnitForm";
import { Pagination } from "@/components/layout/Pagination";

import { IUnit, IProject } from "@/lib/types";

export default function UnitListPage() {
  const [units, setUnits] = useState<IUnit[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<IUnit | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 10;

  async function loadData() {
    setLoading(true);
    try {
      const [unitsRes, projectsRes] = await Promise.all([
        getUnits(
          selectedProjectId === "all" ? undefined : selectedProjectId,
          currentPage,
          limit
        ),
        getProjects(1, 100) // Load many for the filter
      ]);
      setUnits(unitsRes.data);
      setTotalPages(unitsRes.totalPages);
      setTotalItems(unitsRes.totalItems);
      setProjects(projectsRes.data);
    } catch (error) {
      toast.error("ডাটা লোড করা সম্ভব হয়নি।");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [selectedProjectId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProjectFilter = (val: string | null) => {
    setSelectedProjectId(val || "all");
    setCurrentPage(1);
  };

  function handleAdd() {
    setSelectedUnit(null);
    setIsFormOpen(true);
  }

  function handleEdit(unit: IUnit) {
    setSelectedUnit(unit);
    setIsFormOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই ইউনিটটি ডিলিট করতে চান?")) return;
    const res = await deleteUnit(id);
    if (res.success) {
      toast.success("ইউনিট সফলভাবে ডিলিট করা হয়েছে।");
      loadData();
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">ফ্ল্যাট/ইউনিট ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground italic">সকল প্রজেক্টের ইউনিট সমূহের তালিকা এবং স্ট্যাটাস</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select 
            value={selectedProjectId} 
            onValueChange={handleProjectFilter}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="প্রজেক্ট ফিল্টার" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সব প্রজেক্ট</SelectItem>
              {projects.map((p) => (
                <SelectItem key={p._id} value={p._id}>{p.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90 gap-2 shrink-0" onClick={handleAdd}>
            <Plus className="h-4 w-4" /> নতুন ইউনিট
          </Button>
        </div>
      </div>

      <UnitForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        unit={selectedUnit} 
        projects={projects}
        onSuccess={loadData} 
      />

      <div className="border rounded-xl bg-card overflow-hidden overflow-x-auto">
        <div className="min-w-[1000px]">
          <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">ইউনিট নং</TableHead>
              <TableHead className="font-bold">প্রজেক্ট</TableHead>
              <TableHead className="font-bold">তলা</TableHead>
              <TableHead className="font-bold">সাইজ</TableHead>
              <TableHead className="font-bold">স্ট্যাটাস</TableHead>
              <TableHead className="font-bold">মূল্য (৳)</TableHead>
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
            ) : units.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground italic">
                  কোনো ইউনিট পাওয়া যায়নি।
                </TableCell>
              </TableRow>
            ) : (
              units.map((unit) => (
                <TableRow key={unit._id} className="hover:bg-muted/30">
                  <TableCell className="font-bold">{unit.unitNumber}</TableCell>
                  <TableCell className="text-primary font-medium">{(unit.project as IProject)?.title}</TableCell>
                  <TableCell>{unit.floor}</TableCell>
                  <TableCell>{unit.size}</TableCell>
                  <TableCell>
                    <Badge variant={unit.status === "উপলব্ধ" ? "outline" : "default"} 
                      className={unit.status === "উপলব্ধ" ? "text-green-600 border-green-600" : ""}>
                      {unit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{unit.price?.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => handleEdit(unit)}>
                          <Edit className="h-4 w-4" /> এডিট করুন
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(unit._id)}>
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
        {!loading && units.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        )}
        </div>
      </div>
    </div>
  );
}
