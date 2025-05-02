// MobileMenu.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  categories: string[];
  loading: boolean;
  error: string | null;
};

const MobileMenu = ({ categories, loading, error }: Props) => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="absolute top-full right-4 mt-2 bg-white border border-gray-200 rounded shadow-md z-50 w-64 p-4 lg:hidden">
      <ul className="flex flex-col space-y-3">
        <li>
          <Link to="/" className="text-gray-800 hover:text-blue-500">Home</Link>
        </li>

        {/* Collapsible categories */}
        <li>
          <button
            onClick={() => setShowCategories((prev) => !prev)}
            className="text-left w-full text-gray-800 hover:text-blue-500 focus:outline-none"
          >
            Categories {showCategories ? '▲' : '▼'}
          </button>
          {showCategories && (
            <ul className="mt-2 ml-4 space-y-2">
              {loading ? (
                <li className="text-gray-500">Loading...</li>
              ) : error ? (
                <li className="text-red-500">{error}</li>
              ) : (
                categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      to={`/category/${cat}`}
                      className="text-gray-700 hover:text-blue-500"
                    >
                      {cat}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          )}
        </li>

        <li>
          <Link to="/favorites" className="text-gray-800 hover:text-blue-500">Favorites</Link>
        </li>
        <li>
          <Link to="/login" className="text-gray-800 hover:text-blue-500">Login</Link>
        </li>
        <li>
          <Link to="/signup" className="text-gray-800 hover:text-blue-500">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
