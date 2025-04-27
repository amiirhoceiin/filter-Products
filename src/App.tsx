import { useEffect, useState } from 'react';
import './App.css';
import CategoriesFilter from './components/CategoriesFilter';
import data from './db.json';
import ProductList from './components/ProductList';
import OptionFilter from './components/OptionFilter';


interface Product {
  ID: number;
  Name: string;
  CategoryID: number;
  Filters: {
    Filter: number;
    Option: number;
  }[];
}

interface FilterOption {
  FilterID: number;
  OptionID: number;
}

interface Filter {
  ID: number;
  Name: string;
  Options: {
    ID: number;
    Name: string;
  }[];
}

interface Category {
  ID: number;
  Name: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption[]>([]); 
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]); 

  useEffect(() => {
    const { Products, Filters, Categories } = data.Data;
    setProducts(Products);
    setFilters(Filters);
    setCategories(Categories);
  }, []);

  
  const handleCategoryChange = (categoryID: number) => {
    setSelectedCategory((prevSelectedCategory) => {
      if (prevSelectedCategory.includes(categoryID)) {
        return prevSelectedCategory.filter((id) => id !== categoryID);
      } else {
        return [...prevSelectedCategory, categoryID];
      }
    });
  };

  
  const handleFilterChange = (filterID: number, optionID: number) => {
    setSelectedFilter((prev: any) => {
      const options = prev[filterID] || [];
  
      if (options.includes(optionID)) {
       
        const newOptions = options.filter((id: number) => id !== optionID);
  
        if (newOptions.length === 0) {
         
          const { [filterID]: _, ...rest } = prev;
          return rest;
        } else {
          return { ...prev, [filterID]: newOptions };
        }
      } else {
       
        return { ...prev, [filterID]: [...options, optionID] };
      }
    });
  };
  

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory.length === 0 || selectedCategory.includes(product.CategoryID);
  
    const filterMatch =
      Object.keys(selectedFilter).length === 0 ||
      Object.entries(selectedFilter).every(([filterID, optionIDs]) =>
        product.Filters.some(
          (filter: { Filter: number; Option: number }) =>
            filter.Filter === Number(filterID) && optionIDs.includes(filter.Option)
        )
      );
  
    return categoryMatch && filterMatch;
  });
  
  

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-col border">
        <h1 className="text-2xl font-bold p-5">Product List</h1>

        <div className="p-7 border-b-2">
          <CategoriesFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <div className="p-7">
          <OptionFilter
            filters={filters}
            selectedFilters={selectedFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="p-5 border-b-2 flex-1">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}

export default App;
