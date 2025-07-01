"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { CategoryKey } from "./components/Categories";
import Categories from "./components/Categories";
import PropertyList from "./components/properties/PropertyList";
import SearchFilters from "./components/navbar/Searchfilters";

export default function Home() {
  // Get the current search params from the URL
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get('location') || '';

  // Track the selected category and location in state
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | undefined>(undefined);
  const [location, setLocation] = useState<string>(initialLocation);

  // Keep state in sync if the URL changes (optional, but good practice)
  useEffect(() => {
    setLocation(searchParams.get('location') || '');
  }, [searchParams]);

  // Handler for search bar
  const handleLocationSearch = (searchValue: string) => {
    setLocation(searchValue);
  };

  return (
    <main className="max-w-[1500px] mx-auto px-6">
      {/* Search bar for location */}
      {/* <SearchFilters
        location={location}
        onLocationChange={handleLocationSearch}
      /> */}

      {/* Category selection */}
      <Categories
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Property list filtered by category and location */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <PropertyList
          selectedCategory={selectedCategory}
          location={location}
        />
      </div>
    </main>
  );
}