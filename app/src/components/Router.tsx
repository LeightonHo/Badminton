import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import PrivacyPolicy from "./PrivacyPolicy";
import AuthHandler from "../helpers/AuthHandler";
import Login from "../features/login/Login";

const Router = () => {
    const auth = AuthHandler();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;