import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCategories } from '@/hooks/useCategoryMeals';
import { Button } from './ui/button';

function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    
    const {cats , loading, error} =  useCategories(); // Fetch categories using the custom hook
    const handleSearch = (): void => {
        if (searchQuery.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Redirect to the search page with the query
            setSearchQuery(''); // Clear the search input after submission
        } else {
            return; // Alert if the search query is empty
        }
    }
    const [menuOpen, setMenuOpen] = useState(false);
    const navLinks = () => {
        return (
            <div className="lg:flex items-center justify-between sm:hidden ms-2 space-x-6 text-gray-700">
                    {/* categories list */}
                    <div className="relative group">
                        <button className="hover:text-blue-500 cursor-pointer">Categories ▾</button>
                        <ul className="absolute hidden group-hover:block bg-white border border-gray-200 rounded shadow-md z-50 min-w-[150px]">
                        {loading ? (
                            <li className="text-gray-500 px-4 py-2">Loading...</li>
                        ) : error ? (
                            <li className="text-red-500 px-4 py-2">{error}</li>
                        ) : (
                            cats.map((category) => (
                            <li key={category} className="hover:bg-gray-100 px-4 py-2">
                                <Link to={`/category/${category}`} className="block text-gray-800">
                                {category}
                                </Link>
                            </li>
                            ))
                        )}
                        </ul>
                    </div>
                    {/* favorites link */}
                    <div className="">
                        <Link to="/favorites" className="hover:text-blue-500 cursor-pointer">Favorites</Link>
                    </div>
                    {/* login and sign in buttons */}
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" className="ms-auto text-gray-800 hover:text-blue-500 border-gray-300 hover:border-blue-500 transition duration-200">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button variant="outline" className="text-gray-800 hover:text-blue-500 border-gray-300 hover:border-blue-500 transition duration-200">
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                    </div>
            </div>
        );
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="w-full flex items-center p-4">
                {/* logo */}
                <div className="flex items-center justify-between sm:w-auto">
                    {/* Logo and search bar */}
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                    RECEIPES LOGO
                    </Link>
                </div>
                {/* search bar */}
                <div className='hidden sm:flex flex-grow mx-4'>
                    {/* Search bar for larger screens */}
                <form
                className="mx-auto sm:flex-1"
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
                </div>
                {navLinks()}
                
                {/* Hamburger menu for small screens */}
                <Button
                        className="lg:hidden text-gray-800 focus:outline-none"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        variant={"ghost"}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                </Button>
                <div className="relative flex items-center ml-auto bg-white lg:hidden ">
                    
                    {menuOpen && (
                        <div className="absolute top-full right-0 bg-white border border-gray-200 rounded shadow-md z-50 w-48">
                            <ul className="flex flex-col space-y-2 p-4">
                                <li>
                                    <Link
                                        to="/"
                                        className="block text-gray-800 hover:text-blue-500"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <ul>
                                        <li className="relative group">
                                            <button className="hover:text-blue-500 cursor-pointer">Categories ▾</button>
                                            <ul className="absolute hidden group-hover:block bg-white border border-gray-200 rounded shadow-md z-50 min-w-[150px]">
                                                {loading ? (
                                                    <li className="text-gray-500 px-4 py-2">Loading...</li>
                                                ) : error ? (
                                                    <li className="text-red-500 px-4 py-2">{error}</li>
                                                ) : (
                                                    cats.map((category) => (
                                                        <li key={category} className="hover:bg-gray-100 px-4 py-2">
                                                            <Link to={`/category/${category}`} className="block text-gray-800">
                                                                {category}
                                                            </Link>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="block text-gray-800 hover:text-blue-500"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/signup"
                                        className="block text-gray-800 hover:text-blue-500"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </header>

    )
}
export default Navbar;

