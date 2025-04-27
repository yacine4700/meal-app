import React from 'react';
import { Meal } from '@/types/meal'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';


const MealCard: React.FC<Meal> = (meal) => {
    return (
        <div className="flex flex-col h-full max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full h-48 object-cover" src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="px-3 py-4">
                <div className="font-bold text-xl mb-2">{meal.strMeal}</div>
            </div>
            <div className="px-3 pt-4 pb-2">
                <Link to={`/meal/${meal.idMeal}`}>
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
                        View Recipe
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MealCard;