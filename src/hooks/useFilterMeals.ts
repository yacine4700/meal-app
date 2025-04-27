import { fetchFiltersData } from "@/services/api";
import { Filter } from "@/types/filters";
import { Meal } from "@/types/meal";
import { useState, useEffect } from "react";


const useFilterMeals = (meals: Meal[], selectedFilters: Filter) => {
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>(meals);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<{ categories: string[]; areas: string[]; ingredients: string[] } | null>(null);
// fetch for filters data
  useEffect(() => {
      if (loading) return;
      const fetchFilters = async () => {
        try {
          const data = await fetchFiltersData();
          setFilters(data);
        } catch (err) {
          console.error('Error fetching filters data:', err);
        }
      };
      fetchFilters();
    }, [loading]);

    // apply filters to meals
  useEffect(() => {
    setLoading(true);
    const fetchFilteredMeals = async () => {
      try {
        const applyFilters = ()=> {
            let filteredMeals = meals;
            if (selectedFilters.category) {
                filteredMeals = filteredMeals.filter(meal => meal.strCategory === selectedFilters.category);
            }
            if (selectedFilters.area) {
                filteredMeals = filteredMeals.filter(meal => meal.strArea === selectedFilters.area);
            }
            if (selectedFilters.ingredient) {
                filteredMeals = filteredMeals.filter(meal => meal.strIngredient1 === selectedFilters.ingredient);
            }
            return filteredMeals;
        };
        applyFilters();
        const filtered = applyFilters();
        setFilteredMeals(filtered);
      } catch (error) {
        console.error('Error fetching filtered meals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredMeals();
  }, [meals, selectedFilters]);

  return { filteredMeals, loading , filters };
}

export default useFilterMeals;