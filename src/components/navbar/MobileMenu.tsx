"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Home, Sparkles, History, LogIn, UserPlus, LogOut, PhoneCall } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "../shared/Logo";
import { logoutService } from "@/lib/services/authService";

export default function MobileMenu() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [user, setUser] = useState<{ name: string; emailOrPhone: string } | null>(() => {
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Create Poster", href: "/create-poster", icon: Sparkles },
    { name: "My History", href: "/history", icon: History },
    { name: "Contact", href: "/contact", icon: PhoneCall },
  ];

  const handleLogout = () => {
    logoutService();
    setUser(null);
    router.push("/login");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden rounded-xl cursor-pointer">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80 p-6 flex flex-col justify-between rounded-r-3xl overflow-y-auto">
        <div className="space-y-6">
          <div className="pb-4 border-b border-border/60">
            <Logo />
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <SheetClose key={item.name} asChild>
                  <Link 
                    href={item.href} 
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                      isActive 
                        ? "bg-primary/10 text-primary font-semibold" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} /> 
                    {item.name}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-border/60 pt-4 mt-6">
          {!user ? (
            <div className="flex flex-col gap-3">
              <div className="px-1 py-0.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Account Access
              </div>
              <SheetClose asChild>
                <Link href="/login">
                  <Button variant="outline" className="w-full justify-center gap-2 rounded-full h-11 font-semibold cursor-pointer shadow-none">
                    <LogIn className="w-4 h-4" /> Login
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/register">
                  <Button className="w-full justify-center gap-2 bg-gradient-btn rounded-full h-11 font-semibold shadow-md cursor-pointer">
                    <UserPlus className="w-4 h-4" /> Register
                  </Button>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-2xl border border-border/40">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.emailOrPhone}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl shrink-0 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}