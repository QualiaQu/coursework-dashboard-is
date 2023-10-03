import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/tokenInputPage.css';

interface LoginProps {
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [tokenInput, setTokenInput] = useState<string>('');
    const navigate = useNavigate(); // Использование useNavigate для перенаправления

    const handleLogin = () => {
        setToken(tokenInput);
        localStorage.setItem('token', tokenInput);

        const apiUrl = 'http://localhost:8080/get_user';

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenInput}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('User data:', data);

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
