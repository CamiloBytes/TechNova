import { Route, Routes } from "react-router-dom";
import { NotFound } from "../page/NotFound";
import { Home } from "../page/Home";
import { LoginFrom } from "../components/LoginFrom";
import { RegisterFrom } from "../components/RegisterFrom";
import { Dashboard } from "../page/Dashboard";
import PublicRoute from "../guard/PublicRouter";
import PrivateRouter from "../guard/PrivateRouter";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={
                <PublicRoute>
                    <LoginFrom />
                </PublicRoute>
            } />

            <Route path="/register" element={
                <PublicRoute>
                    <RegisterFrom />
                </PublicRoute>
            } />

            <Route path="/dashboard" element={
                <PrivateRouter>
                    <Dashboard />
                </PrivateRouter>
            } />

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
