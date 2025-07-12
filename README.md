# 📚 StackIt — A Minimal Q&A Forum Platform

---

## 👥 Team Members

- **Pritam Chakraborty**  
  📧 [pc2617@it.jgec.ac.in](mailto:pc2617@it.jgec.ac.in)

- **Saikat Bera**  
  📧 [berasaikat729@gmail.com](mailto:berasaikat729@gmail.com)

- **Subhadro Samaddar**  
  📧 [subhadrosamaddar@gmail.com](mailto:subhadrosamaddar@gmail.com)

- **Akash Saha**  
  📧 [saha.akash4701@gmail.com](mailto:saha.akash4701@gmail.com)

---

## 🎥 Project Demo

▶️ **Watch our full walkthrough video on Loom:**  
[https://www.loom.com/share/6fac7964ec30438497afb8709da8bbc3?sid=2eb5b929-ce2f-4cdb-9850-9e78b62133c1](https://www.loom.com/share/6fac7964ec30438497afb8709da8bbc3?sid=2eb5b929-ce2f-4cdb-9850-9e78b62133c1)

---

## 🚀 Overview

**StackIt** is a lightweight, modern question-and-answer platform inspired by Stack Overflow.  
It’s built for structured knowledge sharing, collaborative learning, and fostering a focused community around asking & answering questions.

Designed to be minimal and user-friendly, StackIt keeps the core interactions simple, fast, and visually appealing.

---

## ✨ Features

✅ **JWT Authentication** — Secure signup & login  
✅ **Ask & Browse Questions** — Create posts, view community queries  
✅ **Search & Filters** — Easily find topics by title & tags  
✅ **Pagination** — Navigate large question sets smoothly  
✅ **Sticky Navbar & Floating UI Elements** — Keeps primary actions always accessible  
✅ **Framer Motion Animations** — Subtle entrance & hover effects for modern feel  
✅ **Socket.IO Ready** — Prepared for future real-time features (notifications, live updates)

---

## 🛠 Tech Stack

| Layer      | Tools / Frameworks                    |
|------------|--------------------------------------|
| Frontend   | React, TypeScript, Tailwind CSS, Framer Motion |
| Backend    | Node.js, Express, Prisma ORM         |
| Database   | PostgreSQL                           |
| Auth       | JWT                                  |
| Realtime   | Socket.IO                            |

---

## ⚙️ Getting Started

Follow these steps to set up and run the project locally.

---

### 🚀 Clone the repository

```bash
git clone <your-repo-url>
cd StackIt
```

---

### 📦 Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs on: [http://localhost:5173](http://localhost:5173)

---

### 🖥 Backend

```bash
cd ../backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```
Runs on: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env` file in your `backend` with:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<dbname>"
JWT_SECRET="your-secret-key"
PORT=3000
```

Make sure your PostgreSQL server is up and running.

---

## 🌳 Project Structure

```
StackIt/
│
├── frontend/
│   └── src/pages, components, styles...
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── ...
│   └── prisma/schema.prisma
│
└── README.md
```

---

## 🚀 Future Roadmap

- 📝 Rich-text editor for questions & answers  
- 🔔 Real-time notifications using Socket.IO  
- 👤 User profiles & following system  
- 📊 Leaderboards / Most Answered / Trending tags  
- 🖼 Image uploads in posts & comments

---

## 🤝 License

This project is open-source under the MIT License.  
Feel free to fork, use, and contribute!

---

> Crafted with ❤️ by Pritam, Saikat, Subhadro & Akash — bringing collaborative knowledge sharing to life with StackIt.
