import { Button } from "@/components/ui/button";
import { BookOpen, DollarSign, Shield } from "lucide-react";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-light flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Content */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            $10<span className="text-trust-blue">Ebooks</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Access expensive course materials for just <span className="font-semibold text-trust-green">$10</span>. 
            We help students save money while getting the textbooks they need.
          </p>
          <Button onClick={scrollToForm} variant="hero" size="lg" className="text-lg px-8 py-4">
            Get Your Ebooks Now
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-card">
            <Shield className="w-12 h-12 text-trust-blue mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure & Safe</h3>
            <p className="text-muted-foreground text-center">
              All transactions are protected with industry-standard security
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-card">
            <BookOpen className="w-12 h-12 text-trust-green mb-4" />
            <h3 className="text-lg font-semibold mb-2">Verified Ebooks</h3>
            <p className="text-muted-foreground text-center">
              Quality-checked textbooks from trusted sources
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-card">
            <DollarSign className="w-12 h-12 text-trust-blue mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground text-center">
              Get your ebooks within 24 hours of ordering
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;