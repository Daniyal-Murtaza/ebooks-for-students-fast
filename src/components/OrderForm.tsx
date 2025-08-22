import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  validateFormData, 
  sanitizeFormData, 
  RateLimiter, 
  generateCSRFToken,
  validateCSRFToken 
} from "@/lib/security";
import { useResponsive, responsiveForm } from "@/lib/responsive";
import { 
  BookOpen, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";

// Initialize rate limiter
const rateLimiter = new RateLimiter(3, 15 * 60 * 1000); // 3 attempts per 15 minutes

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  ebookISBN: string;
  ebookName: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const OrderForm = () => {
  const { toast } = useToast();
  const { deviceType, isMobile } = useResponsive();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    ebookISBN: '',
    ebookName: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Generate CSRF token on component mount
  useEffect(() => {
    const token = generateCSRFToken();
    setCsrfToken(token);
    sessionStorage.setItem('csrfToken', token);
  }, []);

  // Real-time validation
  const validateField = (name: string, value: string) => {
    const validation = validateFormData({ [name]: value });
    return validation.errors[name] || '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Sanitize input
    const sanitizedValue = value.replace(/[<>]/g, '');
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting
    const userIdentifier = formData.email || 'anonymous';
    if (!rateLimiter.isAllowed(userIdentifier)) {
      setIsRateLimited(true);
      toast({
        title: "Too Many Attempts",
        description: "Please wait 15 minutes before trying again.",
        variant: "destructive",
      });
      return;
    }

    // Validate form
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    // Validate CSRF token
    const storedToken = sessionStorage.getItem('csrfToken');
    if (!validateCSRFToken(csrfToken, storedToken || '')) {
      toast({
        title: "Security Error",
        description: "Invalid request. Please refresh the page and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize form data
      const sanitizedData = sanitizeFormData(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', sanitizedData);

      toast({
        title: "Order Submitted Successfully!",
        description: "We'll contact you within 24 hours with your ebooks.",
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        ebookISBN: '',
        ebookName: '',
        message: ''
      });
      
      setErrors({});
      setAttempts(0);
      setIsRateLimited(false);
      
      // Generate new CSRF token
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
      sessionStorage.setItem('csrfToken', newToken);

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormStyles = () => {
    const styles = responsiveForm[deviceType as keyof typeof responsiveForm];
    return styles || responsiveForm.desktop;
  };

  const formStyles = getFormStyles();

  return (
    <section id="order-form" className="py-12 md:py-20 px-4 bg-gradient-light">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Order Your Ebooks
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below and we'll get you the ebooks you need for just $10 per Ebook.
          </p>
        </div>

        {/* Security Notice */}
        <div className="mb-8">
          <Alert className="border-green-200 bg-green-50">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your information is protected with industry-standard security measures. 
              We never share your personal data with third parties.
            </AlertDescription>
          </Alert>
        </div>

        {/* Form */}
        <Card className="shadow-soft border-0">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-trust-blue" />
              <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                Secure Order Form
              </CardTitle>
            </div>
            <CardDescription className="text-base md:text-lg">
              All fields marked with * are required
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className={`space-y-6 ${formStyles.spacing}`}>
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${formStyles.inputSize} ${errors.fullName ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${formStyles.inputSize} ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <Badge variant="secondary" className="ml-2">Optional</Badge>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${formStyles.inputSize} ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="(555) 123-4567"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* ISBN and Ebook Name in Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ISBN */}
                <div className="space-y-2">
                  <Label htmlFor="ebookISBN" className="text-sm font-medium">
                    Ebook ISBN <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ebookISBN"
                    name="ebookISBN"
                    value={formData.ebookISBN}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${formStyles.inputSize} ${errors.ebookISBN ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="Enter the ebook ISBN"
                    disabled={isSubmitting}
                  />
                  {errors.ebookISBN && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.ebookISBN}
                    </p>
                  )}
                </div>

                {/* Ebook Name */}
                <div className="space-y-2">
                  <Label htmlFor="ebookName" className="text-sm font-medium">
                    Ebook Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ebookName"
                    name="ebookName"
                    value={formData.ebookName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${formStyles.inputSize} ${errors.ebookName ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="Enter the ebook name"
                    disabled={isSubmitting}
                  />
                  {errors.ebookName && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.ebookName}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Additional Message <Badge variant="secondary" className="ml-2">Optional</Badge>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`min-h-[100px] ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Any additional information or special requests"
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Hidden CSRF Token */}
              <input type="hidden" name="csrfToken" value={csrfToken} />

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className={`w-full ${formStyles.buttonSize} bg-gradient-to-r from-trust-blue to-trust-green hover:from-trust-blue/90 hover:to-trust-green/90 text-white font-semibold`}
                disabled={isSubmitting || isRateLimited}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submit Order Request
                  </>
                )}
              </Button>

              {/* Rate Limiting Notice */}
              {isRateLimited && (
                <Alert className="border-red-200 bg-red-50">
                  <Clock className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Too many submission attempts. Please wait 15 minutes before trying again.
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
            <Shield className="w-12 h-12 text-trust-blue mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure & Encrypted</h3>
            <p className="text-sm text-muted-foreground">
              All data is encrypted and protected with industry-standard security
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
            <Clock className="w-12 h-12 text-trust-green mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">24-Hour Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Get your ebooks within 24 hours of order confirmation
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20">
            <CheckCircle className="w-12 h-12 text-trust-blue mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
            <p className="text-sm text-muted-foreground">
              All ebooks are verified and quality-checked before delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
