import { getProjectById } from "@/lib/actions/project-actions";
import { getUnits } from "@/lib/actions/unit-actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Building2, CheckCircle2, Phone, Download, Layout, Map } from "lucide-react";
import Link from "next/link";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const { data: units } = await getUnits(id);

  // Calculate size range if units exist
  const sizes = units.map(u => parseInt(u.size)).filter(s => !isNaN(s));
  const minSize = sizes.length > 0 ? Math.min(...sizes) : null;
  const maxSize = sizes.length > 0 ? Math.max(...sizes) : null;
  const sizeRange = minSize && maxSize ? `${minSize} - ${maxSize} বর্গফুট` : "যোগাযোগ করুন";

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
            <Button asChild size="lg" className="bg-destructive hover:bg-destructive/90 text-white gap-2">
              <Link href="/contact">
                বুকিং এর জন্য যোগাযোগ করুন <Phone className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              ব্রোশিউর ডাউনলোড করুন <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('${project.images?.[0] || "https://images.unsplash.com/photo-1590725121839-892b458a74ec?q=80&w=2000"}')` }} 
          />
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4 min-h-14 rounded-xl bg-muted/50">
          <TabsTrigger value="details" className="text-md font-bold">বিস্তারিত বর্ণনা</TabsTrigger>
          <TabsTrigger value="floor-plan" className="text-md font-bold">ফ্লোর প্ল্যান</TabsTrigger>
          <TabsTrigger value="map" className="text-md font-bold">ম্যাপ</TabsTrigger>
          <TabsTrigger value="available" className="text-md font-bold">উপলব্ধ ফ্ল্যাট</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="p-8 border rounded-3xl mt-6 space-y-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">বিশেষ বৈশিষ্ট্যসমূহ</h3>
              <div className="grid grid-cols-1 gap-4">
                {project.features && project.features.length > 0 ? (
                  project.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground italic">কোন বৈশিষ্ট্য যোগ করা হয়নি।</p>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">প্রজেক্ট ওভারভিউ</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">মোট ইউনিট</p>
                  <p className="text-xl font-bold">{project.totalUnits || "অজানা"} টি</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">স্ট্যাটাস</p>
                  <p className="text-xl font-bold">{project.status}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">সাইজ</p>
                  <p className="text-xl font-bold">{sizeRange}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground uppercase mb-1">ঠিকানা</p>
                  <p className="text-sm font-bold truncate" title={project.address || project.location}>
                    {project.address || project.location}
                  </p>
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

        <TabsContent value="map" className="p-8 border rounded-3xl mt-6">
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-primary">প্রজেক্ট ম্যাপ</h3>
            {project.mapEmbedUrl || project.mapLink ? (
              <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-sm border bg-muted/30">
                <iframe
                 src={project.mapEmbedUrl || project.mapLink}
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 py-16 bg-muted/20 rounded-xl border-dashed border-2">
                <Map className="h-16 w-16 text-muted-foreground/30" />
                <h3 className="text-xl font-medium text-muted-foreground">ম্যাপ তথ্যটি এই মুহূর্তে উপলব্ধ নয়</h3>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="available" className="p-8 border rounded-3xl mt-6">
          <div className="grid gap-6">
            {units.length > 0 ? (
              units.map((unit) => (
                <div key={unit._id} className="flex flex-col md:flex-row justify-between items-center p-6 bg-muted/30 rounded-xl gap-6">
                  <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-center px-1">
                      {unit.unitNumber}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{unit.floor} তলা</h4>
                      <p className="text-sm text-muted-foreground">সাইজ: {unit.size} বর্গফুট</p>
                    </div>
                  </div>
                  <Badge className={`px-4 py-1 ${
                    unit.status === "উপলব্ধ" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                    unit.status === "বুকড" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" :
                    "bg-red-100 text-red-700 hover:bg-red-100"
                  }`}>
                    {unit.status}
                  </Badge>
                  <Button asChild variant="outline" className="text-primary border-primary hover:bg-primary/5">
                    <Link href="/contact">বুকিং জিজ্ঞাসা</Link>
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-4">
                <Building2 className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">এই প্রজেক্টের কোন ইউনিট এখন পর্যন্ত পাওয়া যায়নি।</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
