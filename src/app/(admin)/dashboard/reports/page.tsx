import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, PieChart, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">রিপোর্ট ও অ্যানালিটিক্স</h1>
        <p className="text-muted-foreground italic">ব্যবসায়িক প্রবৃদ্ধি এবং আর্থিক অবস্থার বিস্তারিত পরিসংখ্যান</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">মোট বিক্রয় লক্ষ্যমাত্রা</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">১২৫ কোটি ৳</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" /> গত বছরের তুলনায় ২০% বৃদ্ধি
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">আদায়কৃত পেমেন্ট</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৪৮.৫ কোটি ৳</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="font-bold text-primary">৩৯%</span> লক্ষ্যমাত্রা অর্জিত
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">চলতি মাসের সংগ্রহ</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">২.৪ কোটি ৳</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-destructive">
              <ArrowDownRight className="h-3 w-3" /> গত মাসের তুলনায় ৫% হ্রাস
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">প্রজেক্ট ভিত্তিক বিক্রয়</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { name: "Golden Tower", progress: 85, color: "bg-blue-600" },
              { name: "Golden View", progress: 60, color: "bg-destructive" },
              { name: "Matuail Heights", progress: 45, color: "bg-green-600" },
              { name: "Plaza One", progress: 30, color: "bg-orange-500" },
            ].map((p, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${p.color}`} style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">কালেকশন স্ট্যাটাস</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-6">
            <div className="relative h-48 w-48 rounded-full border-[16px] border-muted flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-r-transparent transform -rotate-45" />
              <div className="text-center">
                <p className="text-3xl font-bold">৭৫%</p>
                <p className="text-xs text-muted-foreground italic">অন-টাইম কালেকশন</p>
              </div>
            </div>
            <div className="ml-8 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span>পরিশোধিত (৳৬২ কোটি)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-muted" />
                <span>বকেয়া (৳২১ কোটি)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
