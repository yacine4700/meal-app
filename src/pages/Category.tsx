import React from 'react';
import { useParams } from 'react-router-dom';
import { useCategoryMeals } from '../hooks/useCategoryMeals'; // hypothetical hook to fetch meals
import MealCard from '@/components/MealCard';
import { Skeleton } from '@/components/ui/skeleton';

const Category: React.FC = () => {
  const { category } = useParams();
  const { meals, loading, error } = useCategoryMeals(category || '');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Category Image */}
      <div className="w-full h-64 relative overflow-hidden mb-6">
        <img
          src={`/img/${category}.jpg`}
          alt={category}
          onError={(e) => {
            e.currentTarget.src = '/img/standard.jpg';
          }} // put your category images in /public/images/categories/
          className="w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold uppercase">{category}</h1>
        </div>
      </div>

      {/* Meals List */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Meals in {category}</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex flex-col space-y-3">
                  <Skeleton className="h-[185px] w-[325px] rounded-xl bg-gray-300" />
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] bg-gray-300" />
                      <Skeleton className="h-4 w-[200px] bg-gray-300" />
                  </div>
              </div>
          ))}
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} {...meal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
