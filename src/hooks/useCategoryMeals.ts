// src/hooks/useCategoryMeals.ts
import { useEffect, useState } from 'react';
import { fetchMealCategories, fetchMealsByCategory } from '../services/api'; // make sure this exists
import { Meal } from '../types/meal';

export const useCategoryMeals = (category: string) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMealsByCategory(category);
        if (data) {
          setMeals(data);
        } else {
          setMeals([]);
          setError('No meals found');
        }
      } catch (err) {
        console.error('Error fetching meals:', err);
        setError('Failed to fetch meals');
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchData();
  }, [category]);

  return { meals, loading, error };
};

export const useCategories = ()=>{
  const [cats, setCats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMealCategories(); // Fetch all categories
        if (data) {
          setCats(data);
        } else {
          setError('No categories found');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { cats, loading, error };
}
