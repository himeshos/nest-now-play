import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Star } from 'lucide-react';
import { Property } from '@/types/property';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/properties/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={property.image}
            alt={property.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
          {property.featured && (
            <Badge className="absolute top-3 right-3 bg-accent hover:bg-accent-hover">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Featured
            </Badge>
          )}
          <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary capitalize">
            {property.type}
          </Badge>
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{property.area} sq ft</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="text-2xl font-bold text-primary">${property.price}</span>
              <span className="text-muted-foreground text-sm ml-1">/night</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
