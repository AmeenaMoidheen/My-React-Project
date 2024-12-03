import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        mobile: '',
        password: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the username already exists
        const isUserExist = existingUsers.some(existingUser => existingUser.username === user.username);

        if (isUserExist) {
            alert("Username already exists!");
        } else if (user.mobile.length !== 10) {
            // Validate mobile number length
            setErrorMessage("Mobile number must be 10 digits long.");
        } else {
            // Store the new user in localStorage
            existingUsers.push(user);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            console.log("Registered Users:", existingUsers); // Debugging log
            
            // Show success message
            setSuccessMessage('Registered successfully!');
            setUser({ username: '', email: '', mobile: '', password: '' }); // Reset form fields
            
            // Hide success message after 2 seconds
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/'); // Redirect to home after registration
            }, 2000);
        }
    };

    // Check if all fields are filled to enable the submit button
    const isFormValid = () => {
        return user.username && user.email && user.mobile && user.password && user.mobile.length === 10;
    };


    return (
        <div style={{textAlign:'center',
            height:'700px',
            backgroundImage:'url("https://png.pngtree.com/thumb_back/fh260/background/20220112/pngtree-glass-morphim-effect-registration-banner-with-gradient-blue-image_934693.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            
          }}>
            
            <h4 style={{fontFamily:'Times new roman',color:"blue",paddingTop:'220px'}}><i>Life is an event...Make it memorable</i></h4>
            
            <table align="center" >
                <tr>
                    <td><label style={{fontFamily:'consolas'}}>Username</label></td>
                    <td><input style={{borderRadius:'50px',width:'190px',height:'20px'}}
                        type="text" 
                        placeholder="Username" 
                        value={user.username} 
                        onChange={(e) => setUser({ ...user, username: e.target.value })} 
                        required 
                        />
                    </td>
                </tr>
                <br/>

                <tr>
                    <td><label style={{fontFamily:'consolas'}}>Email</label></td>
                    <td><input style={{borderRadius:'50px',width:'190px',height:'20px'}}
                        type="email" 
                        placeholder="Email" 
                        value={user.email} 
                        onChange={(e) => setUser({ ...user, email: e.target.value })} 
                        required 
                        />
                    </td>
                </tr>    
                <br/>

                <tr>
                    <td><label style={{fontFamily:'consolas'}}>Phone No</label></td>
                    <td><input style={{borderRadius:'50px',width:'190px',height:'20px'}}
                        type="number" 
                        placeholder="Enter No" 
                        value={user.mobile} 
                        onChange={(e) => setUser({ ...user, mobile: e.target.value.slice(0, 10) })} 
                        maxLength="10" 
                        required 
                        />
                    </td>
                </tr>        
                <br/>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <tr>
                    <td><label style={{fontFamily:'consolas'}}>Password</label></td>
                    <td><input style={{borderRadius:'50px',width:'190px',height:'20px'}}
                        type="password" 
                        placeholder="Password" 
                        value={user.password} 
                        onChange={(e) => setUser({ ...user, password: e.target.value })} 
                        required 
                        />
                    </td>
                </tr>
                <br/>
                
            </table>

            <button onClick={handleSubmit} disabled={!isFormValid()}  style={{color:'black',backgroundColor:'antiquewhite',borderRadius:'50%',height:'30px',width:'70px'}}>Register</button> {/* Disable button based on form validity */}
            <button onClick={() => navigate('/')} style={{color:'black',backgroundColor:'antiquewhite',borderRadius:'50%',height:'30px',width:'80px'}}>Home</button>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Success message */}
        </div>
    );
};

export default UserRegister;