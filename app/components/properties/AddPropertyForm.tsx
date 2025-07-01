'use client';
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import api from "@/app/lib/api";

const AddPropertyForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [maxGuests, setMaxGuests] = useState(2);
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/api/properties/', {
        title,
        description,
        price_per_night: Number(pricePerNight),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        max_guests: Number(maxGuests),
        image_url: imageUrl,
        location,
        amenities: [],
      });
      setMessage('Property added successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      setMessage('Failed to add property. Please try again.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      <input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      <input placeholder="Price per night" type="number" value={pricePerNight} onChange={e => setPricePerNight(e.target.value)} required className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      <input placeholder="Bedrooms" type="number" value={bedrooms} onChange={e => setBedrooms(Number(e.target.value))} required className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      <input placeholder="Bathrooms" type="number" value={bathrooms} onChange={e => setBathrooms(Number(e.target.value))} required className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      <input placeholder="Max guests" type="number" value={maxGuests} onChange={e => setMaxGuests(Number(e.target.value))} required className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 border border-gray-300 rounded-xl" />
      {message && (
        <div className="p-5 bg-rose-500 text-white rounded-xl opacity-80">
          {message}
        </div>
      )}
      <CustomButton label="Add Property" type="submit" />
    </form>
  );
};

export default AddPropertyForm;