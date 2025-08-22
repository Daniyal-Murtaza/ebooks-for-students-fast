import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const OrderForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ebookISBN: '',
    ebookName: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    toast({
      title: "Order Submitted!",
      description: "We'll contact you within 24 hours with your ebooks.",
    });

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      ebookISBN: '',
      ebookName: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="order-form" className="py-20 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-soft">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground">
              Order Your Ebooks
            </CardTitle>
            <CardDescription className="text-lg">
              Fill out the form below and we'll get you the ebooks you need for just $10
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ebookISBN">Ebook ISBN *</Label>
                <Input
                  id="ebookISBN"
                  name="ebookISBN"
                  value={formData.ebookISBN}
                  onChange={handleChange}
                  required
                  placeholder="Enter the ebook ISBN"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ebookName">Ebook Name *</Label>
                <Input
                  id="ebookName"
                  name="ebookName"
                  value={formData.ebookName}
                  onChange={handleChange}
                  required
                  placeholder="Enter the ebook name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional information or special requests"
                  rows={3}
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Submit Order Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OrderForm;
