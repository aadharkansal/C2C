import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data.token);
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate("./");
        } else {
            alert('Something went wrong!');
        }
    }


    let logoutUser = () => {
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    let contextData = {
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}