import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScheduledEventsPage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        // Filter only accepted events for display
        const acceptedEvents = events.filter(event => event.isAccepted);
        setAllEvents(acceptedEvents);
    }, []);

    // Function to clear all event data from localStorage
    const handleClearData = () => {
        // Clear events from localStorage
        localStorage.removeItem('events');
        // Update the state to clear the displayed events
        setAllEvents([]);
        alert('All scheduled and user events have been cleared.');
    };

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
            <button onClick={handleClearData} style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px', cursor: 'pointer' }}>
                Clear
            </button>
            <br />
            <br />
            <button onClick={() => navigate('/admin/pending-events')}>Back</button>
        </div>
    );
};

export default ScheduledEventsPage;