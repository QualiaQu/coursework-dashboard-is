import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TokenInputPage from './components/Login.tsx';
import ProfilePage from './components/Profile.tsx';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<TokenInputPage setToken={setToken} />} />
                <Route path="/profile" element={<ProfilePage token={token} />} />
            </Routes>
        </Router>
    );
};

export default App;
