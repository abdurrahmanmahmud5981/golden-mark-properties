"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Edit, Trash2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getProjects, deleteProject } from "@/lib/actions/project-actions";
import { toast } from "sonner";
import Link from "next/link";
import { ProjectForm } from "@/components/forms/ProjectForm";

import { IProject } from "@/lib/types";

export default function ProjectListPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  async function loadProjects() {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleAdd() {
    setSelectedProject(null);
    setIsFormOpen(true);
  }

  function handleEdit(project: IProject) {
    setSelectedProject(project);
    setIsFormOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই প্রজেক্টটি ডিলিট করতে চান?")) return;
    const res = await deleteProject(id);
    if (res.success) {
      toast.success("প্রজেক্ট সফলভাবে ডিলিট করা হয়েছে।");
      loadProjects();
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">প্রজেক্ট ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground italic">সকল প্রজেক্টের তালিকা এবং নতুন প্রজেক্ট যোগ করুন</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={handleAdd}>
          <Plus className="h-4 w-4" /> নতুন প্রজেক্ট
        </Button>
      </div>

      <ProjectForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        project={selectedProject} 
        onSuccess={loadProjects} 
      />

      <div className="border rounded-2xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">প্রজেক্টের নাম</TableHead>
              <TableHead className="font-bold">অবস্থান</TableHead>
              <TableHead className="font-bold">স্ট্যাটাস</TableHead>
              <TableHead className="font-bold">মোট ইউনিট</TableHead>
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
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground italic">
                  কোনো প্রজেক্ট পাওয়া যায়নি।
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project._id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-primary">
                    <Link href={`/projects/${project._id}`} target="_blank" className="hover:underline flex items-center gap-1">
                      {project.title} <ExternalLink className="h-3 w-3" />
                    </Link>
                  </TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>
                    <Badge variant={project.status === "সম্পন্ন" ? "secondary" : "default"}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.totalUnits || "নির্ধারিত নেই"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => handleEdit(project)}>
                          <Edit className="h-4 w-4" /> এডিট করুন
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(project._id)}>
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
