import { Link } from "react-router-dom";

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        setIsAuthenticated(false);
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {isAuthenticated ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}
