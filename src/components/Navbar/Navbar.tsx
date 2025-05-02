// Navbar.tsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useCategories } from '@/hooks/useCategoryMeals';
import { Button } from '../ui/button';
import CategoriesDropdown from './CategoriesDropdown';
import MobileMenu from './MobileMenu';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cats, loading, error } = useCategories();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="w-full relative flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          RECIPES LOGO
        </Link>

        {/* Search bar (hidden on small screens) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="hidden sm:flex flex-grow mx-4"
        >
          <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden w-full">
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

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6 text-gray-700">
          <CategoriesDropdown categories={cats} loading={loading} error={error} />
          <Link to="/favorites" className="hover:text-blue-500">Favorites</Link>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile menu button and menu */}
        <div className="relative lg:hidden" ref={menuRef}>
          <Button
            className="text-gray-800 focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            variant="ghost"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </Button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-full right-0 z-50 w-48">
              <MobileMenu categories={cats} loading={loading} error={error} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
