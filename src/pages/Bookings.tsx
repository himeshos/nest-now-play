import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Trash2 } from 'lucide-react';
import { Booking } from '@/types/property';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const stored = localStorage.getItem('bookings');
    if (stored) {
      const parsedBookings = JSON.parse(stored);
      // Sort by booking date, newest first
      parsedBookings.sort(
        (a: Booking, b: Booking) =>
          new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime()
      );
      setBookings(parsedBookings);
    }
  };

  const handleDelete = (bookingId: string) => {
    const updated = bookings.filter((b) => b.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(updated));
    setBookings(updated);
    toast.success('Booking cancelled successfully');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">No bookings yet</h2>
          <p className="text-muted-foreground max-w-md">
            Start exploring our amazing properties and book your perfect stay!
          </p>
          <Button onClick={() => navigate('/')} size="lg">
            Browse Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">
              Manage your property reservations
            </p>
          </div>

          <div className="space-y-6">
            {bookings.map((booking) => {
              const nights = calculateNights(booking.checkIn, booking.checkOut);

              return (
                <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-[200px_1fr] gap-0">
                    <div className="aspect-square md:aspect-auto relative">
                      <img
                        src={booking.propertyImage}
                        alt={booking.propertyTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="text-xl font-semibold line-clamp-1">
                              {booking.propertyTitle}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Booked on {formatDate(booking.bookedAt)}
                            </p>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel booking?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently cancel your booking. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Keep booking</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(booking.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Cancel booking
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>Check-in</span>
                            </div>
                            <p className="font-medium">{formatDate(booking.checkIn)}</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>Check-out</span>
                            </div>
                            <p className="font-medium">{formatDate(booking.checkOut)}</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Users className="h-4 w-4" />
                              <span>Guests</span>
                            </div>
                            <p className="font-medium">{booking.guests}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-muted-foreground">
                            {nights} {nights === 1 ? 'night' : 'nights'}
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Total</div>
                            <div className="text-2xl font-bold text-primary">
                              ${booking.totalPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
