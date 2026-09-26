import { UserPlus, LayoutTemplate, Sparkles, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "০১",
    title: "একাউন্ট তৈরি করুন",
    description: "সহজেই আপনার ইমেল বা ফোন নম্বর দিয়ে একটি ফ্রি একাউন্ট তৈরি করে নিন এবং সাইন-ইন করুন।",
    icon: UserPlus,
  },
  {
    step: "০২",
    title: "টেমপ্লেট পছন্দ করুন",
    description: "বিজয় দিবস, শোকসভা বা নির্বাচনী প্রচারণার মতো ক্যাটাগরি থেকে আপনার পছন্দমতো প্রফেশনাল টেমপ্লেট বেছে নিন।",
    icon: LayoutTemplate,
  },
  {
    step: "০৩",
    title: "তথ্য দিন ও পোস্টার রেডি",
    description: "নাম, পদবি, দলীয় লোগো এবং ছবি দিয়ে সাবমিট করুন—এআই মুহূর্তেই বানিয়ে দেবে প্রিন্ট-রেডি পোস্টার।",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-card/40 border-t border-border/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/80 border border-primary/20 text-accent-foreground text-xs md:text-sm font-medium">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>সহজ কার্যপদ্ধতি</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            মাত্র ৩ ধাপে তৈরি করুন রাজনৈতিক পোস্টার
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans">
            কোনো ধরনের ডিজাইন অভিজ্ঞতা ছাড়াই খুব দ্রুত প্রফেশনাল পোস্টার তৈরির ঝামেলাহীন উপায়।
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="relative bg-card/80 backdrop-blur-md border border-border/60 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-primary/50 transition-all group"
              >
                <div className="space-y-6">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-primary/40 font-heading" style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}>
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground font-heading">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom subtle indicator */}
                <div className="pt-6 mt-6 border-t border-border/40 flex items-center text-xs font-semibold text-primary gap-1">
                  <span>ধাপ <span style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }} className="inline-block">{item.step}</span></span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}