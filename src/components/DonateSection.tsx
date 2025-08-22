import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Coffee, Users } from "lucide-react";

const DonateSection = () => {
  const handleDonateClick = () => {
    // For now, we'll show an alert. Later this can be integrated with Stripe/PayPal
    alert("Thank you for your interest in supporting us! Payment integration coming soon.");
  };

  return (
    <section className="py-20 px-4 bg-gradient-light">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Support Our Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us keep education affordable for students worldwide. Your support enables us to 
            continue providing ebooks at just $10 and reach more students in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-card">
            <CardContent className="pt-6 text-center">
              <Coffee className="w-10 h-10 text-trust-blue mx-auto mb-4" />
              <CardTitle className="text-lg mb-2">Buy us a coffee</CardTitle>
              <CardDescription>Small donations help cover our server costs</CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6 text-center">
              <Heart className="w-10 h-10 text-trust-green mx-auto mb-4" />
              <CardTitle className="text-lg mb-2">Support students</CardTitle>
              <CardDescription>Help us provide free ebooks to students in need</CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6 text-center">
              <Users className="w-10 h-10 text-trust-blue mx-auto mb-4" />
              <CardTitle className="text-lg mb-2">Grow our impact</CardTitle>
              <CardDescription>Help us reach more universities and students</CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-md mx-auto shadow-soft">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Donate Now</CardTitle>
            <CardDescription>
              Every contribution makes a difference in a student's education
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" onClick={handleDonateClick}>
                $5
              </Button>
              <Button variant="outline" onClick={handleDonateClick}>
                $10
              </Button>
              <Button variant="outline" onClick={handleDonateClick}>
                $25
              </Button>
            </div>
            <Button variant="hero" size="lg" className="w-full" onClick={handleDonateClick}>
              Donate Custom Amount
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Secure payment processing • Tax-deductible donations
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DonateSection;