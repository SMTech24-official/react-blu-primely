// components/Layout.tsx

import { Outlet } from "react-router-dom"; // Renders the nested routes
import { Navbar } from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";
import { navItems } from "../routes/Routes";

const HomeLayout = () => {
    return (
        <div>
            <Navbar navitems={navItems} />
            <main>
                <Outlet /> {/* This will render the matched route's component */}
            </main>
            <Footer />
        </div>
    );
};

export default HomeLayout;
