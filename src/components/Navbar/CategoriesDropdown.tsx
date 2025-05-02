import { Link } from 'react-router-dom';

interface Props {
  categories: string[];
  loading: boolean;
  error: string | null;
}

const CategoriesDropdown = ({ categories, loading, error }: Props) => {
  return (
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
  );
};

export default CategoriesDropdown;
