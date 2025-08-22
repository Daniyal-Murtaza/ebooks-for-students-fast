import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import OrderForm from "@/components/OrderForm";
import AboutSection from "@/components/AboutSection";
import EbookShowcase from "@/components/EbookShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import DonateSection from "@/components/DonateSection";
import Footer from "@/components/Footer";
import { useResponsive } from "@/lib/responsive";

const Index = () => {
  const { deviceType } = useResponsive();

  // Add security headers and meta tags
  useEffect(() => {
    // Set security headers
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";
    document.head.appendChild(meta);

    const xFrameOptions = document.createElement('meta');
    xFrameOptions.httpEquiv = 'X-Frame-Options';
    xFrameOptions.content = 'DENY';
    document.head.appendChild(xFrameOptions);

    const xContentType = document.createElement('meta');
    xContentType.httpEquiv = 'X-Content-Type-Options';
    xContentType.content = 'nosniff';
    document.head.appendChild(xContentType);

    const xssProtection = document.createElement('meta');
    xssProtection.httpEquiv = 'X-XSS-Protection';
    xssProtection.content = '1; mode=block';
    document.head.appendChild(xssProtection);

    // Cleanup function
    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(xFrameOptions);
      document.head.removeChild(xContentType);
      document.head.removeChild(xssProtection);
    };
  }, []);

  // Add smooth scrolling behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Add viewport meta tag for better mobile experience
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>
        
        {/* Ebook Showcase */}
        <section id="ebook-showcase">
          <EbookShowcase />
        </section>
        
        {/* Order Form */}
        <section id="order-form">
          <OrderForm />
        </section>
        
        {/* Testimonials */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        
        {/* Donate Section */}
        <section id="donate">
          <DonateSection />
        </section>
      </main>
      
      {/* Footer */}
      <footer id="footer">
        <Footer />
      </footer>

      {/* Security Notice */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
            <span>Secure Connection</span>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-trust-blue to-trust-green transition-all duration-300"
          style={{
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        />
      </div>
    </div>
  );
};

export default Index;
