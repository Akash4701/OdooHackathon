import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../logo.svg";

interface NavbarProps {
  search: string;
  setSearch: (val: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ search, setSearch }) => {

  const [showMore, setShowMore] = useState(false);
  
  return (
    <>
      {/* Logo + Login */}
      <div className="sticky top-0 z-30 bg-gradient-to-br from-gray-900 via-black to-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
        <img
          src={logo}
          alt="StackIt Logo"
          className="h-10 cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => navigate('/home')}
        />
        
        {!localStorage.getItem("token") && (
          <button
            className="cursor-pointer px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
            onClick={() => navigate('/auth')}
          >
            Login
          </button>
        )}
      </div>

      {/* Filters + Search */}
      <div className="sticky top-16 z-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 py-4 border-b border-gray-700">
        <div className="flex flex-wrap justify-between items-center gap-4 px-4 py-4 w-full mx-auto">

          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition" onClick={() => navigate('/editor')}>Ask New Question</button>
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">Newest</button>
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">Unanswered</button>

          <button 
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition" 
            onClick={() => navigate('/editor')}
          >
            Ask New Question
          </button>
          
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
            Newest
          </button>
          
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition">
            Unanswered
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
            >
              More <ChevronDown className="ml-2 w-4 h-4" />
            </button>
            {showMore && (
              <div className="absolute mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg z-20">
                <div className="p-2 hover:bg-gray-700 cursor-pointer">Filter by Tag</div>
                <div className="p-2 hover:bg-gray-700 cursor-pointer">Most Answered</div>
                <div className="p-2 hover:bg-gray-700 cursor-pointer">Least Answered</div>
              </div>
            )}
          </div>

          <div className="flex items-center bg-gray-700 rounded px-2 w-full sm:w-auto max-w-xs sm:max-w-none ml-auto">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none px-2 py-1 w-full placeholder-gray-400"
            />
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;