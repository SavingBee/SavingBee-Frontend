import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import CartFixContainer from "@/components/cart/CartFixContainer";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div id="content-wrapper" className="w-full max-w-[1200px] mx-auto mt-[65px] pt-[50px] pb-[100px] flex-grow max-xl1023:mt-[61px] max-xl1240:px-[20px] max-xl1023:pt-[30px] max-xl1023:pb-[60px]">
                <Outlet />
            </div>
            <Footer />
            <CartFixContainer />
        </div>
    )
}
export default Layout;