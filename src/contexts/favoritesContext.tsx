import { FavoritesContext } from '@/hooks/useFavorites';
import { Meal } from '@/types/meal';
import { useState, ReactNode, useEffect } from 'react';




export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [favoritesCounter , setFavoritesCounter] = useState<number>(0)

  useEffect(() => {
    const favCount = favorites.length
    setFavoritesCounter(favCount)
  },[favorites])

  const toggleFavorite = (meal: Meal) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.idMeal === meal.idMeal)
        ? prev.filter((fav) => fav.idMeal !== meal.idMeal)
        : [...prev, meal]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, favoritesCounter }}>
      {children}
    </FavoritesContext.Provider>
  );
};

