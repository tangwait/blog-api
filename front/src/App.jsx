import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Drafts from "./pages/Drafts";
import { useFetchData } from "./hooks/useFetch";
import '../src/App.css'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {
        data: userInfo,
        error,
        loading,
    } = useFetchData("http://localhost:3000/user-info");

    useEffect(() => {
        if (loading) return; 

        if (userInfo && userInfo.user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        if (error) {
            console.error("Token validation error:", error.message);
            localStorage.removeItem("token");
            setIsAuthenticated(false);
        }
    }, [userInfo, error, loading]);

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route
                    path="/register"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/drafts"
                    element={isAuthenticated ? <Drafts /> : <Navigate to="/login" />}
                />
            </Routes>
        </>
    );
}

export default App;
