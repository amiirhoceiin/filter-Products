import React from 'react'

interface FilterOption {
  OptionID: number;
  OptionName: string;
}

interface Filter {
  FilterID: number;
  FilterName: string;
  Options: FilterOption[];
}

interface Props {
  filters: Filter[]; 
  selectedFilters: { [key: number]: number[] }; 
  onFilterChange: (filterId: number, optionID: number) => void;
}

export default function OptionFilter({
  filters,
  selectedFilters,
  onFilterChange
}: Props) {
  return (
    <div>
       {filters.map((filter) => (
         <div key={filter.FilterID}>
           <h3>{filter.FilterName}</h3>
            {filter.Options.map((option)=>(
              <div key={option.OptionID}>
                <input type="checkbox" checked={selectedFilters[filter.FilterID]?.includes(option.OptionID)} onChange={()=>onFilterChange(filter.FilterID, option.OptionID)} />
                <label
                htmlFor={`filter-${filter.FilterID}-${option.OptionID}`}
                className="cursor-pointer hover:text-black/80 transition-colors"
              >
                {option.OptionName}
              </label>
              </div>
            ))}
         </div>
       ))}
    </div>
 );
}
