import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div id="content-wrapper" className="w-full max-w-[1200px] mx-auto mt-[65px] pt-[50px] pb-[100px] flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
export default Layout;