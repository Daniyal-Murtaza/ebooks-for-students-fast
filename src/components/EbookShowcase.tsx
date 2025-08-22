import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EbookShowcase = () => {
  const expensiveBooks = [
    {
      title: "Campbell Biology: Concepts & Connections",
      originalPrice: 380,
      publisher: "Pearson",
      edition: "9th Edition",
      subject: "Biology"
    },
    {
      title: "Organic Chemistry by Clayden",
      originalPrice: 450,
      publisher: "Oxford University Press",
      edition: "2nd Edition", 
      subject: "Chemistry"
    },
    {
      title: "Gray's Anatomy for Students",
      originalPrice: 520,
      publisher: "Elsevier",
      edition: "4th Edition",
      subject: "Medicine"
    },
    {
      title: "Principles of Economics by Mankiw",
      originalPrice: 420,
      publisher: "Cengage Learning",
      edition: "8th Edition",
      subject: "Economics"
    },
    {
      title: "Molecular Biology of the Cell",
      originalPrice: 490,
      publisher: "W. W. Norton & Company",
      edition: "6th Edition",
      subject: "Molecular Biology"
    },
    {
      title: "Engineering Mechanics: Statics & Dynamics",
      originalPrice: 350,
      publisher: "Pearson",
      edition: "14th Edition",
      subject: "Engineering"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expensive Textbooks We've Made <span className="text-trust-green">Affordable</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how we've helped thousands of students access these high-cost academic resources for just $10
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {expensiveBooks.map((book, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full bg-card border border-border shadow-card hover:shadow-soft transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">
                          {book.subject}
                        </Badge>
                        <h3 className="font-semibold text-lg text-card-foreground leading-tight">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {book.publisher} • {book.edition}
                        </p>
                      </div>
                      
                      <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Original Price:</span>
                          <span className="text-lg font-bold text-destructive line-through">
                            ${book.originalPrice}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Our Price:</span>
                          <span className="text-2xl font-bold text-trust-green">
                            $10
                          </span>
                        </div>
                        
                        <div className="bg-trust-green/10 p-3 rounded-lg">
                          <div className="text-center">
                            <span className="text-sm font-semibold text-trust-green">
                              You Save: ${book.originalPrice - 10}
                            </span>
                            <div className="text-xs text-muted-foreground mt-1">
                              ({Math.round(((book.originalPrice - 10) / book.originalPrice) * 100)}% savings)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            And hundreds more titles available upon request
          </p>
        </div>
      </div>
    </section>
  );
};

export default EbookShowcase;