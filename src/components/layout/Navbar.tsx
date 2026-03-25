"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, Info, Phone, LayoutGrid, LogIn, LayoutDashboard, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", icon: Home, label: "হোম" },
  { href: "/projects", icon: LayoutGrid, label: "প্রজেক্টসমূহ" },
  { href: "/browse", icon: LayoutDashboard, label: "উপলব্ধ ফ্ল্যাট" },
  { href: "/about", icon: Info, label: "আমাদের সম্পর্কে" },
  { href: "/contact", icon: Phone, label: "যোগাযোগ" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/golden-mark-log0.png"
            alt="Golden Mark Properties"
            width={80}
            height={80}
            className="w-auto h-10"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-primary flex items-center gap-1">
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" /> লগইন
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-white">
              বুকিং করুন
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-80 sm:w-96">
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Image
                    src="/golden-mark-log0.png"
                    alt="Golden Mark Properties"
                    width={70}
                    height={70}
                    className="w-auto h-9"
                  />
                </div>

                <nav className="flex flex-col gap-3 text-sm font-medium">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted"
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex flex-col gap-3 pt-2">
                  <Link href="/login">
                    <Button variant="outline" className="w-full gap-2">
                      <LogIn className="h-4 w-4" /> লগইন
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="w-full bg-destructive hover:bg-destructive/90 text-white">
                      বুকিং করুন
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
