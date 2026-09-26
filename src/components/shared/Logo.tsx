import Link from "next/link";
import { Wand2 } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-10 h-10 rounded-xl bg-gradient-btn flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
        <Wand2 className="w-5 h-5" />
      </div>
      <span className="text-xl font-bold tracking-tight text-gradient-brand font-heading">
        BanglaPoster
      </span>
    </Link>
  );
}