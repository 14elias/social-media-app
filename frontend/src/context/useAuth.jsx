import { createContext, useContext, useEffect, useState } from "react";
import { get_auth, login } from "../api/endpoints";
import { useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const check_auth = async () => {
        try {
            await get_auth();
            setAuth(true);
        } catch {
            setAuth(false);
        } finally {
            setLoading(false);
        }
    };

    const auth_login = async (username, password) => {
        try {
            const data = await login(username, password);
            if (data.success) {
                setAuth(true)
                const userdata={
                    "username":data.user.username,
                    "bio":data.user.bio,
                    "email":data.user.email,
                    "first_name":data.user.first_name,
                    "last_name":data.user.last_name,
                }
                localStorage.setItem('userdata',JSON.stringify(userdata))
                navigate(`/`); //  Corrected navigation
            } else {
                setErrorMessage("Invalid username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Something went wrong, please try again.");
        }
    };

    useEffect(() => {
        check_auth();
    }, []); //  Uses `location.pathname` instead of `window.location.pathname`

    return (
        <AuthContext.Provider value={{ auth, loading, auth_login, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

//  Corrected `useContext` usage
export const useAuth = () => useContext(AuthContext);
