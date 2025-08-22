import { Button } from "@/components/ui/button";
import { BookOpen, DollarSign, Shield, Star, ArrowRight, Sparkles } from "lucide-react";
import heroBackground from "@/assets/hero-books-background.jpg";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Hero Background with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-green-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-400/20 rounded-full blur-xl animate-pulse delay-3000" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Hero Content with Animations */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">Trusted by 10,000+ Students</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-tight">
            <span className="block">$10</span>
            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Ebooks
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Access expensive course materials for just{' '}
            <span className="font-bold text-yellow-300 bg-white/10 px-3 py-1 rounded-lg">
              $10 per Ebook
            </span>
            . We help students save money while getting the ebooks they need.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={scrollToForm} 
              size="lg" 
              className="text-lg px-10 py-6 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 group"
            >
              Get Your Ebooks Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-300"
            >
              View Available Books
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">$2M+</div>
              <div className="text-white/80 text-sm">Saved by Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">50K+</div>
              <div className="text-white/80 text-sm">Ebooks Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">24hr</div>
              <div className="text-white/80 text-sm">Average Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">4.9★</div>
              <div className="text-white/80 text-sm">Student Rating</div>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-soft border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <Shield className="relative w-16 h-16 text-blue-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Secure & Safe</h3>
            <p className="text-white/80 text-center leading-relaxed">
              All transactions are protected with industry-standard security and encryption
            </p>
          </div>
          
          <div className="group flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-soft border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <BookOpen className="relative w-16 h-16 text-green-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Verified Ebooks</h3>
            <p className="text-white/80 text-center leading-relaxed">
              Quality-checked ebooks from trusted publishers and verified sources
            </p>
          </div>
          
          <div className="group flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-soft border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <DollarSign className="relative w-16 h-16 text-purple-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Fast Delivery</h3>
            <p className="text-white/80 text-center leading-relaxed">
              Get your ebooks within 24 hours of ordering, guaranteed
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;