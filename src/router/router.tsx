import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Layout from "../layout/Layout";
import DepositPage from "@/pages/product/DepositPage";
import SavingPage from "@/pages/product/SavingPage";
import SearchEntryPage from "@/pages/SearchEntryPage";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/saving" element={<SavingPage />} />
        <Route path="/" element={<SearchEntryPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
