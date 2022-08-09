import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
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
            navigate("/account");
            window.location.reload();
        } else {
            alert('INVALID CREDENTIALS!');
        }
    }

    let registerUser = async (e) => {
        e.preventDefault();
        if (e.target.password.value !== e.target.confirmPassword.value) {
            alert("Passwords donot match");
            return;
        }
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value, 'password': e.target.password.value,
                'first_name': e.target.firstName.value, 'last_name': e.target.lastName.value
            })
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data.token);
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate("/account");
            window.location.reload();
        } else {
            alert('INTERNAL SERVER ERROR');
        }
    };

    let logoutUser = () => {
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    let contextData = {
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser
    }

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}