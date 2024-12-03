import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyEventsPage = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [rejectedEvents, setRejectedEvents] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user) {
            navigate('/');
        } else {
            setLoggedInUser(user);
            const events = JSON.parse(localStorage.getItem('events')) || [];
            const userEvents = events.filter(event => event.username === user.username);
            setMyEvents(userEvents.filter(event => event.isAccepted));
            setRejectedEvents(userEvents.filter(event => event.isRejected));
        }
    }, [navigate]);

    // Function to handle the deletion of rejected events
    const handleDelete = (eventToDelete) => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const updatedEvents = events.filter(event => 
            !(event.username === loggedInUser.username && event.name === eventToDelete.name && event.date === eventToDelete.date)
        );
        localStorage.setItem('events', JSON.stringify(updatedEvents));

        // Update the rejected events state
        setRejectedEvents(updatedEvents.filter(event => event.username === loggedInUser.username && event.isRejected));
    };

    return (
        <div style={{backgroundColor:'#b9c87f',height:'400px',margin:'100px',padding:'50px',paddingLeft:'600px'}}>
            <h1 style={{fontFamily:'cursive',color:'#c84e15' }}>My Events</h1>
            <h4>Accepted Events</h4>
            <ul>
                {myEvents.length > 0 ? (
                    myEvents.map((event, idx) => (
                        <li key={idx}>
                            {event.name} - {event.date} at {event.location}
                        </li>
                    ))
                ) : (
                    <p>You have no accepted events.</p>
                )}
            </ul>
            
            <h4>Rejected Events</h4>
            <ul>
                {rejectedEvents.length > 0 ? (
                    rejectedEvents.map((event, idx) => (
                        <li key={idx}>
                            {event.name} - {event.date} at {event.location}
                            <button 
                                onClick={() => handleDelete(event)} 
                                style={{ marginLeft: '10px', color: 'white', backgroundColor: 'red' }}
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>You have no rejected events.</p>
                )}
            </ul>
            
            <button 
                onClick={() => navigate('/user')} 
                style={{
                    fontFamily: 'consolas',
                    textAlign: "center",
                    color: 'black',
                    backgroundColor: 'rgb(219, 213, 216)',
                    borderRadius: '30%',
                    height: '30px',
                    width: '90px'
                }}
            >
                ADD EVENTS
            </button>
        </div>
    );
};

export default MyEventsPage;