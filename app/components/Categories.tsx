import Image from 'next/image';
import React from 'react';

export type CategoryKey = 'beach' | 'villa' | 'cabin' | 'tiny_home';

const categories = [
  { key: 'beach', label: 'Beach', icon: '/icn_category_beach.jpeg' },
  { key: 'villa', label: 'Villas', icon: '/icn_category_beach.jpeg' },
  { key: 'cabin', label: 'Cabins', icon: '/icn_category_beach.jpeg' },
  { key: 'tiny_home', label: 'Tiny homes', icon: '/icn_category_beach.jpeg' },
];

interface CategoriesProps {
  selectedCategory?: CategoryKey;
  onCategorySelect: (category: CategoryKey) => void;
}

const Categories: React.FC<CategoriesProps> = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="pt-14 cursor-pointer pb-6 flex items-center space-x-12">
      {categories.map((cat) => (
        <div
          key={cat.key}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 transition-all duration-200 ${
            selectedCategory === cat.key
              ? 'border-gray-800 opacity-100'
              : 'border-white opacity-60 hover:border-gray-200 hover:opacity-100'
          }`}
          onClick={() => onCategorySelect(cat.key as CategoryKey)}
        >
          <Image src={cat.icon} alt={`Category-${cat.label}`} width={20} height={20} />
          <span className="text-xs">{cat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;