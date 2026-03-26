"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PublicPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export function PublicPagination({ currentPage, totalPages, totalItems }: PublicPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-8 border-t border-muted/30">
      <div className="text-sm text-muted-foreground italic order-2 sm:order-1">
        মোট <span className="font-bold text-foreground">{totalItems}</span> টি আইটেম পাওয়া গেছে 
        (পৃষ্ঠা {currentPage}/{totalPages})
      </div>
      
      <div className="flex items-center gap-2 order-1 sm:order-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          className="gap-1 h-10 rounded-xl px-4"
          nativeButton={false}
        >
          {currentPage <= 1 ? (
            <span className="opacity-50 pointer-events-none flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> আগের পাতা
            </span>
          ) : (
            <Link href={createPageURL(currentPage - 1)} className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> আগের পাতা
            </Link>
          )}
        </Button>

        <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none px-2 py-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            // Only show a few pages around the current page if there are many pages
            if (
              totalPages > 7 && 
              page !== 1 && 
              page !== totalPages && 
              Math.abs(page - currentPage) > 1
            ) {
              if (page === 2 && currentPage > 3) return <span key="ellipsis-start" className="px-1">...</span>;
              if (page === totalPages - 1 && currentPage < totalPages - 2) return <span key="ellipsis-end" className="px-1">...</span>;
              return null;
            }

            return (
              <Button
                key={page}
                asChild
                variant={isActive ? "default" : "ghost"}
                size="icon"
                className={`h-9 w-9 rounded-lg ${isActive ? "bg-primary text-white" : ""}`}
                nativeButton={false}
              >
                <Link href={createPageURL(page)}>{page}</Link>
              </Button>
            );
          })}
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          className="gap-1 h-10 rounded-xl px-4"
          nativeButton={false}
        >
          {currentPage >= totalPages ? (
            <span className="opacity-50 pointer-events-none flex items-center gap-1">
              পরের পাতা <ChevronRight className="h-4 w-4" />
            </span>
          ) : (
            <Link href={createPageURL(currentPage + 1)} className="flex items-center gap-1">
              পরের পাতা <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </Button>
      </div>
    </div>
  );
}
