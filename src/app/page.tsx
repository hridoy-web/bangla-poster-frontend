import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import TemplateGallery from "@/components/home/TemplateGallery";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TemplateGallery />
      <HowItWorks />
      <FaqSection />
    </>
  );
}