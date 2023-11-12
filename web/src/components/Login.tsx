import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/index.css';
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
            navigate(`/dashboard`);
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
                navigate(`/dashboard`);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="m-0 flex justify-center items-center h-screen bg-white">
            <div className="login-container">
                <h2 style={{ color: 'black' }}>Авторизация</h2>
                <input
                    type="text"
                    placeholder="Введите токен"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{ color: 'black' }}
                />
                <button id="button-login" onClick={handleLogin}  >
                    Войти
                </button>
            </div>
        </div>

    );
};

export default Login;
