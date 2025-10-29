import { useState, useEffect } from 'react';
import { SearchFilters, Property } from '@/types/property';
import { getStoredProperties, initializeProperties } from '@/data/properties';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { Sparkles } from 'lucide-react';

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    initializeProperties();
    const storedProperties = getStoredProperties();
    setProperties(storedProperties);
    setFilteredProperties(storedProperties);
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    let filtered = [...properties];

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(
        (p) =>
          p.location.toLowerCase().includes(filters.location.toLowerCase()) ||
          p.city.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by type
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter((p) => p.type === filters.type);
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    setFilteredProperties(filtered);
  };

  const featuredProperties = filteredProperties.filter((p) => p.featured);
  const regularProperties = filteredProperties.filter((p) => !p.featured);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8" />
              <h1 className="text-5xl font-bold">Find Your Perfect Stay</h1>
            </div>
            <p className="text-xl text-primary-foreground/90">
              Discover exceptional properties for unforgettable experiences
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="container py-12 flex-1">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-4">No properties found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Properties */}
            {featuredProperties.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h2 className="text-3xl font-bold">Featured Properties</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Properties */}
            {regularProperties.length > 0 && (
              <div>
                {featuredProperties.length > 0 && (
                  <h2 className="text-3xl font-bold mb-6">More Properties</h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
