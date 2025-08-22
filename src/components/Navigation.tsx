import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useResponsive, responsiveNavigation } from "@/lib/responsive";
import { Menu, X, BookOpen, Shield, Phone, Mail } from "lucide-react";

const Navigation = () => {
  const { deviceType, isMobile, isTablet } = useResponsive();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.navigation-menu')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navStyles = responsiveNavigation[deviceType as keyof typeof responsiveNavigation] || responsiveNavigation.desktop;

  const navItems = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'About', action: () => scrollToSection('about') },
    { label: 'Books', action: () => scrollToSection('ebook-showcase') },
    { label: 'Order', action: () => scrollToSection('order-form') },
    { label: 'Testimonials', action: () => scrollToSection('testimonials') },
    { label: 'Contact', action: () => scrollToSection('footer') },
  ];

  const MobileMenu = () => (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-trust-blue" />
              <span className="text-xl font-bold text-foreground">$10 Ebooks</span>
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
              <span>support@10ebooks.com</span>
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
  );

  const DesktopMenu = () => (
    <nav className="hidden lg:flex items-center space-x-8">
      {navItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          className="text-sm font-medium hover:text-trust-blue transition-colors"
          onClick={item.action}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <BookOpen className={`${navStyles.logoSize} text-trust-blue`} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-trust-green rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className={`${navStyles.logoSize} font-black text-foreground leading-none`}>
                $10 Ebooks
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Affordable Academic Resources
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <DesktopMenu />

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => scrollToSection('order-form')}
              className="hidden sm:inline-flex bg-gradient-to-r from-trust-blue to-trust-green hover:from-trust-blue/90 hover:to-trust-green/90 text-white font-semibold"
            >
              Get Started
            </Button>
            
            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-trust-blue to-trust-green transition-all duration-300"
           style={{
             width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
           }}
      />
    </header>
  );
};

export default Navigation;
