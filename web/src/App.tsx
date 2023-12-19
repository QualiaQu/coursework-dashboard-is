import React, { useState } from 'react';
import './styles/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TokenInputPage from './components/Login.tsx';
import ProfilePage from './components/Profile.tsx';
// import DemoPage from '/components/mytable/tablepage.tsx';
import Dashboard from "./components/Dashboard.tsx";

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    // localStorage.clear() // ba7370ee222dc3fbab4b745b295ccae71cad12d0
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TokenInputPage setToken={setToken} />} />
                <Route path="/profile" element={<ProfilePage token={token} />} />
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
        </Router>
    );
};

export default App;
