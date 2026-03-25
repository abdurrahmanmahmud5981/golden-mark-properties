import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Home, Users, CreditCard, TrendingUp, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "মোট প্রজেক্ট", value: "১২", icon: Building2, color: "text-blue-600" },
    { label: "উপলব্ধ ফ্ল্যাট", value: "৪৫", icon: Home, color: "text-green-600" },
    { label: "মোট ক্লায়েন্ট", value: "১২৮", icon: Users, color: "text-purple-600" },
    { label: "মোট সংগ্রহ (৳)", value: "৮.৫ কোটি", icon: CreditCard, color: "text-orange-600" },
  ];

  const recentLeads = [
    { name: "আব্দুর রহমান", phone: "০১৭৮৯xxxxxx", project: "Golden Tower", date: "২ ঘণ্টা আগে" },
    { name: "করিম উদ্দিন", phone: "০১৬১৮xxxxxx", project: "Golden View", date: "৫ ঘণ্টা আগে" },
    { name: "সাদিয়া ইসলাম", phone: "০১৯১১xxxxxx", project: "Golden Plaza", date: "১ দিন আগে" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">ড্যাশবোর্ড ওভারভিউ</h1>
        <p className="text-muted-foreground italic">স্বাগতম! আজকের কার্যক্রমের সংক্ষিপ্ত বিবরণ নিচে দেওয়া হলো।</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">↑ ১২%</span> গত মাস থেকে
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">সাম্প্রতিক লিডসমূহ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentLeads.map((lead, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {lead.name[0]}
                    </div>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.project}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{lead.phone}</p>
                    <p className="text-xs text-muted-foreground">{lead.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-primary font-medium hover:underline">
              সকল লিড দেখুন
            </button>
          </CardContent>
        </Card>

        {/* Sales Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">বিক্রয়ের স্থিতি</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>বিক্রিত ফ্ল্যাট</span>
                <span className="font-bold">৬৫%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>বকেয়া কিস্তি সংগ্রহ</span>
                <span className="font-bold">৮০%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[80%]" />
              </div>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-3 text-orange-800">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">
                <strong>দৃষ্টি আকর্ষণ:</strong> ৪টি প্রজেক্টের কিস্তি সংগ্রহের সময়সীমা শেষ হয়েছে। দ্রুত ব্যবস্থা নিন।
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
