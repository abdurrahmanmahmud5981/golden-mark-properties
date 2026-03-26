import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Building2, CheckCircle2, Phone, Download, Layout } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // Mock data for now
  const project = {
    title: "Golden Tower",
    location: "মাতুয়াইল, ঢাকা-১৩৬২",
    status: "চলমান",
    type: "অপার্টমেন্ট",
    description: "মাতুয়াইলের প্রাণকেন্দ্রে আধুনিক সুযোগ-সুবিধা সম্বলিত আমাদের এই প্রজেক্টটি গ্রাহকদের জন্য এক অনন্য উপহার। উন্নত স্থাপত্য ডিজাইন এবং প্রশস্ত বারান্দা নিয়ে আপনার স্বপ্নের আবাস গড়ার এখনই সময়।",
    features: ["২৪ ঘণ্টা সিকিউরিটি", "লিফট ও জেনারেটর", "প্রশস্ত পার্কিং", "মসজিদ ও স্কুল নিকটে", "গ্যাস ও পানির সুব্যবস্থা"],
    image: "https://images.unsplash.com/photo-1590725121839-892b458a74ec?q=80&w=2000",
  };

  return (
    <div className="container px-4 py-12 space-y-12">
      {/* Header & Image */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge className="bg-primary">{project.status}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{project.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground text-lg">
            <MapPin className="h-5 w-5 text-destructive" />
            {project.location}
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-white gap-2">
              বুকিং এর জন্য যোগাযোগ করুন <Phone className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              ব্রোশিউর ডাউনলোড করুন <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('${project.image}')` }} 
          />
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3 min-h-14 rounded-xl bg-muted/50">
          <TabsTrigger value="details" className="text-md font-bold">বিস্তারিত বর্ণনা</TabsTrigger>
          <TabsTrigger value="floor-plan" className="text-md font-bold">ফ্লোর প্ল্যান</TabsTrigger>
          <TabsTrigger value="available" className="text-md font-bold">উপলব্ধ ফ্ল্যাট</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="p-8 border rounded-3xl mt-6 space-y-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">বিশেষ বৈশিষ্ট্যসমূহ</h3>
              <div className="grid grid-cols-1 gap-4">
                {project.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">প্রজেক্ট ওভারভিউ</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">মোট ইউনিট</p>
                  <p className="text-xl font-bold">৪৮ টি</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">তলার সংখ্যা</p>
                  <p className="text-xl font-bold">জি+৯</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">সাইজ</p>
                  <p className="text-xl font-bold">১২৫০ - ১৬০০ বর্গফুট</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">ভূমি এলাকা</p>
                  <p className="text-xl font-bold">১০ কাঠা</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="floor-plan" className="p-8 border rounded-3xl mt-6">
          <div className="flex flex-col items-center gap-8 py-12">
            <Layout className="h-24 w-24 text-muted/30" />
            <h3 className="text-2xl font-bold text-muted-foreground">ফ্লোর প্ল্যান শীঘ্রই আসছে</h3>
            <p className="text-muted-foreground">বিস্তারিত জানতে আমাদের অফিসে যোগাযোগ করুন।</p>
          </div>
        </TabsContent>

        <TabsContent value="available" className="p-8 border rounded-3xl mt-6">
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row justify-between items-center p-6 bg-muted/30 rounded-xl gap-6">
                <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                    Flat {i}A
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{i}ম তলা</h4>
                    <p className="text-sm text-muted-foreground">৩ বেডরুম • ৩ বাথরুম • ১২৫০ বর্গফুট</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-4 py-1">উপলব্ধ আছে</Badge>
                <Button variant="outline" className="text-primary border-primary">বুকিং জিজ্ঞাসা</Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
