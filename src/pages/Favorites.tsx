import MealCard from "@/components/MealCard";
import { useFavorites } from "@/hooks/useFavorites"


const Favorites = () => {
    const {favorites, favoritesCounter} = useFavorites()
    if (favoritesCounter === 0) {
        return <p className="text-center text-gray-500 mt-10">No favorites yet. Start adding some!</p>;
    }
  return (
    
    <div className="flex flex-col items-center justify-center mt-4 bg-gray-100 w-full">
        <h1 className="text-3xl font-bold mb-4">Favorites</h1>
        <p className="text-lg mb-4">You have {favoritesCounter} favorite meals.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Render the favorite meals here */}
            {favorites.map((favorite) => (
            <MealCard
                key={favorite.idMeal}
                {...favorite}/>
            ))}
        </div>
        <p className="text-lg mt-4">Click on a meal to view its details.</p>
    </div>
  )
}

export default Favorites