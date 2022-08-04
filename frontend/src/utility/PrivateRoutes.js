import { useContext } from "react";
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const PrivateRoutes = ({ children, ...rest }) => {
    let { authTokens } = useContext(AuthContext);
    return !authTokens ? <Navigate to="/login" /> : children
}

export default PrivateRoutes;