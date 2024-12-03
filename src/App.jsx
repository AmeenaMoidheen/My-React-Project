import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserRegister from './components/UserRegister';
import UserPage from './components/UserPage';
import ScheduledEventsPage from './components/ScheduledEventsPage'; // Updated import
import MyEventsPage from './components/MyEventsPage';
import PendingEventsPage from './components/PendingEventsPage';
function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<UserRegister />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/admin/pending-events" element={<PendingEventsPage />} />
                <Route path="/admin/scheduled-events" element={<ScheduledEventsPage />} />
                <Route path="/my-events" element={<MyEventsPage />} />
            </Routes>
        </Router>
    );
}

export default App;