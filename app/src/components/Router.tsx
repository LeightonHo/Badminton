import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
                {["/lobby", "/games", "/scoreboard", "/profile"].map((path) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            auth.isLoggedIn() ? <Home /> : <Navigate to="/login" />
                        }
                />
                ))}
                <Route
                    path="*"
                    element={
                        auth.isLoggedIn() ? <Navigate to="/lobby" /> : <Navigate to="/login" />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;