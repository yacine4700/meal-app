import { Meal } from "@/types/meal";
import { isBannedCategory } from "@/utils/isBannedCategories";
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';



interface MealResponse {
    meals: Meal[] | null;
}

export const fetchMealsBySearch = async (query: string): Promise<Meal[] | null> => {
    // Check if the query is a banned category using the isBannedCategory function.
    if (isBannedCategory(query)) {
        console.error('Banned category:', query);
        return null;
    }
    // This function fetches meals by search query. It takes a query string as an argument and returns a promise that resolves to an array of Meal objects or null if the fetch fails.
    try {
        const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
        if (!res.ok) throw new Error('Failed to fetch meals');
        const data: { meals: Meal[] | null } = await res.json();
        return data.meals;
    } catch (error) {
        console.error(error);
        return null;
    }
};
// This function fetches meals by category. It takes a category string as an argument and returns a promise that resolves to an array of Meal objects or null if the fetch fails.

export const fetchMealsByCategory = async (category: string): Promise<Meal[] | null> => {
    // Check if the category is a banned category using the isBannedCategory function.
    if (isBannedCategory(category)) {
        console.error('Banned category:', category);
        return null;
    }
    // This function fetches meals by category. It takes a category string as an argument and returns a promise that resolves to an array of Meal objects or null if the fetch fails.
    try {
        const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
        if (!res.ok) throw new Error('Failed to fetch meals by category');
        const data: { meals: Meal[] | null } = await res.json();
        return data.meals;
    } catch (error) {
        console.error(error);
        return null;
    }
};
// This function fetches meals by category. It takes a category string as an argument and returns a promise that resolves to an array of Meal objects or null if the fetch fails.



export const fetchMealById = async (id: string): Promise<Meal | null> => {
    try {
        const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
        if (!res.ok) throw new Error('Failed to fetch meal by ID');
        const data: MealResponse = await res.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error(error);
        return null;
    }
};
// This function fetches a meal by its ID. It takes an ID string as an argument and returns a promise that resolves to a Meal object or null if the fetch fails.

export const fetchLatestMeals = async (): Promise<Meal[] | null> => {
    try {
        const meals: Meal[] = [];

        for (let i = 0; i < 5; i++) {
            try {
                const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const data = await res.json();
                if (data.meals?.[0]) meals.push(data.meals[0]);
            } catch (error) {
                console.error('Error fetching meal', error);
            }
        }

        return meals;
    } catch (error) {
      console.error(error);
      return null;
    }
};
// this function fetches 5 latest meals

export const fetchMealCategories = async (): Promise<string[] | null> => {
    // This function fetches meal categories from the API. It returns a promise that resolves to an array of category strings or null if the fetch fails.
    try {
        const res = await fetch(`${BASE_URL}/list.php?c=list`);
        const data = await res.json();
        return data.meals
        .map((item: { strCategory: string }) => item.strCategory)
        .filter((category: string) => category !== 'Pork'); // Filter out unwanted categories
    } catch (error) {
        console.error(error);
        return null;
    }
};
// This function fetches meal categories from the API. It returns a promise that resolves to an array of category strings or null if the fetch fails.



export const fetchFiltersData = async (): Promise<{
    categories: string[];
    areas: string[];
    ingredients: string[];
  } | null> => {
    try {
      const [categoriesRes, areasRes, ingredientsRes] = await Promise.all([
        fetch(`${BASE_URL}/list.php?c=list`),
        fetch(`${BASE_URL}/list.php?a=list`),
        fetch(`${BASE_URL}/list.php?i=list`),
      ]);
  
      if (!categoriesRes.ok || !areasRes.ok || !ingredientsRes.ok) {
        throw new Error("Failed to fetch one or more resources");
      }
  
      const [categoriesData, areasData, ingredientsData] = await Promise.all([
        categoriesRes.json(),
        areasRes.json(),
        ingredientsRes.json(),
      ]);
  
      const categories = categoriesData.meals
        .map((item: { strCategory: string }) => item.strCategory)
        .filter((category: string) => category !== 'Pork'); // exclude if needed
  
      const areas = areasData.meals.map((item: { strArea: string }) => item.strArea);
      const ingredients = ingredientsData.meals.map((item: { strIngredient: string }) => item.strIngredient);
  
      return { categories, areas, ingredients };
    } catch (error) {
      console.error('Error fetching filters:', error);
      return null;
    }
  };