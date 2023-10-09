import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/tokenInputPage.css';
import axios from 'axios';

interface LoginProps {
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [tokenInput, setTokenInput] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            navigate(`/profile?token=${storedToken}`);
        }
    }, [navigate]);

    const handleLogin = () => {
        const apiUrl = `http://localhost:8080/get_user?token=${tokenInput}`;

        axios.get(apiUrl)
            .then(response => {
                const userProfile = response.data.user;
                localStorage.setItem('userInfo', JSON.stringify(userProfile));
                setToken(tokenInput);
                localStorage.setItem('token', tokenInput);
                navigate(`/profile?token=${tokenInput}`);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    return (
        <div className="login-container">
            <h2 style={{ color: 'black' }}>Авторизация</h2>
            <input
                type="text"
                placeholder="Введите токен"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                style={{ color: 'black' }}
            />
            <button onClick={handleLogin} style={{ backgroundColor: 'white', color: 'black' }}>
                Войти
            </button>
        </div>
    );
};

export default Login;
