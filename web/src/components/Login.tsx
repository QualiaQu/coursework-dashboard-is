import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/tokenInputPage.css';
import axios from 'axios';

interface LoginProps {
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [tokenInput, setTokenInput] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Устанавливаем токен в state и localStorage
        setToken(tokenInput);
        localStorage.setItem('token', tokenInput);

        // Формируем URL с параметром tokenInput
        const apiUrl = `http://localhost:8080/get_user?token=${tokenInput}`;

        // Выполняем GET-запрос с использованием Axios
        axios.get(apiUrl)
            .then(response => {
                console.log('User data:', response.data);

                // Перенаправляем на /profile?token=...
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
