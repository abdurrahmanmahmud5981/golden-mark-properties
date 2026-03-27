"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, Info, Phone, LayoutGrid, LogIn, LayoutDashboard, Menu, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/", icon: Home, label: "হোম" },
  { href: "/projects", icon: LayoutGrid, label: "প্রজেক্টসমূহ" },
  { href: "/browse", icon: LayoutDashboard, label: "উপলব্ধ ফ্ল্যাট" },
  { href: "/about", icon: Info, label: "আমাদের সম্পর্কে" },
  { href: "/contact", icon: Phone, label: "যোগাযোগ" },
];

export function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 py-1">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/golden-mark-logo.png"
            alt="Golden Mark Properties"
            width={80}
            height={80}
            className="w-auto h-16"
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
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted text-sm font-medium">
                        {initials}
                      </div>
                    )}
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center cursor-pointer w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>ড্যাশবোর্ড</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:bg-destructive/10 cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>লগআউট</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" /> লগইন
              </Button>
            </Link>
          )}
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
            <SheetContent side="right" className="w-80 sm:w-96 px-5">
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Image
                    src="/golden-mark-logo.png"
                    alt="Golden Mark Properties"
                    width={70}
                    height={70}
                    className="w-auto h-12"
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
                  {status === "authenticated" ? (
                    <>
                      <div className="flex items-center gap-3 px-2 py-2 border-b mb-2">
                        <div className="h-10 w-10 rounded-full overflow-hidden border bg-muted flex items-center justify-center font-medium">
                          {user?.image ? (
                            <Image src={user.image} alt={user.name || "User"} width={40} height={40} className="object-cover h-full w-full" />
                          ) : (
                            initials
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{user?.name}</span>
                          <span className="text-xs text-muted-foreground">{user?.email}</span>
                        </div>
                      </div>
                      <Link href="/dashboard">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <LayoutDashboard className="h-4 w-4" /> ড্যাশবোর্ড
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10"
                        onClick={() => signOut()}
                      >
                        <LogOut className="h-4 w-4" /> লগআউট
                      </Button>
                    </>
                  ) : (
                    <Link href="/login">
                      <Button variant="outline" className="w-full gap-2">
                        <LogIn className="h-4 w-4" /> লগইন
                      </Button>
                    </Link>
                  )}
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
