'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import BookingForm from "@/app/components/properties/BookingForm";
import { Property } from "@/app/types";
import api from "@/app/lib/api";

const PropertyDetailPage = () => {
  const params = useParams();
  const propertyId = params?.id ? Number(params.id) : undefined;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/api/properties/${propertyId}/`);
        setProperty(response.data.data);
      } catch (error) {
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    if (propertyId) fetchProperty();
  }, [propertyId]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!property) {
    return <div className="p-8 text-center text-red-500">Property not found.</div>;
  }

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 pt-12">
      <div className="w-full mb-4 h-[64vh] overflow-hidden rounded-xl relative ">
        <Image
          fill
          src={property.image_url || '/beach_1.jpg'}
          className="object-cover w-full h-full"
          alt={property.title}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">{property.title}</h1>
          <span className="mb-6 block text-lg text-gray-600">
            {property.max_guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathroom
          </span>
          <span className="mb-2 block text-md text-gray-500">
            <strong>Category:</strong> {property.category}
          </span>
          <hr />
          <div className="py-6 flex items-center space-x-4">
            <Image
              src="/profile_pic_1.jpg"
              width={50}
              height={50}
              className="rounded-full"
              alt={property.owner?.username || "Host"}
            />
            <p>
              <strong>
                {property.owner?.username || "Your host"} is your host
              </strong>
            </p>
          </div>
          <hr />
          <p className="mt-6 text-lg">{property.description}</p>
          {property.amenities && property.amenities.length > 0 && (
            <>
              <hr />
              <div className="mt-4">
                <strong>Amenities:</strong>
                <ul className="list-disc ml-6">
                  {property.amenities.map((amenity, idx) => (
                    <li key={idx}>{amenity}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="col-span-2">
          <BookingForm propertyId={property.id} pricePerNight={Number(property.price_per_night)} />
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailPage;