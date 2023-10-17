import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/profilePage.css';

interface UserProfile {
    id: number;
    login: string;
    admin: boolean;
    firstname: string;
    lastname: string;
    mail: string;
    created_on: string;
    last_login_on: string;
}

interface ProfilePageProps {
    token: string | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ token }) => {
    const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const tokenToUse = token || storedToken;

        if (tokenToUse) {
            const apiUrl = `http://localhost:8080/get_user?token=${tokenToUse}`;
            axios
                .get(apiUrl)
                .then(response => {
                    const userProfile = response.data.user;
                    setUserInfo(userProfile);
                    localStorage.setItem('userInfo', JSON.stringify(userProfile));
                })
                .catch(error => {
                    console.error('Ошибка при получении данных пользователя:', error);
                });
        } else {
            navigate('/'); // Перенаправляем на страницу авторизации, если нет токена
        }
    }, [token, navigate]);

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h2>Профиль пользователя</h2>
                {userInfo ? (
                    <div>
                        <p><span className="info-label">ID:</span><span className="info-value">{userInfo.id}</span></p>
                        <p><span className="info-label">Логин:</span><span className="info-value">{userInfo.login}</span></p>
                        <p><span className="info-label">Администратор:</span><span className="info-value">{userInfo.admin ? 'Да' : 'Нет'}</span></p>
                        <p><span className="info-label">Имя:</span><span className="info-value">{userInfo.firstname}</span></p>
                        <p><span className="info-label">Фамилия:</span><span className="info-value">{userInfo.lastname}</span></p>
                        <p><span className="info-label">Email:</span><span className="info-value">{userInfo.mail}</span></p>
                        <p><span className="info-label">Дата создания аккаунта:</span><span className="info-value">{userInfo.created_on}</span></p>
                        <p><span className="info-label">Последний вход:</span><span className="info-value">{userInfo.last_login_on}</span></p>
                    </div>
                ) : null}
                <button onClick={handleLogout} className="logout-button">Выход</button>
            </div>
        </div>
    );
};

export default ProfilePage;
