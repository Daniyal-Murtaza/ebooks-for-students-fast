import { Button } from "@/components/ui/button";
import { BookOpen, DollarSign, Shield, Star, ArrowRight, Sparkles, Menu, X, Phone, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useResponsive } from "@/lib/responsive";
import heroBackground from "@/assets/hero-books-background.jpg";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const { deviceType, isMobile, isTablet } = useResponsive();
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'About', action: () => scrollToSection('about') },
    { label: 'Books', action: () => scrollToSection('ebook-showcase') },
    { label: 'Order', action: () => scrollToSection('order-form') },
    { label: 'Testimonials', action: () => scrollToSection('testimonials') },
    { label: 'Contact', action: () => scrollToSection('footer') },
  ];

  // MrBeast-style slider content
  const sliderContent = [
    "⚡ Ultra Fast 24hr Delivery",
    "🔒 100% Secure & Encrypted",
    "📚 50,000+ Ebooks Delivered",
    "💰 Save up to 97% on Textbooks",
    "⭐ 4.9★ Student Rating",
    "🎓 Trusted by 10,000+ Students",
    "📖 Quality Verified Ebooks",
    "💳 Multiple Payment Options"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-light">
      {/* MrBeast-style Top Slider */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-r from-trust-blue via-trust-green to-purple-500 overflow-hidden">
        <div className="flex animate-scroll-left whitespace-nowrap">
          {[...sliderContent, ...sliderContent].map((content, index) => (
            <div key={index} className="flex items-center px-8 py-2 text-white text-sm font-medium">
              <span>{content}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Navbar */}
      <header
        className={`absolute top-8 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border border-white/20 rounded-2xl mx-4'
            : 'bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl mx-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {/* <div className="relative">
                <BookOpen className="w-8 h-8 text-trust-blue" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-trust-green rounded-full animate-pulse" />
              </div> */}
              <div className="flex flex-col">
                <span className="text-xl font-black text-foreground leading-none">
                  EbookBro.com
                </span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Affordable Academic Resources
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="text-sm font-medium text-foreground hover:text-trust-blue transition-colors"
                  onClick={item.action}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => scrollToSection('order-form')}
                className="hidden sm:inline-flex bg-gradient-to-r from-trust-blue to-trust-green hover:from-trust-blue/90 hover:to-trust-green/90 text-white font-semibold"
              >
                Get Started
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-8 h-8 text-trust-blue" />
                        <span className="text-xl font-bold text-foreground">EbookBro.com</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1">
                      <ul className="space-y-4">
                        {navItems.map((item, index) => (
                          <li key={index}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-lg font-medium hover:bg-trust-blue/10 hover:text-trust-blue"
                              onClick={item.action}
                            >
                              {item.label}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    {/* Contact Info */}
                    <div className="border-t pt-6 space-y-4">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>support@ebookbro.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Shield className="w-4 h-4" />
                        <span>Secure & Trusted</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Background with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-trust-blue/10 via-trust-green/5 to-yellow-400/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-trust-blue/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-trust-green/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-3000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center pt-24">
        {/* Hero Content with Animations */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-trust-green/10 backdrop-blur-sm border border-trust-green/20 rounded-full px-6 py-3 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-trust-green" />
            <span className="text-foreground text-sm font-medium">Trusted by 10,000+ Students</span>
          </div>

          {/* Main Heading */}
          {/* <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground mb-8 leading-tight"> */}
          {/* <span className="block">$10</span> */}
          {/* <span className="block bg-gradient-to-r from-trust-green to-trust-blue bg-clip-text text-transparent">
              Ebooks
            </span> */}
          {/* </h1> */}

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Access expensive course materials for just{' '}
            <span className="font-bold text-trust-green bg-trust-green/10 px-3 py-1 rounded-lg">
              $10 per Ebook
            </span>
            . We help students save money while getting the ebooks they need.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="text-lg px-10 py-6 bg-gradient-to-r from-trust-blue to-trust-green hover:from-trust-blue/90 hover:to-trust-green/90 text-white font-bold rounded-xl shadow-2xl hover:shadow-trust-green/25 transition-all duration-300 transform hover:scale-105 group"
            >
              Get Your Ebooks Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-2 border-trust-blue/30 text-foreground hover:bg-trust-blue/10 backdrop-blur-sm rounded-xl transition-all duration-300"
            >
              View Available Books
            </Button> */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-trust-green mb-2">$2M+</div>
              <div className="text-muted-foreground text-sm">Saved by Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-trust-green mb-2">50K+</div>
              <div className="text-muted-foreground text-sm">Ebooks Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-trust-green mb-2">24hr</div>
              <div className="text-muted-foreground text-sm">Average Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-trust-green mb-2">4.9★</div>
              <div className="text-muted-foreground text-sm">Student Rating</div>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-soft border border-trust-blue/20 hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-trust-blue to-trust-blue rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <Shield className="relative w-16 h-16 text-trust-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Secure & Safe</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              All transactions are protected with industry-standard security and encryption
            </p>
          </div>

          <div className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-soft border border-trust-green/20 hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-trust-green to-trust-green rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <BookOpen className="relative w-16 h-16 text-trust-green" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Verified Ebooks</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Quality-checked ebooks from trusted publishers and verified sources
            </p>
          </div>

          <div className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-soft border border-purple-400/20 hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <DollarSign className="relative w-16 h-16 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Fast Delivery</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Get your ebooks within 24 hours of ordering, guaranteed
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-trust-blue/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-trust-blue/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;