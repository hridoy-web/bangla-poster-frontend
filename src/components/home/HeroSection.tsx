import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-28 bg-gradient-mesh">

      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 md:size-112.5 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/85 border border-primary/20 text-accent-foreground text-xs md:text-sm font-medium shadow-sm">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>প্রফেশনাল পলিটিক্যাল পোস্টার মেকার প্ল্যাটফর্ম</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-heading leading-snug md:leading-tight">
              মুহূর্তেই তৈরি করুন <br />
              <span className="text-gradient-brand">প্রিন্ট-রেডি রাজনৈতিক পোস্টার</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed px-2">
              নাম, পদবি, দলীয় লোগো এবং ছবি দিয়ে এআই-এর সহায়তায় বানিয়ে নিন আকর্ষণীয় বিজয় দিবস, শোক সংবাদ কিংবা নির্বাচনী প্রচারণার পোস্টার।
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto pt-1">
            <Link href="/create-poster" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-btn text-white px-7 h-11 md:h-12 rounded-2xl font-semibold shadow-md hover:opacity-95 transition-all gap-2 group border-0 focus-visible:ring-0">
                <span>পোস্টার তৈরি শুরু করুন</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/templates" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-11 md:h-12 px-7 rounded-2xl font-semibold border-border hover:bg-secondary/80 transition-colors">
                টেমপ্লেটগুলো দেখুন
              </Button>
            </Link>
          </div>

          {/* Trust Indicators Text */}
          <div className="pt-6 md:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-muted-foreground text-xs sm:text-sm font-medium border-t border-border/70 w-full max-w-3xl mt-6">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-primary shrink-0" />
              <span>এক ক্লিকেই জেনারেট করুন</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>হাই-কোয়ালিটি প্রিন্ট রেজুলেশন</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <span>স্মার্ট বাংলা টাইপোগ্রাফি</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}