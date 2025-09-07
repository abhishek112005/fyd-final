import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          FindYourDoctor
        </Link>

        {/* Nav Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/doctors" className="hover:text-gray-200">Doctors</Link>
          <Link to="/hospitals" className="hover:text-gray-200">Hospitals</Link>
          <Link to="/insurance" className="hover:text-gray-200">Insurance</Link>
          <Link to="/login" className="bg-white text-blue-600 px-4 py-1 rounded-lg hover:bg-gray-100">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
