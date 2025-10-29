import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchFilters } from '@/types/property';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const handleSearch = () => {
    let minPrice = 0;
    let maxPrice = 10000;

    if (priceRange === '0-500') {
      minPrice = 0;
      maxPrice = 500;
    } else if (priceRange === '500-1000') {
      minPrice = 500;
      maxPrice = 1000;
    } else if (priceRange === '1000+') {
      minPrice = 1000;
      maxPrice = 10000;
    }

    onSearch({
      location,
      type,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="bg-card border rounded-lg p-4 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input
            placeholder="City or address..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Property Type</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="All prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-500">$0 - $500/night</SelectItem>
              <SelectItem value="500-1000">$500 - $1000/night</SelectItem>
              <SelectItem value="1000+">$1000+/night</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button onClick={handleSearch} className="w-full" size="lg">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
