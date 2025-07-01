"use client";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import api from "@/app/lib/api";
import { authService } from "@/app/services/authService";
import useLoginModal from "@/app/hooks/useLoginModal";

const BookingForm = ({
  propertyId,
  pricePerNight,
}: {
  propertyId: number;
  pricePerNight: number;
}) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [message, setMessage] = useState('');
  const loginModal = useLoginModal();

  // Helper to calculate nights between two dates
  const getNights = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!authService.isAuthenticated()) {
      loginModal.open();
      setMessage('Please log in to book.');
      return;
    }
    try {
      const nights = getNights(checkIn, checkOut);
      const totalPrice = nights * pricePerNight;
      await api.post('/api/reservations/', {
        property: propertyId,
        check_in: checkIn,
        check_out: checkOut,
        total_price: totalPrice,
      });
      setMessage('Booking successful!');
    } catch (error) {
      setMessage('Booking failed. Please try again.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="date"
        value={checkIn}
        onChange={e => setCheckIn(e.target.value)}
        required
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      <input
        type="date"
        value={checkOut}
        onChange={e => setCheckOut(e.target.value)}
        required
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
      />
      {checkIn && checkOut && (
        <div className="text-gray-700">
          Total price: <strong>₹{getNights(checkIn, checkOut) * pricePerNight}</strong>
        </div>
      )}
      {message && (
        <div className="p-5 bg-rose-500 text-white rounded-xl opacity-80">
          {message}
        </div>
      )}
      <CustomButton label="Book Now" type="submit" />
    </form>
  );
};

export default BookingForm;