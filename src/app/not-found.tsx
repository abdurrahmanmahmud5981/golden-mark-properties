import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, SearchX, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-10">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full aspect-square"></div>
            <SearchX className="h-32 w-32 md:h-48 md:w-48 text-primary relative z-10 drop-shadow-xl" strokeWidth={1} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-destructive tracking-tighter">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            পৃষ্ঠাটি পাওয়া যায়নি
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা আমরা খুঁজে পাইনি। এটি হয়তো সরিয়ে ফেলা হয়েছে অথবা লিংকটি ভুল।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto gap-2 h-14 px-8 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
              <Home className="h-5 w-5" />
              হোমপেজে ফিরে যান
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 h-14 px-8 text-lg rounded-2xl border-2 hover:bg-muted transition-all">
              <Phone className="h-5 w-5" />
              যোগাযোগ করুন
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
