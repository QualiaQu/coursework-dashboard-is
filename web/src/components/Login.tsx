import React, { useState } from 'react';
import '../styles/tokenInputPage.css';

interface LoginProps {
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [tokenInput, setTokenInput] = useState<string>('');

    const handleLogin = () => {
        setToken(tokenInput);
        localStorage.setItem('token', tokenInput);
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
