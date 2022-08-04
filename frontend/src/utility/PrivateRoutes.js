import { Route, Navigate } from 'react-router-dom'

const PrivateRoutes = ({ children, ...rest }) => {
    let authenticated = false
    return !authenticated ? <Navigate to="/login" /> : children
}

export default PrivateRoutes;