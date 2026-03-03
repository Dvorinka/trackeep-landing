import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ScreenshotsSection from "@/components/ScreenshotsSection";
import SetupSection from "@/components/SetupSection";
import AISection from "@/components/AISection";
import TechStackSection from "@/components/TechStackSection";
import KnowledgeSection from "@/components/KnowledgeSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1115]">
      <Navbar />
      <HeroSection />
      <TechStackSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <SetupSection />
      <AISection />
      <KnowledgeSection />
      <OpenSourceSection />
      <Footer />
    </div>
  );
}
