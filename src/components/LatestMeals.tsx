import React, { useEffect, useState } from 'react';
import { fetchLatestMeals } from '../services/api';
import { Link } from 'react-router-dom';
import { Meal } from '@/types/meal';
import { Skeleton } from './ui/skeleton';

const LatestMealsSection: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Initialize loading state
  const [error, setError] = useState<string | null>(null); // Initialize error state

  useEffect(() => {
    const getMeals = async () => {
      const latest = await fetchLatestMeals();
      try {
        if (latest) {
          setMeals(latest);
          setLoading(false);
        } else {
          setError('No meals found'); // Set error message if no meals are found
          console.error('No meals found');
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      } finally {
        setLoading(false);
      }
    };
    getMeals();
  }, []);


  const [featured, ...others] = meals;

  return (
    <>
        <h2 className='text-2xl font-bold mb-2 '>For You</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-2 mb-3 p-3 rounded bg-blue-100">
  {loading ? (
    <>
      {/* Skeleton for Featured Meal */}
      <div className="relative group rounded-lg overflow-hidden shadow-lg">
        <Skeleton className="w-full h-96 rounded" />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-4 w-full">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      {/* Skeletons for other meals */}
      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-4 p-2 rounded-lg bg-white">
            <Skeleton className="w-20 h-20 rounded-md" />
            <div className="flex-1">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </>
  ) : error ? (
    <div className="text-red-500 text-center p-4 rounded bg-red-100">
      <p>{error}</p>
    </div>
  ) :(
    <>
      {/* Actual Featured Meal */}
      <Link to={`/meal/${featured.idMeal}`} className="relative group rounded-lg overflow-hidden shadow-lg">
        <img src={featured.strMealThumb} alt={featured.strMeal} className="w-full h-96 object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-4 w-full">
          <h2 className="text-2xl font-bold">{featured.strMeal}</h2>
          <p className="text-sm">{featured.strCategory} | {featured.strArea}</p>
        </div>
      </Link>

      {/* Actual Other Meals */}
      <div className="grid gap-4">
        {others.map((meal) => (
          <Link key={meal.idMeal} to={`/meal/${meal.idMeal}`} className="flex items-center gap-4 p-2 rounded-lg bg-white hover:bg-gray-300 transition">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-20 h-20 object-cover rounded-md shadow" />
            <div>
              <h3 className="font-semibold text-lg">{meal.strMeal}</h3>
              <p className="text-sm text-gray-500">{meal.strCategory} | {meal.strArea}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )}
</div>
    </>
  );
};

export default LatestMealsSection;
