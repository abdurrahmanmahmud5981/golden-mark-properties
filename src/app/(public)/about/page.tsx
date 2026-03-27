import { Building2, Target, Eye, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Intro section */}
      <section className="bg-primary py-20 text-white">
        <div className="container px-4 text-center space-y-6 mx-auto">
          <h1 className="text-4xl font-bold">আমাদের সম্পর্কে</h1>
          <p className="max-w-2xl mx-auto text-blue-50 opacity-90 text-lg leading-relaxed">
            Golden Mark Properties Ltd. মাতুয়াইল, ঢাকা কেন্দ্রিক একটি আধুনিক এবং বিশ্বস্ত রিয়েল এস্টেট প্রতিষ্ঠান।
            আমরা গত কয়েক বছর ধরে গ্রাহকদের মানসম্মত আবাসনের নিশ্চয়তা দিয়ে আসছি।
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container px-4 py-20 mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4 p-8 bg-muted/30 rounded-3xl">
            <Target className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">আমাদের লক্ষ্য (Mission)</h3>
            <p className="text-muted-foreground leading-relaxed">
              সাশ্রয়ী মূল্যে আধুনিক সুযোগ-সুবিধা সম্বলিত আবাসন নিশ্চিত করা এবং গ্রাহকের আস্থার প্রতীক হয়ে ওঠা।
            </p>
          </div>
          <div className="space-y-4 p-8 bg-muted/30 rounded-3xl">
            <Eye className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">আমাদের ভিশন (Vision)</h3>
            <p className="text-muted-foreground leading-relaxed">
              মাতুয়াইল তথা ঢাকার আবাসন খাতে এক অনন্য উচ্চতায় পৌঁছানো এবং টেকসই উন্নয়ন নিশ্চিত করা।
            </p>
          </div>
          <div className="space-y-4 p-8 bg-muted/30 rounded-3xl">
            <Users className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">আমাদের প্রতিশ্রুতি</h3>
            <p className="text-muted-foreground leading-relaxed">
              স্বচ্ছতা, সততা এবং সময়মতো প্রজেক্ট হস্থান্তরের মাধ্যমে গ্রাহক সন্তুষ্টি অর্জন।
            </p>
          </div>
        </div>
      </section>

      {/* More Info */}
      <section className="py-20 bg-background border-y">
        <div className="container px-4 grid md:grid-cols-2 gap-16 items-center mx-auto">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2000')] bg-cover bg-center" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">কেন মাতুয়াইলে আমরাই সেরা?</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              আমাদের সকল প্রজেক্ট মাতুয়াইলের সবচাইতে সুন্দর এবং উন্নত পরিবেশে অবস্থিত।
              আশেপাশেই রয়েছে স্কুল, কলেজ, মসজিদ এবং প্রধান বাজার। উন্নত যাতায়াত এবং নিরিবিলি পরিবেশ আমাদের প্রজেক্টগুলোকে অনন্য করে তুলেছে।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
