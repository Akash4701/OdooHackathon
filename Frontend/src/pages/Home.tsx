import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { questionsData } from "./Constants";

const ITEMS_PER_PAGE = 6;

interface OutletContextType {
  search: string;
  setSearch: (val: string) => void;
}

const Home = () => {
  const { search } = useOutletContext<OutletContextType>();
  const [page, setPage] = useState(1);

  const filtered = questionsData.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + 2);

    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 overflow-hidden">
      {/* Floating background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float"></div>

      {/* Questions list */}
      <div className="space-y-6 relative z-10">
        {paginated.map((question, idx) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:scale-[1.015] hover:border-purple-600 transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
            <p className="text-gray-400 mb-3">{question.description}</p>
            <div className="flex items-center space-x-3 mb-2">
              {question.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>By {question.author}</span>
              <span className="bg-purple-600 px-3 py-1 rounded-full text-white">
                {question.answerCount} ans
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-2 relative z-10">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
            page === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-gray-700 hover:bg-purple-600"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
              p === page
                ? "bg-purple-600 text-white"
                : "bg-gray-700 hover:bg-purple-600"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
            page === totalPages
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gray-700 hover:bg-purple-600"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Home;
