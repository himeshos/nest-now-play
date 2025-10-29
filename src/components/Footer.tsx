import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Estate Haven</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in finding the perfect property for your next stay.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Browse Properties</a></li>
              <li><a href="/bookings" className="hover:text-primary transition-colors">My Bookings</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Popular Cities</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/?city=Malibu" className="hover:text-primary transition-colors">Malibu</a></li>
              <li><a href="/?city=New York" className="hover:text-primary transition-colors">New York</a></li>
              <li><a href="/?city=Miami" className="hover:text-primary transition-colors">Miami</a></li>
              <li><a href="/?city=Aspen" className="hover:text-primary transition-colors">Aspen</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@estatehaven.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Estate Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
