'use client';

import { useEffect, useState } from 'react';
import PropertyListitem from "./PropertyListitem";
import { Property } from '../../types';
import { propertyService } from '../../services/propertyService';

interface PropertyListProps {
  selectedCategory?: string;
  location?: string;
}

const PropertyList: React.FC<PropertyListProps> = ({ selectedCategory, location }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // Pass both selectedCategory and location to the service
        const data = await propertyService.getAllProperties(selectedCategory, location);
        setProperties(data);
      } catch (err) {
        setError('Failed to load properties');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [selectedCategory, location]); // Add location as a dependency

  if (loading) {
    return (
      <div className="col-span-full flex justify-center items-center py-8">
        <div className="text-lg">Loading properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full flex justify-center items-center py-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="col-span-full flex justify-center items-center py-8">
        <div className="text-gray-500">No properties found</div>
      </div>
    );
  }

  return (
    <>
      {properties.map((property) => (
        <PropertyListitem key={property.id} property={property} />
      ))}
    </>
  );
};

export default PropertyList;