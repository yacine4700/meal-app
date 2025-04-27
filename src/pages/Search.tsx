import  { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MealCard from '../components/MealCard';
import useSearchMeals from '@/hooks/useSearchMeals';
import useFilterMeals from '@/hooks/useFilterMeals';
import { Filter } from '@/types/filters';
import { Button } from '@/components/ui/button';
import SkeletonComponent from '@/components/Skeleton';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery();
  const searchQuery = query.get('q') || '';
  const { results , isLoading, error } = useSearchMeals(searchQuery);
  const [selectedFilters, setSelectedFilters] = useState<Filter>();
  const { filteredMeals, filters } = useFilterMeals(results, selectedFilters || {})

 
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
  const handleResetFilters = () => {
    setSelectedFilters({});
  };
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
          <h1 className='text-2xl'>
            Search results for: <span className="text-blue-500 font-bold">{searchQuery}</span>
          </h1>
          {/* filters */}
          <div className="relative flex flex-col gap-4 mb-2 bg-white rounded-md shadow-md p-2 text-center">
            <Button
              onClick={handleResetFilters}
              className="absolute left-0 top-0 font-bold mt-2 ms-2 p-2 rounded-full"
            >
              Reset Filters
            </Button>

            <h2 className="text-lg font-semibold text-gray-700 mb-1">Filters</h2>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block text-md font-bold text-gray-700 mb-1" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  className="block w-full rounded-md border-gray-500 border border-black px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  name="category"
                  onChange={handleFilterChange}
                  value={filters?.categories?.find((cat) => cat === selectedFilters?.category) || ''}
                >
                  <option value="">All</option>
                  {filters?.categories?.map((category: string) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-md font-bold text-gray-700 mb-1" htmlFor="area">
                  Area
                </label>
                <select
                  id="area"
                  className="block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2"
                  name="area"
                  onChange={handleFilterChange}
                  value={filters?.areas?.find((area) => area === selectedFilters?.area) || ''}
                >
                  <option value="">All</option>
                  {filters?.areas?.map((area: string) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-md font-bold text-gray-700 mb-1" htmlFor="area">
                  main ingredient
                </label>
                <select
                  id="main-ingeredient"
                  className="block w-full rounded-md border border-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2"
                  name="ingredient"
                  onChange={handleFilterChange}
                  value={filters?.ingredients?.find((ingredient) => ingredient === selectedFilters?.ingredient) || ''}
                >
                  <option value="">All</option>
                  {filters?.ingredients?.map((ingredient: string) => (
                    <option key={ingredient} value={ingredient}>
                      {ingredient}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        
      </div>

      {isLoading ? (
        <SkeletonComponent />
      ) : results.length === 0? (
        <p className="text-red-500">No meals found.</p>
      ) : error? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 gap-4">
          {filteredMeals.map((meal) => (
            <MealCard key={meal.idMeal} {...meal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
