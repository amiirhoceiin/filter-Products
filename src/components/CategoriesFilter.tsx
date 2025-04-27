import React from 'react';

interface Props {
  categories: any[];
  selectedCategory: any[];
  onCategoryChange: (categoryID: number) => void;  
}

export default function Categories({categories, selectedCategory, onCategoryChange}: Props) {
  return (
    <div>
      {categories.map((category) => (
        <div key={category.CategoryID}>
          <input
            type="checkbox"
            checked={selectedCategory.includes(category.CategoryID)}
            onChange={() => {
              onCategoryChange(category.CategoryID);
            }} 
          />
          <label
            htmlFor={category.CategoryID.toString()}
            className="cursor-pointer hover:text-black/80 transition-colors"
          >
            {category.CategoryName}
          </label>
        </div>
      ))}
    </div>
  );
}
