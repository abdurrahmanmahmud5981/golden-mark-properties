import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, MoveRight } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      id: "1",
      title: "Golden Tower",
      location: "মাতুয়াইল, ঢাকা",
      status: "চলমান",
      type: "অপার্টমেন্ট",
      image: "https://images.unsplash.com/photo-1590725121839-892b458a74ec?q=80&w=800",
    },
    {
      id: "2",
      title: "Golden View Tower",
      location: "মাতুয়াইল, ঢাকা",
      status: "চলমান",
      type: "অপার্টমেন্ট",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
    },
    {
      id: "3",
      title: "Golden Plaza",
      location: "মাতুয়াইল, ঢাকা",
      status: "আসন্ন",
      type: "শেয়ার প্রজেক্ট",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    },
  ];

  return (
    <div className="container px-4 py-20">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-primary">আমাদের প্রজেক্টসমূহ</h1>
        <p className="text-muted-foreground text-lg">
          মাতুয়াইল ও এর আশেপাশে আমাদের সকল ফ্ল্যাট ও শেয়ার প্রজেক্টের তালিকা।
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="group flex flex-col border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-card">
            <div className="aspect-[4/3] relative overflow-hidden">
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <Badge className="bg-primary hover:bg-primary">{project.type}</Badge>
                <Badge variant="secondary" className="bg-white/90 backdrop-blur text-primary">{project.status}</Badge>
              </div>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: `url('${project.image}')` }} 
              />
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-destructive" />
                  <span>{project.location}</span>
                </div>
              </div>
              <Button asChild className="w-full h-12 rounded-xl text-md group-hover:bg-primary">
                <Link href={`/projects/${project.id}`}>
                  বিস্তারিত দেখুন <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
