import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";
import { getUnits } from "@/lib/actions/unit-actions";
import { IProject } from "@/lib/types";
import { PublicPagination } from "@/components/layout/PublicPagination";
import { BrowseFilters } from "@/components/browse/BrowseFilters";

export default async function BrowseFlatsPage({ searchParams }: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    status?: string;
    sort?: string;
  }>
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const search = params.search || "";
  const minPrice = params.minPrice !== undefined ? parseInt(params.minPrice) : undefined;
  const maxPrice = params.maxPrice !== undefined ? parseInt(params.maxPrice) : undefined;
  const status = params.status || "all";
  const sort = params.sort || "newest";

  const limit = 8;
  const { data: units, totalPages, totalItems } = await getUnits(
    undefined,
    currentPage,
    limit,
    search,
    sort,
    minPrice,
    maxPrice,
    status
  );

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-primary">উপলব্ধ ফ্ল্যাটসমূহ</h1>
        <p className="text-muted-foreground">আপনার প্রয়োজনীয় সাইজ এবং বাজেট অনুযায়ী ফ্ল্যাট খুঁজে নিন।</p>
      </div>

      {/* Filters & Search */}
      <BrowseFilters />

      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          মোট <span className="font-bold text-foreground">{totalItems}</span> টি ইউনিট পাওয়া গেছে
        </p>
      </div>

      {/* Flats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {units.length > 0 ? (
          units.map((unit) => {
            const project = unit.project as IProject;
            return (
              <div key={unit._id} className="border rounded-xl p-6 bg-card hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs font-normal border-primary text-primary">
                    {project?.title || "Unknown Project"}
                  </Badge>
                  <h3 className="text-xl font-bold">ইউনিট: {unit.unitNumber}</h3>
                  <p className="text-muted-foreground text-sm">{unit.floor}</p>
                </div>

                <hr />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">সাইজ</p>
                    <p className="font-bold">{unit.size} বর্গফুট</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">মূল্য</p>
                    <p className="font-bold text-primary">৳ {unit.price.toLocaleString("bn-BD")}</p>
                  </div>
                </div>

                <Button asChild nativeButton={false} variant="secondary" className="w-full text-blue-700 bg-blue-50 hover:bg-blue-100">
                  <Link href={`/projects/${project?._id}`}>বিস্তারিত</Link>
                </Button>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-24 text-center space-y-4">
            <div className="text-5xl">🏘️</div>
            <h3 className="text-2xl font-bold text-muted-foreground">দুঃখিত, কোনো ফ্ল্যাট পাওয়া যায়নি।</h3>
            <p className="text-muted-foreground">অনুগ্রহ করে অন্য কোনো ফিল্টার বা সার্চ ট্রাই করুন।</p>
            <Button asChild variant="outline">
              <Link href="/browse">সব ফ্ল্যাট দেখুন</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="mt-12">
        <PublicPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}
