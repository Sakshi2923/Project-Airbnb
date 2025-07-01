'use client';
import Link from 'next/link';
import Image from "next/image";
import { Property } from '../../types';

interface PropertyListItemProps {
  property: Property;
}

const PropertyListItem = ({ property }: PropertyListItemProps) => {
  return (
    <Link href={`/properties/${property.id}`}>
      <div className="cursor-pointer">
        <div className="relative overflow-hidden aspect-square rounded-xl">
          <Image
            fill 
            src={property.image_url || '/beach_1.jpg'} // Fallback to default image
            sizes="(max-width:768px) 768px, (max-width:1200px):768px,768px"
            className="hover:scale-110 object-cover transition h-full w-full"
            alt={property.title}
          />
        </div>
        <div className="mt-2">
          <p className="text-lg font-bold">{property.title}</p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            <strong>${property.price_per_night}</strong> per night
          </p>
        </div>
        <div className="mt-1">
          <p className="text-sm text-gray-400">{property.location}</p>
        </div>
        <div className="mt-1 flex gap-2 text-sm text-gray-400">
          <span>{property.bedrooms} bedrooms</span>
          <span>•</span>
          <span>{property.bathrooms} bathrooms</span>
          <span>•</span>
          <span>Up to {property.max_guests} guests</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyListItem;