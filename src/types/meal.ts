export interface Meal {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate?: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags?: string | null;
    strYoutube: string;
    [key: string]: string | null | undefined; // To handle dynamic keys for ingredients and measures
}