import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMealById } from '../services/api';
import { Meal } from '@/types/meal';
import { buttonVariants } from '@/components/ui/button';

const MealDetail: React.FC = () => {
    const { idMeal } = useParams<{ idMeal: string }>();
    const [meal, setMeal] = useState<Meal | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (idMeal) {
                    const data = await fetchMealById(idMeal);
                    setMeal(data);
                }
            } catch (error) {
                console.error('Error fetching meal details:', error);
            }
        };

        fetchData();
    }, [idMeal]);

    if (!meal) return <div className="text-center py-20">Loading...</div>;

    // Ingredients Extraction
    const ingredients: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({ ingredient, measure: measure ?? '' });
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-6">
            {/* <Link to="/" className="text-blue-600 hover:underline text-sm">&larr; Back to Home</Link> */}
            <Link className={buttonVariants({ variant: "default" })} to={'/'}>&larr; Back to Home</Link>

            {/* 1st line: Title */}
            <h1 className="text-4xl font-extrabold text-center mt-4 mb-8 text-green-800">{meal.strMeal}</h1>

            {/* 2nd section: Image + Details */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Image */}
                <div className="lg:w-2/3 w-full mb-6 lg:mb-0 max-h-[400px] overflow-hidden">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="rounded-lg shadow-md w-full h-full object-cover hover:brightness-105 transition duration-300"
                    />
                </div>


                {/* Tags and Ingredients */}
                <div className="lg:w-1/3 w-full">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 me-2 rounded-full text-sm font-medium">
                            Category: {meal.strCategory}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 me-2 rounded-full text-sm font-medium">
                            Area: {meal.strArea}
                        </span>
                        {meal.strTags && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                            Tags: {meal.strTags}
                            </span>
                        )}
                    </div>

                    {/* Ingredients */}
                    <h2 className="text-xl font-bold mb-2 mt-6">Ingredients</h2>
                    <ul className="space-y-2 text-sm text-gray-800 list-disc pl-5">
                        {ingredients.map((item, index) => (
                            <li key={index}>
                                {item.ingredient}{' '}
                                <span className="text-purple-600 font-semibold">({item.measure})</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 3rd section: Instructions */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-3 text-gray-700">Instructions</h2>
                <p className="text-gray-800 whitespace-pre-line leading-7">{meal.strInstructions}</p>
            </div>

            {/* Optional YouTube */}
            {meal.strYoutube && (
                <div className="mt-6 text-center">
                    <Link
                        to={meal.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-red-600 font-medium hover:underline mt-4"
                    >
                        📺 Watch on YouTube
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MealDetail;
