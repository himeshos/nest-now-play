import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Property, Booking } from '@/types/property';
import { toast } from 'sonner';

interface BookingFormProps {
  property: Property;
}

const BookingForm = ({ property }: BookingFormProps) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * property.price;

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (guests < 1) {
      toast.error('Please select number of guests');
      return;
    }

    if (nights <= 0) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    const booking: Booking = {
      id: Date.now().toString(),
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.image,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      bookedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingBookings = localStorage.getItem('bookings');
    const bookings = existingBookings ? JSON.parse(existingBookings) : [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    toast.success('Booking confirmed!', {
      description: `Your stay at ${property.title} has been booked.`,
    });

    setTimeout(() => {
      navigate('/bookings');
    }, 1500);
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl">${property.price}</span>
          <span className="text-sm font-normal text-muted-foreground">/night</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="check-in">Check-in</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="check-in"
              type="date"
              min={minDate}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="check-out">Check-out</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="check-out"
              type="date"
              min={checkIn || minDate}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="guests"
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="pl-10"
            />
          </div>
        </div>

        {nights > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">${property.price} × {nights} nights</span>
              <span className="font-medium">${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}

        <Button
          onClick={handleBooking}
          className="w-full"
          size="lg"
          disabled={!checkIn || !checkOut || nights <= 0}
        >
          Book Now
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          You won't be charged yet
        </p>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
