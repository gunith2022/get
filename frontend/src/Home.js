import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from './Navbar';
import ExampleCard from './card'; // Adjust the path accordingly
import ECard from './workshopcard'; // Adjust the path accordingly

function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3307/check-auth')
            .then(res => {
                if (res.data.status === "Success") {
                    setAuth(true);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => {
                console.error('Error checking auth:', err);
                setAuth(false);
                setMessage('An error occurred while checking authentication.');
            });
    }, []);

    return (
        <div>
            {auth ? (
                <>
                    <CustomNavbar />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <ExampleCard name="Workshop SB IEEE" sd="Technical" type="Technical" />
                            </div>
                            <div className="col-md-6">
                                <ECard name="Workshop SB IEEE" sd="Technical" type="Technical" />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>{message || 'You are not authenticated'}</p>
            )}
        </div>
    );
}

export default Home;





