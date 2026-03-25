import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-12 bg-muted/10">
        <div className="container px-4 text-center space-y-4">
          <div className="flex justify-center">
            <Image
              src="/golden-mark-log0.png"
              alt="Golden Mark Properties"
              width={60}
              height={60}
              className="w-auto h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Golden Mark Properties Ltd. - মাতুয়াইল, ঢাকা-১৩৬২. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </footer>
    </div>
  );
}
