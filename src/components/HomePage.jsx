import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Hardcoded Admin credentia    ls
        if (username === 'admin' && password === 'admin@123') {
            navigate('/admin/pending-events');
        } else {
            // Check for registered user credentials from localStorage
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = storedUsers.find(user => user.username === username && user.password === password);
            
            console.log("Stored Users:", storedUsers); // Debugging log
            console.log("Attempting Login:", username, password); // Debugging log
            
            if (user) {
                // If login is successful, save the user data
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                navigate('/user');
            } else {
                // If login fails
                setError('Incorrect login details');
            }
        }
    };


    return (
        <div
          style={{textAlign:'center',
            height:'350px',
            backgroundImage:'url("https://c0.wallpaperflare.com/preview/387/64/19/background-blur-blurred-bright.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            padding:"170px"
          }}
        >
         <h1 style={{fontSize:'35px',fontFamily:'algerian',fontWeight:'0px',color:'brown',paddingRight:"67px"}}>Event Management</h1>
    <fieldset style={{width:'1100px',borderWidth:'5px',height:'250px'}}>   <legend> <h1 style={{fontFamily:'algerian',color:'brown',fontSize:'20px' }}>WELCOME</h1></legend>  
            <h5 style={{fontFamily:'Times new roman',color:"black"}}><i>A team is not a group of people that work together...A team is a group of people that trust each other!!!</i></h5>
            <label style={{fontFamily:'consolas'}}>Username </label>

            <input style={{borderRadius:'50px',width:'190px',height:'20px'}}
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            /><br/>
            <br/>
            <label  style={{fontFamily:'consolas'}}>Password </label>
            <input style={{borderRadius:'50px',width:'190px',height:'20px'}}
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            /><br/><br/>
            <button onClick={handleLogin}  style={{color:'black',backgroundColor:'antiquewhite',borderRadius:'50%',height:'30px',width:'70px'}}>Submit</button>
            <button onClick={() => navigate('/register')} style={{color:'black',backgroundColor:'antiquewhite',borderRadius:'50%',height:'30px',width:'80px'}}>Register</button>
            </fieldset>  

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default HomePage;