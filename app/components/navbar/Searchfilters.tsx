'use client';
import { useRouter } from "next/navigation";

interface SearchFiltersProps {
  location: string;
  onLocationChange: (searchValue: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ location, onLocationChange }) => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to homepage with location as query param
    router.push(`/?location=${encodeURIComponent(location)}`);
  };

  return (
    <form
      className="h-[64px] flex flex-row items-center justify-between border rounded-full"
      onSubmit={handleSearch}
    >
      <div className="hidden lg:block">
        <div className="flex flex-row items-center justify-between">
          <div className="h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
            <label className="text-xs font-semibold" htmlFor="location-input">Where?</label>
            <input
              id="location-input"
              type="text"
              placeholder="Wanted location"
              value={location}
              onChange={e => onLocationChange(e.target.value)}
              className="text-sm bg-transparent outline-none"
              style={{ minWidth: 120 }}
            />
          </div>
          <div className="cursor-pointer h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
            <p className="text-xs font-semibold">Check in</p>
            <p className="text-sm">Add dates</p>
          </div>
          <div className="cursor-pointer h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
            <p className="text-xs font-semibold">Check out</p>
            <p className="text-sm">Add dates</p>
          </div>
          <div className="cursor-pointer h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
            <p className="text-xs font-semibold">Who?</p>
            <p className="text-sm">Add guests</p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <button
          type="submit"
          className="cursor-pointer p-2 lg:p-4 bg-rose-500 hover:bg-rose-600 rounded-full text-white"
          aria-label="Search"
        >
          <svg viewBox="0 0 32 32" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: 4, overflow: 'visible' }} aria-hidden="true" role="presentation" focusable="false">
            <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchFilters;