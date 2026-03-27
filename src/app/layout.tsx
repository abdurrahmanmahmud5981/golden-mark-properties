import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Golden Mark Properties Ltd. | স্বপ্নের ঠিকানা",
  description: "মাতুয়াইল, ঢাকা ভিত্তিক বিশ্বস্ত রিয়েল এস্টেট কোম্পানি।",
  icons: {
    icon: "/golden-mark-logo.png",
    apple: "/golden-mark-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
