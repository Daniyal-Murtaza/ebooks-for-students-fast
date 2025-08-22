import { Button } from "@/components/ui/button";
import { BookOpen, DollarSign, Shield } from "lucide-react";
import heroBackground from "@/assets/hero-books-background.jpg";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Hero Content */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            $10<span className="text-yellow-300">Ebooks</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            Access expensive course materials for just <span className="font-semibold text-yellow-300">$10</span>. 
            We help students save money while getting the ebooks they need.
          </p>
          <Button onClick={scrollToForm} variant="secondary" size="lg" className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90">
            Get Your Ebooks Now
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-soft border border-white/20">
            <Shield className="w-12 h-12 text-trust-blue mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Secure & Safe</h3>
            <p className="text-muted-foreground text-center">
              All transactions are protected with industry-standard security
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-soft border border-white/20">
            <BookOpen className="w-12 h-12 text-trust-green mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Verified Ebooks</h3>
            <p className="text-muted-foreground text-center">
              Quality-checked ebooks from trusted sources
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-soft border border-white/20">
            <DollarSign className="w-12 h-12 text-trust-blue mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Fast Delivery</h3>
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