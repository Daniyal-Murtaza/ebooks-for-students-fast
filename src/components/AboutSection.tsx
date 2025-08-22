import { Card, CardContent } from "@/components/ui/card";
import { Check, Heart, Shield, Zap } from "lucide-react";

const AboutSection = () => {
  const trustIndicators = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "SSL encrypted transactions"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Ebooks delivered within 24 hours"
    },
    {
      icon: Check,
      title: "Verified Ebooks",
      description: "Quality-checked textbooks"
    },
    {
      icon: Heart,
      title: "Student-Focused",
      description: "Made by students, for students"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Making Education Affordable
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We help students access expensive course materials for just <span className="font-semibold text-trust-green">$10</span>. 
              Our goal is to make education affordable and accessible to everyone. We understand the financial burden 
              that textbooks place on students, and we're here to help.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In the future, if you like our service and it has helped you save money on your education, 
              you can support us by donating. Every contribution helps us continue serving students worldwide.
            </p>
          </div>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustIndicators.map((indicator, index) => {
            const IconComponent = indicator.icon;
            return (
              <Card key={index} className="text-center p-6 shadow-card hover:shadow-soft transition-shadow duration-200">
                <CardContent className="pt-6">
                  <IconComponent className="w-12 h-12 text-trust-blue mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {indicator.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {indicator.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;