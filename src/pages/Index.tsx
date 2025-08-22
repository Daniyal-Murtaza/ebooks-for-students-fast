import HeroSection from "@/components/HeroSection";
import OrderForm from "@/components/OrderForm";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DonateSection from "@/components/DonateSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <OrderForm />
      <TestimonialsSection />
      <DonateSection />
      <Footer />
    </div>
  );
};

export default Index;
