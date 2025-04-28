import { useCategories } from "@/hooks/useCategoryMeals";
import React from "react";
import { Link } from "react-router-dom";
import SkeletonComponent from "./Skeleton";


const Coponents:React.FC =  () => {
    const { cats, loading, error } = useCategories(); // Fetch categories using the custom hook
  return (
    <div className="flex flex-col gap-4 p-4 mb-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="flex flex-wrap gap-4 mb-3">
        {loading? (
          <SkeletonComponent type={"list"} />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          cats.map((category) => (
            <div key={category} className="border bg-gray-300 px-4 py-2 rounded-full shadow-md">
              <Link className="text-xl font-semibold" to={`category/${category}`}>{category}</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Coponents;