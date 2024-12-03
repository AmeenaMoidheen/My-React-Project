import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PendingEventsPage = () => {
    const [pendingEvents, setPendingEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const userPendingEvents = events.filter(event => !event.isAccepted && !event.isRejected);
        setPendingEvents(userPendingEvents);
    }, []);

    const handleAccept = (event) => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const updatedEvents = events.map(e => 
            e.name === event.name && e.date === event.date ? { ...e, isAccepted: true, status: 'accepted' } : e
        );
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setPendingEvents(updatedEvents.filter(e => !e.isAccepted && !e.isRejected));

        // Notify the user page about the event acceptance
        const userEvents = JSON.parse(localStorage.getItem('events')) || [];
        const userEvent = userEvents.find(e => e.name === event.name && e.date === event.date);
        if (userEvent) {
            userEvent.status = 'accepted';
            localStorage.setItem('events', JSON.stringify(userEvents));
        }
    };

    const handleReject = (event) => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const updatedEvents = events.map(e => 
            e.name === event.name && e.date === event.date ? { ...e, isRejected: true, status: 'rejected' } : e
        );
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setPendingEvents(updatedEvents.filter(e => !e.isAccepted && !e.isRejected));

        // Notify the user page about the event rejection
        const userEvents = JSON.parse(localStorage.getItem('events')) || [];
        const userEvent = userEvents.find(e => e.name === event.name && e.date === event.date);
        if (userEvent) {
            userEvent.status = 'rejected';
            localStorage.setItem('events', JSON.stringify(userEvents));
        }
    };

    return (
        <div style={{ margin:'50px', padding: '20px',backgroundColor:'#f2f2f2',height:'900',paddingLeft:'150px' }}>
            <h1 style={{color:'#f31515b8'}}>Pending Events</h1>
            {pendingEvents.length > 0 ? (
                <ul>
                    {pendingEvents.map((event, idx) => (
                        <h3 style={{color:'#0f3e5e'}}><li key={idx} >
                            {event.name} - {event.date} at {event.location}<br/><br/>
                            <button onClick={() => handleAccept(event)} style={{backgroundColor:'green',color:'white',borderRadius:'20%',height:'25px',width:'60px'}}>Accept</button>
                            <button onClick={() => handleReject(event)} style={{backgroundColor:'red',color:'white',borderRadius:'20%',height:'25px',width:'60px',marginLeft:'20px'}}>Reject</button><br/><br/>
                        </li></h3>
                        
                    ))}
                </ul>
            ) : (
                <p>No pending events.</p>
            )}
            <button onClick={() => navigate('/admin/scheduled-events')} style={{color:'black',backgroundColor:'antiquewhite',borderRadius:'50%',height:'30px',width:'80px',marginLeft:'40px'}}>VIEW</button>
            <button onClick={() => navigate('/')} style={{color:'black',backgroundColor:'antiquewhite',borderRadius:'50%',height:'30px',width:'80px',marginLeft:'20px'}}>HOME</button>
        </div>
    );
};

export default PendingEventsPage;