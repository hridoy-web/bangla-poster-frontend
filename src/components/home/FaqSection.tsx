import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "BanglaPoster দিয়ে কী ধরনের পোস্টার তৈরি করা যায়?",
    answer: "BanglaPoster প্ল্যাটফর্ম ব্যবহার করে আপনি খুব সহজেই বিজয় দিবস, শোক বা নির্বাচনী প্রচারণা পোস্টার তৈরি করতে পারবেন।"
  },
  {
    question: "এআই (AI) দিয়ে কীভাবে পোস্টার জেনারেট হয়?",
    answer: "আপনি আপনার নাম, পদবি, দলীয় লোগো এবং ছবি দিয়ে ফর্ম পূরণ করার পর আমাদের সিস্টেম এআই-এর সহায়তায় প্রফেশনাল লেআউট ডিজাইন করে এবং নির্ভুল বাংলা টেক্সট বসিয়ে প্রিন্ট-রেডি পোস্টার তৈরি করে দেয়।"
  },
  {
    question: "তৈরি করা পোস্টার কি প্রিন্ট করার উপযোগী?",
    answer: "হ্যাঁ, জেনারেট হওয়া প্রতিটি পোস্টার হাই-রেজুলেশন (High-Resolution PNG/JPG) ফরম্যাটে পাওয়া যায় যা ফ্লেক্স ব্যানার বা পেপার প্রিন্টের জন্য শতভাগ উপযোগী।"
  },
  {
    question: "এখানে কি নিজের ছবি এবং দলীয় লোগো আপলোড করা যায়?",
    answer: "অবশ্যই! আপনি আপনার নিজের বা নেতার ছবি এবং দলের লোগো আপলোড করে নির্দিষ্ট টেমপ্লেটের সাথে নিখুঁতভাবে সেট করতে পারবেন।"
  },
  {
    question: "পোস্টার তৈরি করতে কি কোনো পেমেন্ট করতে হয়?",
    answer: "প্রাথমিক পর্যায়ে ফ্রি টেমপ্লেট ব্যবহার করে আপনি বিনামূল্যে পোস্টার তৈরি এবং ডাউনলোড করতে পারবেন। প্রিমিয়াম ফিচারের জন্য পরবর্তীতে সাবস্ক্রিপশন অপশন থাকবে।"
  }
];

export default function FaqSection() {
  return (
    <section className="py-16 md:py-24 bg-background border-t border-border/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/80 border border-primary/20 text-accent-foreground text-xs md:text-sm font-medium">
            <HelpCircle className="w-4 h-4 text-primary shrink-0" />
            <span>সচরাচর জিজ্ঞাসিত প্রশ্নাবলী</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
            আপনার মনে থাকা কিছু সাধারণ প্রশ্ন ও উত্তর
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto font-sans">
            আমাদের প্ল্যাটফর্ম ব্যবহার সম্পর্কিত যেকোনো তথ্যের জন্য নিচের প্রশ্নগুলো দেখে নিতে পারেন।
          </p>
        </div>

        {/* Shadcn Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border/60 rounded-2xl px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-primary/50 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-base sm:text-lg hover:text-primary py-5 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base pb-5 leading-relaxed font-sans">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}