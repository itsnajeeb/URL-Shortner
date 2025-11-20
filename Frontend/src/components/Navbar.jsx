import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        URL Shortener
      </Link>

      <div className="flex gap-6">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/add"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Create Link
        </Link>

        <a
          href="https://github.com/"
          target="_blank"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
