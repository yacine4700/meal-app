import MealCard from "./MealCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCategoryMeals } from "@/hooks/useCategoryMeals";

import SkeletonComponent from "./Skeleton";

type Category = {
    category: string;
    lenght: number
}


function MainMeals({category, lenght}: Category) {

    const {meals, loading, error} = useCategoryMeals(category); // Use the custom hook to fetch meals by category

  return (
    <div className="mt-5">
        {loading ? (
            <SkeletonComponent/>
        ) : error ? (
            <div>{error}</div>
        ) : (
            <div>
                <span className="flex items-center text-4xl font-bold text-gray-800 my-4 title w-max mx-auto" >Meals in {category.toUpperCase()}             
                <Link to={`/category/${category}`} className="py-2 hover:text-blue-500 transition duration-300 ease-in-out">
                    <ArrowRight className="w-8 h-8 ms-2" />
                </Link>
                </span>
        
                <div className={`mt-3 grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 gap-3`}>
                    {meals.slice(0, lenght).map((meal) => (
                        <div key={meal.idMeal} >
                            <MealCard {...meal} /> {/* Spread the meal object to pass all its properties */}
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
}
export default MainMeals;