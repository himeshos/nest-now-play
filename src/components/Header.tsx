import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Estate Haven
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            variant={isActive('/') ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Browse</span>
            </Link>
          </Button>
          <Button
            variant={isActive('/bookings') ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">My Bookings</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
