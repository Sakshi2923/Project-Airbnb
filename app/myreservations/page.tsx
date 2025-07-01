'use client';
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/app/lib/api";
import { Reservation } from "@/app/types";
import { authService } from "@/app/services/authService";
import useLoginModal from "@/app/hooks/useLoginModal";

const MyReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginModal = useLoginModal();
  const modalOpened = useRef(false);

  // Combined authentication check and listener
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(typeof window !== "undefined" && authService.isAuthenticated());
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Only open login modal once when isAuthenticated changes to false
  useEffect(() => {
    if (!isAuthenticated && !modalOpened.current) {
      loginModal.open();
      setLoading(false);
      modalOpened.current = true;
    }
    if (isAuthenticated) {
      modalOpened.current = false;
    }
  }, [isAuthenticated, loginModal]);

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    const fetchReservations = async () => {
      try {
        const response = await api.get('/api/reservations/');
        setReservations(response.data.data || []);
      } catch (error) {
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [isAuthenticated]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center text-red-500">
        Please log in to view your reservations.
      </div>
    );
  }

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 pt-12">
      <h1 className="my-6 mb-6 text-2xl">My Reservations</h1>
      <div className="space-y-4">
        {reservations.length === 0 ? (
          <div>No reservations found.</div>
        ) : (
          reservations.map(res => (
            <div key={res.id} className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
              <div className="col-span-1">
                <div className="relative overflow-hidden aspect-square rounded-xl">
                  <Image
                    fill
                    src={typeof res.property === "object" && res.property.image_url ? res.property.image_url : "/beach_1.jpg"}
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={typeof res.property === "object" ? res.property.title : "Property"}
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 space-y-2">
                <h2 className="mb-4 text-xl">
                  {typeof res.property === "object" ? res.property.title : "Property"}
                </h2>
                <p className="mb-2"><strong>Check in date:</strong> {res.check_in}</p>
                <p className="mb-2"><strong>Check out date:</strong> {res.check_out}</p>
                <p className="mb-2"><strong>Status:</strong> {res.status}</p>
                <p className="mb-2"><strong>Total Price:</strong> ${res.total_price}</p>
                <Link
                  href={
                    typeof res.property === "object"
                      ? `/properties/${res.property.id}`
                      : "#"
                  }
                  className="mt-6 inline-block cursor-pointer py-4 px-6 bg-rose-500 text-white rounded-xl"
                >
                  Go to property
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default MyReservationsPage;