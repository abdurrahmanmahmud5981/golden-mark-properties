import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import Link from "next/link";

export default function BrowseFlatsPage() {
  const flats = [
    { id: "1", unit: "4-B", floor: "৪র্থ তলা", size: "১২৫০ বর্গফুট", price: "৬৫,০০,০০০", project: "Golden Tower" },
    { id: "2", unit: "2-A", floor: "২য় তলা", size: "১৬০০ বর্গফুট", price: "৮৫,০০,০০০", project: "Golden View Tower" },
    { id: "3", unit: "7-C", floor: "৭ম তলা", size: "১৩৫০ বর্গফুট", price: "৭০,০০,০০০", project: "Golden Tower" },
    { id: "4", unit: "5-D", floor: "৫ম তলা", size: "১২০০ বর্গফুট", price: "৬০,০০,০০০", project: "Golden Plaza" },
  ];

  return (
    <div className="container px-4 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-primary">উপলব্ধ ফ্ল্যাটসমূহ</h1>
        <p className="text-muted-foreground">আপনার প্রয়োজনীয় সাইজ এবং বাজেট অনুযায়ী ফ্ল্যাট খুঁজে নিন।</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-muted/30 rounded-2xl border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 h-12 bg-background" placeholder="প্রজেক্ট বা এলাকা দিয়ে খুঁজুন..." />
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 px-6 gap-2">
            <SlidersHorizontal className="h-4 w-4" /> ফিল্টার
          </Button>
          <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white">খুঁজুন</Button>
        </div>
      </div>

      {/* Flats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {flats.map((flat) => (
          <div key={flat.id} className="border rounded-2xl p-6 bg-card hover:shadow-md transition-shadow space-y-4">
            <div className="space-y-1">
              <Badge variant="outline" className="text-xs font-normal border-primary text-primary">{flat.project}</Badge>
              <h3 className="text-xl font-bold">ইউনিট: {flat.unit}</h3>
              <p className="text-muted-foreground text-sm">{flat.floor}</p>
            </div>
            
            <hr />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">সাইজ</p>
                <p className="font-bold">{flat.size}</p>
              </div>
              <div>
                <p className="text-muted-foreground">মূল্য</p>
                <p className="font-bold text-primary">৳ {flat.price}</p>
              </div>
            </div>

            <Button asChild variant="secondary" className="w-full text-blue-700 bg-blue-50 hover:bg-blue-100">
              <Link href={`/projects/${flat.id}`}>বিস্তারিত</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
