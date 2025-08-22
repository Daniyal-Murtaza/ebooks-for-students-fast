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
    university: '',
    courseName: '',
    ebookTitles: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Order Submitted!",
      description: "We'll contact you within 24 hours with your ebooks.",
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      university: '',
      courseName: '',
      ebookTitles: '',
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="university">University/College Name *</Label>
                  <Input
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    required
                    placeholder="Your university name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name / Subject *</Label>
                <Input
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Introduction to Psychology, Biology 101"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ebookTitles">Ebook Title(s) Requested *</Label>
                <Textarea
                  id="ebookTitles"
                  name="ebookTitles"
                  value={formData.ebookTitles}
                  onChange={handleChange}
                  required
                  placeholder="List the ebook titles, authors, and editions you need"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message / Special Instructions (Optional)</Label>
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