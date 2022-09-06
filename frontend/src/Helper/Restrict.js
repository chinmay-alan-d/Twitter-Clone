import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
// import { useAuth } from "./AuthContext"

export const Restrict = ({children}) =>{
    const auth = useAuth();
    if(!auth.username){
        return <Navigate to="/login"/>
    }
    return children
}