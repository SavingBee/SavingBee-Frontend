import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Layout from "../layout/Layout";
import DepositPage from "@/pages/product/DepositPage";
import SavingPage from "@/pages/product/SavingsPage";
import ProductDetail from "@/pages/product/ProductDetail";
import SearchEntryPage from "@/pages/SearchEntryPage";
import ProductComparePage from "@/pages/ProductComparePage";
import LoginLayout from "@/layout/LoginLayout";
import FindId from "@/pages/FindId";
import FindPassword from "@/pages/FindPassword";
// import SearchBox from "@/components/search/SearchBox";
import Mypage from "@/pages/Mypage";
import FindIdStep2 from "@/components/find/id/step/FindIdStep2";
import FindPasswordStep2 from "@/components/find/password/step/FindPasswordStep2";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/savings" element={<SavingPage />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/" element={<SearchEntryPage />} />
        <Route path="/product/compare" element={<ProductComparePage />} />
        {/* <Route path="/search-test" element={<SearchBox />} /> */}
        <Route path="/mypage" element={<Mypage />} />
      </Route>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find_id" element={<FindId />} />
        <Route path="/find/password" element={<FindPassword />} />
        <Route path="/find/id/result" element={<FindIdStep2 />} />
        <Route path="/find/password/result" element={<FindPasswordStep2 />} />
      </Route>
    </Routes>
  );
};

export default Router;
