import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

interface OutletContextType {
  search: string;
  setSearch: (val: string) => void;
}

// Updated interface to match your API response
interface Question {
  id: string;
  title: string;
  description: string;
  tags: Array<{
    id: string;
    questionId: string;
    tagId: string;
    tag: {
      id: string;
      name: string;
    };
  }>;
  author: {
    id: string;
    name: string;
    email: string;
    reputation: number;
  };
  answers: any[];
}

const Home = () => {
  const { search } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:8001/api/v1/question?page=${page}&limit=${ITEMS_PER_PAGE}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        // Updated to match your API response structure
        setQuestions(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err: any) {
        setError(err.message || "Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [page]);

  const filtered = questions.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  const getPageNumbers = () => {
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + 2);

    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleReply = (questionId: string) => {
    navigate(`/${questionId}/answer`);
  };

  const handleViewAnswers = (question: Question) => {
    // Instead of navigating to a new page, we can show answers inline
    // or navigate with the question data
    navigate(`/${question.id}/answers`, { state: { question } });
  };

  return (
    <div className="relative min-h-screen text-white p-6 overflow-hidden">
      {/* Floating background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float"></div>

      <div className="space-y-6 relative z-10">
        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading &&
          !error &&
          filtered.map((question, idx) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:scale-[1.015] hover:border-purple-600 transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
              <p className="text-gray-400 mb-3">{question.description}</p>
              <div className="flex items-center space-x-3 mb-3">
                {question.tags.map((tagObj) => (
                  <span
                    key={tagObj.id}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {tagObj.tag.name}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>By {question.author.name}</span>
                  <span className="bg-purple-600 px-3 py-1 rounded-full text-white">
                    {question.answers.length} ans
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReply(question.id)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-full transition duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                  <button
                    onClick={() => handleViewAnswers(question)}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full transition duration-300 transform hover:scale-105 text-sm"
                  >
                    <span>View Answers</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Pagination */}
      {!loading && !error && (
        <div className="flex justify-center items-center mt-10 space-x-2 relative z-10">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition ${page === 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gray-700 hover:bg-purple-600"
              }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {getPageNumbers().map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition ${p === page
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
            className={`w-8 h-8 flex items-center justify-center rounded-full transition ${page === totalPages
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gray-700 hover:bg-purple-600"
              }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;