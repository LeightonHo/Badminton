import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import PrivacyPolicy from "./PrivacyPolicy";
import AuthHandler from "../helpers/AuthHandler";
import Login from "../features/login/Login";
import { NavLink } from "react-router-dom";

const Router = () => {
    const auth = AuthHandler();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/dashboard/*" element={auth.isLoggedIn() ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={auth.isLoggedIn() ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/*" element={auth.isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;