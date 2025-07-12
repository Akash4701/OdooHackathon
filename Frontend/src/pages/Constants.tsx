export const questionsData = [
  {
    id: "1",
    title: "How to join 2 columns in SQL?",
    description: "Want to combine first and last names in SQL.",
    author: "Alice",
    tags: ["SQL", "Beginner"],
    answerCount: 5,
  },
  {
    id: "2",
    title: "How does React re-render?",
    description: "Virtual DOM vs real DOM, how does React update?",
    author: "Bob",
    tags: ["React", "JavaScript"],
    answerCount: 3,
  },
  {
    id: "3",
    title: "Best way to handle Next.js auth?",
    description: "Using JWT or NextAuth, what are pros and cons?",
    author: "Charlie",
    tags: ["Next.js", "Auth"],
    answerCount: 2,
  },
  // Generate many more entries for testing
  ...Array.from({ length: 50 }).map((_, i) => ({
    id: `${i + 4}`,
    title: `Sample Question ${i + 4}`,
    description: `This is a mock description for question number ${i + 4}.`,
    author: ["Alice", "Bob", "Charlie", "Dave"][i % 4],
    tags: ["TagA", "TagB", "TagC"].slice(0, (i % 3) + 1),
    answerCount: Math.floor(Math.random() * 10),
  })),
];
