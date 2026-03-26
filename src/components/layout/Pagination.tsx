"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

export function Pagination({ currentPage, totalPages, onPageChange, totalItems }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-4 border-t bg-muted/20">
      <div className="text-sm text-muted-foreground italic">
        মোট <span className="font-bold text-foreground">{totalItems}</span> টি আইটেম পাওয়া গেছে
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="gap-1 h-8 rounded-lg"
        >
          <ChevronLeft className="h-4 w-4" /> আগের পাতা
        </Button>
        <div className="flex items-center gap-1.5 px-2">
          <span className="text-sm font-medium">{currentPage}</span>
          <span className="text-sm text-muted-foreground italic">/</span>
          <span className="text-sm text-muted-foreground italic">{totalPages}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="gap-1 h-8 rounded-lg"
        >
          পরের পাতা <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
