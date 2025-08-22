import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useResponsive, responsiveCarousel, useInViewport } from "@/lib/responsive";
import { sanitizeInput } from "@/lib/security";
import { 
  BookOpen, 
  DollarSign, 
  TrendingDown, 
  Shield, 
  Star,
  Eye,
  ShoppingCart,
  ArrowRight
} from "lucide-react";

// Import book cover images
import campbellBiology from "@/assets/book-campbell-biology.jpg";
import organicChemistry from "@/assets/book-organic-chemistry.jpg";
import graysAnatomy from "@/assets/book-grays-anatomy.jpg";
import economics from "@/assets/book-economics.jpg";
import molecularBiology from "@/assets/book-molecular-biology.jpg";
import engineering from "@/assets/book-engineering.jpg";

interface Book {
  id: string;
  title: string;
  originalPrice: number;
  publisher: string;
  edition: string;
  subject: string;
  image: string;
  rating: number;
  reviews: number;
  isbn: string;
  description: string;
}

const EbookShowcase = () => {
  const { deviceType, isMobile, isTablet } = useResponsive();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const expensiveBooks: Book[] = [
    {
      id: "campbell-biology",
      title: "Campbell Biology: Concepts & Connections",
      originalPrice: 380,
      publisher: "Pearson",
      edition: "9th Edition",
      subject: "Biology",
      image: campbellBiology,
      rating: 4.8,
      reviews: 1247,
      isbn: "9780134296012",
      description: "Comprehensive biology textbook covering core concepts and connections in modern biology."
    },
    {
      id: "organic-chemistry",
      title: "Organic Chemistry by Clayden",
      originalPrice: 450,
      publisher: "Oxford University Press",
      edition: "2nd Edition", 
      subject: "Chemistry",
      image: organicChemistry,
      rating: 4.9,
      reviews: 892,
      isbn: "9780199270293",
      description: "Modern approach to organic chemistry with emphasis on mechanism and synthesis."
    },
    {
      id: "grays-anatomy",
      title: "Gray's Anatomy for Students",
      originalPrice: 520,
      publisher: "Elsevier",
      edition: "4th Edition",
      subject: "Medicine",
      image: graysAnatomy,
      rating: 4.7,
      reviews: 2156,
      isbn: "9780323393041",
      description: "Student-friendly anatomy textbook with clinical correlations and imaging."
    },
    {
      id: "economics-mankiw",
      title: "Principles of Economics by Mankiw",
      originalPrice: 420,
      publisher: "Cengage Learning",
      edition: "8th Edition",
      subject: "Economics",
      image: economics,
      rating: 4.6,
      reviews: 1678,
      isbn: "9781305585126",
      description: "Comprehensive introduction to economics principles and applications."
    },
    {
      id: "molecular-biology",
      title: "Molecular Biology of the Cell",
      originalPrice: 490,
      publisher: "W. W. Norton & Company",
      edition: "6th Edition",
      subject: "Molecular Biology",
      image: molecularBiology,
      rating: 4.8,
      reviews: 943,
      isbn: "9780815344322",
      description: "Definitive text on molecular biology with detailed illustrations and explanations."
    },
    {
      id: "engineering-mechanics",
      title: "Engineering Mechanics: Statics & Dynamics",
      originalPrice: 350,
      publisher: "Pearson",
      edition: "14th Edition",
      subject: "Engineering",
      image: engineering,
      rating: 4.5,
      reviews: 1123,
      isbn: "9780133915426",
      description: "Comprehensive coverage of statics and dynamics for engineering students."
    }
  ];

  const carouselConfig = responsiveCarousel[deviceType as keyof typeof responsiveCarousel] || responsiveCarousel.desktop;

  // Animation on scroll
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToOrderForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    // Auto-fill the order form with book details
    const isbnInput = document.getElementById('ebookISBN') as HTMLInputElement;
    const nameInput = document.getElementById('ebookName') as HTMLInputElement;
    
    if (isbnInput && nameInput) {
      isbnInput.value = book.isbn;
      nameInput.value = sanitizeInput(book.title);
      
      // Trigger change events
      isbnInput.dispatchEvent(new Event('input', { bubbles: true }));
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    scrollToOrderForm();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateSavings = (originalPrice: number) => {
    const savings = originalPrice - 10;
    const percentage = Math.round((savings / originalPrice) * 100);
    return { savings, percentage };
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-trust-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-trust-green/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-trust-blue/3 to-trust-green/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-trust-green/10 text-trust-green px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingDown className="w-4 h-4" />
            <span>Save up to 97% on textbooks</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Expensive ebooks We've Made{' '}
            <span className="bg-gradient-to-r from-trust-green to-trust-blue bg-clip-text text-transparent">
              Affordable
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            See how we've helped thousands of students access these high-cost academic resources for just{' '}
            <span className="font-bold text-trust-green">$10</span>
          </p>
        </div>

        {/* Carousel */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: carouselConfig.slidesToShow,
            }}
            className="w-full max-w-6xl mx-auto"
            onSelect={(api) => setCurrentSlide(api?.selectedScrollSnap() || 0)}
          >
            <CarouselContent className={`-ml-2 md:-ml-4 ${carouselConfig.spacing}`}>
              {expensiveBooks.map((book, index) => (
                <CarouselItem 
                  key={book.id} 
                  className={`pl-2 md:pl-4 ${
                    isMobile ? 'basis-full' : 
                    isTablet ? 'md:basis-1/2' : 
                    'lg:basis-1/3 xl:basis-1/4'
                  }`}
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={book.image} 
                          alt={`${sanitizeInput(book.title)} ebook cover`}
                          className="w-full h-48 md:h-56 object-cover rounded-t-lg group-hover:brightness-110 transition-all duration-300"
                          loading="lazy"
                        />
                        <Badge variant="secondary" className="absolute top-3 left-3 text-xs font-medium bg-white/90 backdrop-blur-sm">
                          {book.subject}
                        </Badge>
                        
                        {/* Rating */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{book.rating}</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h3 className="font-bold text-lg text-foreground leading-tight line-clamp-2">
                              {sanitizeInput(book.title)}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {sanitizeInput(book.publisher)} • {book.edition}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ISBN: {book.isbn}
                            </p>
                          </div>
                          
                          <div className="space-y-3 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-muted-foreground">Original:</span>
                              <span className="text-lg font-bold text-destructive line-through">
                                {formatPrice(book.originalPrice)}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-muted-foreground">Our Price:</span>
                              <span className="text-2xl font-bold text-trust-green">
                                $10
                              </span>
                            </div>
                            
                            {(() => {
                              const { savings, percentage } = calculateSavings(book.originalPrice);
                              return (
                                <div className="bg-gradient-to-r from-trust-green/10 to-trust-blue/10 p-3 rounded-lg border border-trust-green/20">
                                  <div className="text-center">
                                    <span className="text-sm font-bold text-trust-green">
                                      You Save: {formatPrice(savings)}
                                    </span>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      ({percentage}% savings)
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                            
                            <Button 
                              onClick={() => handleBookSelect(book)}
                              className="w-full bg-gradient-to-r from-trust-blue to-trust-green hover:from-trust-blue/90 hover:to-trust-green/90 text-white font-semibold group"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                              Order This Book
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white transition-all duration-300" />
            <CarouselNext className="hidden md:flex bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white transition-all duration-300" />
          </Carousel>
        </div>

        {/* Footer */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-trust-blue" />
              <span className="text-sm font-medium">Verified & Secure</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-5 h-5 text-trust-green" />
              <span className="text-sm font-medium">Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-5 h-5 text-trust-blue" />
              <span className="text-sm font-medium">24hr Delivery</span>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground mb-6">
            And hundreds more titles available upon request
          </p>
          
          <Button 
            onClick={scrollToOrderForm}
            size="lg"
            className="bg-gradient-to-r from-trust-blue to-trust-green hover:from-trust-blue/90 hover:to-trust-green/90 text-white font-semibold px-8 py-4 text-lg"
          >
            <Eye className="w-5 h-5 mr-2" />
            Browse All Books
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EbookShowcase;