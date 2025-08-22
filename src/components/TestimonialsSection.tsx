import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      university: "University of Texas",
      text: "This service helped me get all my textbooks for just $10! Saved me so much money. I was spending hundreds each semester before finding this.",
      rating: 5
    },
    {
      name: "James R.",
      university: "Houston College",
      text: "Quick delivery and reliable ebooks. Highly recommend! Got my chemistry textbook the same day I ordered it.",
      rating: 5
    },
    {
      name: "Emily K.",
      university: "NYU",
      text: "Affordable and trustworthy. Made my semester stress-free. No more worrying about expensive textbook costs!",
      rating: 5
    },
    {
      name: "Michael T.",
      university: "UCLA",
      text: "Amazing service! Got 3 textbooks for $30 instead of $600. The quality is perfect and delivery was super fast.",
      rating: 5
    },
    {
      name: "Jessica L.",
      university: "Stanford University",
      text: "As a graduate student, this service has been a lifesaver. Professional service and exactly what I needed for my research.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            What Students Say About Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who have saved money on their textbooks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-card hover:shadow-soft transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.university}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;