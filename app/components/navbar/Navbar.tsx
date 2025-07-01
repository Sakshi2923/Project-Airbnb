"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SearchFilters from './Searchfilters';
import UserNav from './UserNav';
import AddPropertyButton from './AddPropertyButton';

const Navbar = () => {
  // Get the current search params from the URL
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get('location') || '';

  // State for the search bar, initialized from the URL
  const [location, setLocation] = useState(initialLocation);

  // Keep state in sync if the URL changes (optional, but good practice)
  useEffect(() => {
    setLocation(searchParams.get('location') || '');
  }, [searchParams]);

  const handleLocationChange = (searchValue: string) => setLocation(searchValue);

  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image 
              src="/logo.png"
              alt='Djangobnb logo'
              width={180}
              height={38}
            />
          </Link>

          {/* Search bar in the center */}
          <div className="flex-1 flex justify-center">
            <SearchFilters location={location} onLocationChange={handleLocationChange} />
          </div>

          {/* User menu and add property button */}
          <div className="flex items-center space-x-6">
            <AddPropertyButton />
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;