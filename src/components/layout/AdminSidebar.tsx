"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Home,
  Users,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { UserRole } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, easeOut } from "framer-motion";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  allowedRoles?: UserRole[];
};

const menuItems: MenuItem[] = [
  {
    label: "ড্যাশবোর্ড",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "প্রজেক্ট ম্যানেজমেন্ট",
    href: "/dashboard/projects",
    icon: Building2,
  },
  {
    label: "ফ্ল্যাট/ইউনিট",
    href: "/dashboard/units",
    icon: Home,
    allowedRoles: [UserRole.SUPER_ADMIN, UserRole.SALES, UserRole.PROJECT_MANAGER],
  },
  {
    label: "ক্লায়েন্ট ও লিড",
    href: "/dashboard/leads",
    icon: Users,
    allowedRoles: [UserRole.SUPER_ADMIN, UserRole.SALES],
  },
  {
    label: "বুকিং ও সেলস",
    href: "/dashboard/bookings",
    icon: MessageSquare,
    allowedRoles: [UserRole.SUPER_ADMIN, UserRole.SALES, UserRole.FINANCE],
  },
  {
    label: "পেমেন্ট ট্র্যাকিং",
    href: "/dashboard/payments",
    icon: CreditCard,
    allowedRoles: [UserRole.SUPER_ADMIN, UserRole.FINANCE],
  },
  {
    label: "রিপোর্টস",
    href: "/dashboard/reports",
    icon: BarChart3,
    allowedRoles: [UserRole.SUPER_ADMIN, UserRole.FINANCE, UserRole.PROJECT_MANAGER],
  },
  {
    label: "ইউজার ও রোল",
    href: "/dashboard/users",
    icon: Settings,
    allowedRoles: [UserRole.SUPER_ADMIN],
  },
];

const roleLabel: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: "সুপার অ্যাডমিন",
  [UserRole.SALES]: "সেলস এক্সিকিউটিভ",
  [UserRole.FINANCE]: "ফাইন্যান্স",
  [UserRole.PROJECT_MANAGER]: "প্রজেক্ট ম্যানেজার",
};

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

const menuItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
  hover: { x: 4, transition: { duration: 0.2 } },
};

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role as UserRole | undefined;

  const visibleItems = menuItems.filter(
    (item) => !item.allowedRoles || (userRole && item.allowedRoles.includes(userRole))
  );

  const SidebarContent = () => (
    <motion.div
      className="flex flex-col h-full bg-background border-r"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <motion.div className="p-6 border-b" whileHover={{ scale: 1.02 }}>
        <Link href="/" className="flex flex-col items-center text-center group">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <Image
              src="/golden-mark-logo.png"
              alt="Golden Mark Properties"
              width={50}
              height={50}
              className="w-auto h-12 mb-2"
            />
          </motion.div>
          <span className="font-bold text-lg text-primary block leading-tight">
            Admin Panel
          </span>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mt-1 text-nowrap">
            Golden Mark Properties
          </span>
        </Link>
      </motion.div>

      {session?.user && (
        <motion.div
          className="px-4 py-3 border-b bg-muted/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium text-foreground truncate">{session.user.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">
            {userRole ? roleLabel[userRole] ?? userRole : ""}
          </p>
        </motion.div>
      )}

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {visibleItems.map((item, i) => (
          <motion.div
            key={item.href}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={menuItemVariants}
            whileHover="hover"
          >
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        className="p-4 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-destructive hover:bg-destructive/10 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="h-4 w-4" />
          লগআউট
        </motion.button>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col h-screen sticky top-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="outline" size="icon" className="bg-background shadow-sm border-primary/20">
                <Menu className="h-5 w-5" />
              </Button>
            }
          />
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
