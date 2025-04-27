import {  fetchMealsBySearch } from "@/services/api";
import { Meal } from "@/types/meal";
import { useEffect, useState } from "react";

const useSearchMeals = (searchQuery: string) => {
    const [results, setResults] = useState<Meal[]> ([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchMealsBySearch(searchQuery);
                if (data) {
                    setResults(data);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An error occurred while fetching the meals.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (searchQuery.trim()) {
            fetchResults();
        } else {
            setResults([]);
        }
    }
    , [searchQuery]);
    return { results, isLoading, error };
};

export default useSearchMeals;