import { useContext } from "react";
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const LoggedOutRoutes = ({ children, ...rest }) => {
    let { authTokens } = useContext(AuthContext);
    return authTokens ? <Navigate to="/account" /> : children
}

export default LoggedOutRoutes;