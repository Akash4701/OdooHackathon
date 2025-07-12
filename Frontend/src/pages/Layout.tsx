import { Outlet } from "react-router-dom";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import { useState } from "react";

const Layout = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar search={search} setSearch={setSearch} />
      <main className="flex-grow px-6 pt-8">
        <Outlet context={{ search, setSearch }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
