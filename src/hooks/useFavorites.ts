import { Meal } from "@/types/meal";
import { createContext, useContext } from "react";

type FavoritesContextType = {
    favorites: Meal[];
    toggleFavorite: (meal:Meal) => void;
    favoritesCounter: number;
  };
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};


  