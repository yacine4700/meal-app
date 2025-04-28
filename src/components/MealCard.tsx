import React from 'react';
import { Meal } from '@/types/meal'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import { motion } from 'framer-motion';


const MealCard: React.FC<Meal> = (meal) => {
    const { favorites, toggleFavorite } = useFavorites(); // Assuming you have a hook to manage favorites
    const isFavorite = favorites.some(favorite => favorite.idMeal === meal.idMeal);
    
    return (
        <div className="relative flex flex-col h-full max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <motion.button
            onClick={() => toggleFavorite(meal)}
            whileTap={{ scale: 1.3 }}
            className="text-red-500 absolute top-2 right-2 z-10"
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                    animate={{ fill: isFavorite ? "#ef4444" : "transparent" }} // RED fill when favorite
                    transition={{ duration: 0.4 }} // Smooth fill transition
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.25c0-2.485 2.014-4.5 4.5-4.5
                        1.647 0 3.134.898 4 2.25
                        0.866-1.352 2.353-2.25 4-2.25
                        2.485 0 4.5 2.015 4.5 4.5
                        0 5.25-8.5 10.5-8.5 10.5S3 13.5 3 8.25z"
                    />
                </motion.svg>
            </motion.button>
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