import React, { useEffect, useState } from 'react';
import '../styles/profilePage.css';

interface ProfilePageProps {
    token: string | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ token }) => {
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        // Фиктивные данные, замените на запрос к вашему серверу
        const userInfoResponse = {
            id: 123,
            login: 'example_user',
            isAdmin: true,
            firstName: 'Иван',
            lastName: 'Иванов',
            email: 'ivan@example.com',
            accountCreated: '2021-10-01',
            lastLogin: '2021-10-05T10:30:00Z',
        };
        setUserInfo(userInfoResponse);
    }, [token]);

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h2>Профиль пользователя</h2>
                {userInfo ? (
                    <div>
                        <p><span className="info-label">ID:</span><span className="info-value">{userInfo.id}</span></p>
                        <p><span className="info-label">Логин:</span><span className="info-value">{userInfo.login}</span></p>
                        <p><span className="info-label">Администратор:</span><span className="info-value">{userInfo.isAdmin ? 'Да' : 'Нет'}</span></p>
                        <p><span className="info-label">Имя:</span><span className="info-value">{userInfo.firstName}</span></p>
                        <p><span className="info-label">Фамилия:</span><span className="info-value">{userInfo.lastName}</span></p>
                        <p><span className="info-label">Email:</span><span className="info-value">{userInfo.email}</span></p>
                        <p><span className="info-label">Дата создания аккаунта:</span><span className="info-value">{userInfo.accountCreated}</span></p>
                        <p><span className="info-label">Последний вход:</span><span className="info-value">{userInfo.lastLogin}</span></p>
                    </div>
                ) : (
                    <p>Загрузка информации о пользователе...</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
