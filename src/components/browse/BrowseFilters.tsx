"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UnitStatus } from "@/lib/types";

export function BrowseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams?.get("search") || "");
  const [minPrice, setMinPrice] = useState(searchParams?.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams?.get("maxPrice") || "");
  const [status, setStatus] = useState(searchParams?.get("status") || "all");
  const [sort, setSort] = useState(searchParams?.get("sort") || "newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update search when URL changes (e.g. browser back button)
  useEffect(() => {
    setSearch(searchParams?.get("search") || "");
    setMinPrice(searchParams?.get("minPrice") || "");
    setMaxPrice(searchParams?.get("maxPrice") || "");
    setStatus(searchParams?.get("status") || "all");
    setSort(searchParams?.get("sort") || "newest");
  }, [searchParams]);

  const updateURL = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    // Reset to page 1 on filter/search
    params.set("page", "1");
    router.push(`/browse?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search });
  };

  const clearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setStatus("all");
    setSort("newest");
    router.push("/browse");
  };

  const hasActiveFilters = search || minPrice || maxPrice || status !== "all" || sort !== "newest";

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-muted/30 rounded-2xl border shadow-sm">
        <form onSubmit={handleSearch} className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 bg-background rounded-xl border-muted-foreground/20 focus:ring-primary/20" 
            placeholder="প্রজেক্ট বা এলাকা দিয়ে খুঁজুন..." 
          />
          {search && (
            <button 
              type="button" 
              onClick={() => { setSearch(""); updateURL({ search: null }); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        <div className="flex gap-3">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-12 px-5 gap-2 rounded-xl border-muted-foreground/20 hover:bg-muted">
                <Filter className="h-4 w-4" /> ফিল্টার
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 p-4 space-y-4 rounded-xl">
              <div className="flex flex-col space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold leading-none">ফিল্টারসমূহ</h4>
                  <p className="text-xs text-muted-foreground italic">আপনার বাজেট ও পছন্দ অনুযায়ী খুঁজুন</p>
                </div>
                
                <hr className="-mx-4 border-muted/50" />
                
                <div className="space-y-2">
                  <label className="text-sm font-bold">মূল্য পরিসীমা (৳)</label>
                  <div className="flex gap-2">
                    <Input 
                      type="number" 
                      placeholder="সর্বনিম্ন" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="h-10 text-xs rounded-lg" 
                    />
                    <Input 
                      type="number" 
                      placeholder="সর্বোচ্চ" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="h-10 text-xs rounded-lg" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">স্ট্যাটাস</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["all", ...Object.values(UnitStatus)].map((s) => (
                      <Button 
                        key={s}
                        variant={status === s ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatus(s)}
                        className="text-xs h-8 rounded-lg"
                      >
                        {s === "all" ? "সবগুলো" : s}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Button 
                    className="flex-1 rounded-lg" 
                    onClick={() => updateURL({ search, minPrice, maxPrice, status, sort })}
                  >
                    প্রয়োগ করুন
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={clearFilters}
                    className="rounded-lg"
                    title="ক্লিয়ার করুন"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 px-5 gap-2 rounded-xl border-muted-foreground/20 hover:bg-muted">
                <ArrowUpDown className="h-4 w-4" /> সর্টিং
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuGroup>
                <DropdownMenuLabel>সর্ট করুন</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
              <DropdownMenuItem onClick={() => updateURL({ sort: "newest" })} className={sort === "newest" ? "bg-muted font-bold" : ""}>
                সর্বশেষ প্রজেক্ট
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateURL({ sort: "price_asc" })} className={sort === "price_asc" ? "bg-muted font-bold" : ""}>
                মূল্য: কম থেকে বেশি
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateURL({ sort: "price_desc" })} className={sort === "price_desc" ? "bg-muted font-bold" : ""}>
                মূল্য: বেশি থেকে কম
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateURL({ sort: "oldest" })} className={sort === "oldest" ? "bg-muted font-bold" : ""}>
                পুরাতন প্রজেক্ট
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            onClick={handleSearch}
            className="h-12 px-10 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-md shadow-primary/20 transition-all active:scale-95"
          >
            খুঁজুন
          </Button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground">সক্রিয় ফিল্টার:</span>
          {search && (
            <Badge variant="secondary" className="gap-1 px-3 py-1 rounded-full">
              সার্চ: {search} <X className="h-3 w-3 cursor-pointer" onClick={() => updateURL({ search: null })} />
            </Badge>
          )}
          {status !== "all" && (
            <Badge variant="secondary" className="gap-1 px-3 py-1 rounded-full">
              স্ট্যাটাস: {status} <X className="h-3 w-3 cursor-pointer" onClick={() => updateURL({ status: null })} />
            </Badge>
          )}
          {(minPrice || maxPrice) && (
            <Badge variant="secondary" className="gap-1 px-3 py-1 rounded-full">
              মূল্য: {minPrice || "০"} - {maxPrice || "∞"} <X className="h-3 w-3 cursor-pointer" onClick={() => updateURL({ minPrice: null, maxPrice: null })} />
            </Badge>
          )}
          {sort !== "newest" && (
            <Badge variant="secondary" className="gap-1 px-3 py-1 rounded-full">
              সর্ট: {sort.replace("_", " ")} <X className="h-3 w-3 cursor-pointer" onClick={() => updateURL({ sort: null })} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full">
            সব ক্লিয়ার করুন
          </Button>
        </div>
      )}
    </div>
  );
}
