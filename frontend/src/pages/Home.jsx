import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4">
        Find Your Doctor
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
        Search for doctors, hospitals, and insurance options near you.  
        Get the right consultation based on your symptoms.
      </p>

      {/* Search bar */}
      <div className="w-full max-w-lg flex shadow-md rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          placeholder="Enter your symptoms (e.g., fever, cough)"
          className="flex-grow px-4 py-2 outline-none"
        />
        <button className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700">
          Search
        </button>
      </div>

      {/* CTA Buttons */}
      <div className="flex space-x-4">
        <Link to="/doctors" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
          Find Doctors
        </Link>
        <Link to="/hospitals" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300">
          Find Hospitals
        </Link>
      </div>
    </div>
  );
}
