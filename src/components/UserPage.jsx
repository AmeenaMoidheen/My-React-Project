import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({ name: '', date: '', location: '' });
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user) {
            navigate('/');
        } else {
            setLoggedInUser(user);
        }
    }, [navigate]);

    const handleSubmit = () => {
        const allEvents = JSON.parse(localStorage.getItem('events')) || [];
        const userEvent = { ...event, username: loggedInUser.username };
        allEvents.push(userEvent);
        localStorage.setItem('events', JSON.stringify(allEvents));
        setEvent({ name: '', date: '', location: '' });
    };

    if (!loggedInUser) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{textAlign:'center',
            height:'700px',
            backgroundImage:'url("https://w0.peakpx.com/wallpaper/535/76/HD-wallpaper-blur-abstract-blur-abstract-deviantart-thumbnail.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          
          }}
          >
            
            <h1 style={{fontFamily:'cursive',color:'#bea8ae' }}>Event Description <br/><br/> {/* Update the navigation */}</h1> 

                <table  align="center">
            <tr>
                <td><label style={{fontFamily:'consolas'}}>Event Name </label></td>
                <td><input style={{borderRadius:'50px',width:'190px',height:'20px'}}
                    type="text"
                    placeholder="Event Name"
                    value={event.name}
                    onChange={(e) => setEvent({ ...event, name: e.target.value })}
                    />
                </td>
            </tr>
            <br/>

            <tr>
                <td><label style={{fontFamily:'consolas'}}>Location</label></td>
                <td><input style={{borderRadius:'50px',width:'190px',height:'20px'}}
                    type="text"
                    placeholder="Location"
                    value={event.location}
                    onChange={(e) => setEvent({ ...event, location: e.target.value })}
                    />
                </td>
            </tr>
            <br/>

            <tr>
                <td><label style={{fontFamily:'consolas'}}>Date </label></td>
                <td><input style={{borderRadius:'50px',width:'190px',height:'20px'}}
                    type="date"
                    value={event.date}
                    onChange={(e) => setEvent({ ...event, date: e.target.value })}
                    />
                </td>
            </tr>
            <br/>

            </table>

            <button onClick={handleSubmit}  style={{fontFamily:'consolas',textAlign:"center",color:'black',backgroundColor:'antiquewhite',borderRadius:'50%',height:'30px',width:'50px'}}>Add</button>
            <button onClick={() => navigate('/')} style={{fontFamily:'consolas',textAlign:"center",color:'black',backgroundColor:'antiquewhite',borderRadius:'50%',height:'30px',width:'50px'}}>Home</button>
            <br/><br/>

            <button onClick={() => navigate('/my-events')} style={{fontFamily:'consolas',textAlign:"center",color:'black',backgroundColor:'rgb(113, 101, 106) ',borderRadius:'30%',height:'30px',width:'90px'}}>
                My Events</button>

        </div>
    );
};

export default UserPage;