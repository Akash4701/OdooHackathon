import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";



// Check if the current route is `/cart`
const Layout = () => {
    return (
        <div>
            <Navbar />

            <main className="flex-grow ">
                <Outlet />
            </main>
            <Footer />
        </div >
    )
};

export default Layout;