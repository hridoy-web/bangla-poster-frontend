"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: "Hridoy Chowdhury",
    email: "hridoy@gmail.com",
  });

  const getFirstWord = (fullName: string) => {
    return fullName.trim().split(" ")[0];
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="font-medium">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button size="sm" className="bg-gradient-btn font-medium rounded-xl">
            Register
          </Button>
        </Link>
      </div>
    );
  }

  const firstName = getFirstWord(user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2.5 focus:outline-none group px-2 py-1 rounded-full hover:bg-secondary/60 transition-colors">
          <div className="w-9 h-9 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center border border-primary/20 shadow-inner group-hover:scale-105 transition-transform text-sm">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <span className="hidden md:inline-block text-sm font-medium text-foreground">
            {firstName}
          </span>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl">
        <div className="px-3 py-2 space-y-0.5">
          <p className="text-sm font-semibold text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        
        <DropdownMenuSeparator className="my-1" />
        
        <DropdownMenuItem asChild>
          <Link href="/history" className="flex items-center gap-2 cursor-pointer rounded-lg">
            <Sparkles className="w-4 h-4" /> My Posters
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-1" />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer rounded-lg"
        >
          <LogOut className="w-4 h-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}