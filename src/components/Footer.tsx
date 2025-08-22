import { Button } from "@/components/ui/button";
import { Heart, Mail, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Mission */}
          <div>
            <span className="text-xl font-black text-foreground leading-none">
              EbookBro.com
            </span>
            <p className="text-muted-foreground mb-4">
              Making education affordable, one ebook at a time.
              Helping students save money on expensive course materials.
            </p>
            <Button variant="accent" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Support Us
            </Button>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact Us</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@10ebooks.com</span>
              </div>
              <p>Response time: Within 24 hours</p>
              <p>Available: Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex space-x-3 mb-4">
              <Button variant="ghost" size="sm">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">
              Stay updated with our latest offerings and student success stories.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} 10$Ebooks. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-trust-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-trust-blue transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-trust-blue transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;