'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/app/lib/api";
import { Property } from "@/app/types";
import { authService } from "@/app/services/authService";
import useLoginModal from "@/app/hooks/useLoginModal";
import AddPropertyForm from "@/app/components/properties/AddPropertyForm";

const MyPropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const loginModal = useLoginModal();

  const fetchProperties = async () => {
    try {
      const response = await api.get('/api/properties/myproperties/');
      setProperties(response.data.data || []);
    } catch (error) {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      setIsAuthenticated(false);
      loginModal.open();
      setLoading(false);
      return;
    }
    setIsAuthenticated(true);
    fetchProperties();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center text-red-500">
        Please log in to view your properties.
      </div>
    );
  }

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 pt-12">
      <h1 className="my-6 mb-6 text-2xl">My Properties</h1>
      {/* Add Property Form */}
      <div className="mb-8">
        <AddPropertyForm onSuccess={fetchProperties} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.length === 0 ? (
          <div>No properties found.</div>
        ) : (
          properties.map(property => (
            <div key={property.id} className="p-5 border rounded-xl shadow-md">
              <div className="relative overflow-hidden aspect-square rounded-xl mb-4">
                <Image
                  fill
                  src={property.image_url || "/beach_1.jpg"}
                  className="object-cover w-full h-full"
                  alt={property.title}
                />
              </div>
              <h2 className="mb-2 text-xl">{property.title}</h2>
              <p className="mb-1"><strong>Location:</strong> {property.location}</p>
              <p className="mb-1"><strong>Price per night:</strong> ${property.price_per_night}</p>
              <p className="mb-1"><strong>Bedrooms:</strong> {property.bedrooms}</p>
              <p className="mb-1"><strong>Bathrooms:</strong> {property.bathrooms}</p>
              <div className="mt-4 inline-block cursor-pointer py-2 px-4 bg-rose-500 text-white rounded-xl">
                Edit property
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default MyPropertiesPage;