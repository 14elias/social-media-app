import { Navigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
function ProtectedRoute({children}){
    const {auth,loading}=useAuth();

    if(loading) {
        return <p>......</p>;
    }
    else if (auth) {
        return  children;

    } else {
        return <Navigate to='/login' replace/>
    }
}

export default ProtectedRoute