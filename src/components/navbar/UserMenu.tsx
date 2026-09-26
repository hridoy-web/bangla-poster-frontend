"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Sparkles, User, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutService } from "@/lib/services/authService";

export default function UserMenu() {
  const router = useRouter();
  const [mounted] = useState(true);
  
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

  const getFirstWord = (fullName: string) => {
    return fullName ? fullName.trim().split(" ")[0] : "User";
  };

  const handleLogout = () => {
    logoutService();
    setUser(null);
    router.push("/login");
  };

  if (!mounted) {
    return <div className="h-10 w-24" />;
  }

  return (
    <div className="flex items-center">
      {!user ? (
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button 
              variant="ghost" 
              size="sm" 
              className="font-semibold px-6 py-2.5 h-10 rounded-full hover:bg-secondary cursor-pointer border-0 shadow-none"
            >
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button 
              size="sm" 
              className="bg-gradient-btn font-semibold px-6 py-2.5 h-10 rounded-full shadow-md hover:opacity-95 transition-opacity cursor-pointer border-0 ring-0 focus-visible:ring-0"
            >
              Register
            </Button>
          </Link>
        </div>
      ) : null}

      <div className={`${!user ? "md:hidden" : "flex"} items-center ml-2`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 focus:outline-none group p-2 rounded-full hover:bg-secondary/65 transition-colors border border-border/50 cursor-pointer">
              {user ? (
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs shadow-sm group-hover:scale-105 transition-transform">
                  {getFirstWord(user.name).charAt(0).toUpperCase()}
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-secondary text-foreground flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
              {user && (
                <span className="hidden md:inline-block text-sm font-semibold text-foreground pr-1">
                  {getFirstWord(user.name)}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-60 p-2.5 rounded-2xl shadow-2xl bg-card border border-border">
            {user ? (
              <>
                <div className="px-3 py-2 space-y-0.5">
                  <p className="text-sm font-bold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.emailOrPhone}</p>
                </div>
                
                <DropdownMenuSeparator className="my-1.5 border-border" />
                
                <DropdownMenuItem asChild>
                  <Link href="/history" className="flex items-center gap-2.5 cursor-pointer rounded-xl font-medium py-2.5">
                    <Sparkles className="w-4 h-4 text-primary" /> My Posters
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-1.5 border-border" />
                
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 text-destructive focus:text-destructive cursor-pointer rounded-xl font-medium py-2.5"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <div className="px-3 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Account Access
                </div>
                <DropdownMenuSeparator className="my-1.5 border-border" />
                <DropdownMenuItem asChild>
                  <Link href="/login" className="flex items-center justify-center gap-2 cursor-pointer rounded-full font-semibold py-2.5 bg-secondary/60 hover:bg-secondary text-foreground my-1">
                    <LogIn className="w-4 h-4 text-primary" /> Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register" className="flex items-center justify-center gap-2 cursor-pointer rounded-full font-semibold py-2.5 bg-gradient-btn text-primary-foreground shadow-sm hover:opacity-95 my-1">
                    <UserPlus className="w-4 h-4" /> Register
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}