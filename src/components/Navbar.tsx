import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'
import { useEffect, useState } from 'react';
import { fetchMealCategories } from '../services/api';

function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<string[]>([]); // Initialize categories as an empty array
    const [loading, setLoading] = useState<boolean>(true); // Initialize loading state
    const [error, setError] = useState<string | null>(null); // Initialize error state
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const data = await fetchMealCategories(); // Fetch meals with a default search term
                setCategories(data || []) // Set meals to the fetched data or an empty array if null
                setLoading(false);
            } catch (err) {
                setError('Error fetching meals'); // Set error message if fetch fails
                console.error('Error fetching meals:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);
    const handleSearch = (): void => {
        if (searchQuery.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Redirect to the search page with the query
            setSearchQuery(''); // Clear the search input after submission
        } else {
            return; // Alert if the search query is empty
        }
    }
    return (
        <header className="bg-white shadow-md">
            <nav className="container flex items-center  p-4">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                RECEIPES LOGO
                </Link>
                <form
                    className="mx-auto"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                    >
                    <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
                        <input
                        className="flex-grow px-4 py-2 text-gray-700 bg-transparent focus:outline-none"
                        type="text"
                        placeholder="Search recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 transition rounded-r-full"
                        >
                        🔍
                        </button>
                    </div>
                </form>

                <ul className="flex ms-auto space-x-6 text-gray-700">
                    {/* categories list */}
                    <div className="relative group">
                        <button className="hover:text-blue-500 cursor-pointer">Categories ▾</button>
                        <ul className="absolute hidden group-hover:block bg-white border border-gray-200 rounded shadow-md z-50 min-w-[150px]">
                            {loading ? (
                                <li className="text-gray-500 px-4 py-2">Loading...</li>
                            ) : error ? (
                                <li className="text-red-500 px-4 py-2">{error}</li>
                            ) : (
                                categories.map((category) => (
                                    <li key={category} className="hover:bg-gray-100 px-4 py-2">
                                        <Link to={`/category/${category}`} className="block text-gray-800">
                                            {category}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <li className="hover:text-blue-500 cursor-pointer">Login</li>
                    <li className="hover:text-blue-500 cursor-pointer">Magazine</li>
                    <li className="hover:text-blue-500 cursor-pointer">Newsletter</li>
                    <li className="hover:text-blue-500 cursor-pointer">Sweepstakes</li>
                </ul>
            </nav>
        </header>
    )
}
export default Navbar;

