import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        setAllEvents(events); // Show all events submitted by users
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Scheduled Events</h1>
            {allEvents.length > 0 ? (
                <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Event Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Date</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px', backgroundColor: '#f2f2f2' }}>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allEvents.map((event, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{event.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{event.date}</td>
                                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{event.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No scheduled events available.</p>
            )}
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
};

export default AdminPage;