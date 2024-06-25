// Home.js

import React from 'react';
import CustomNavbar from './Navbar';
import ExampleCard from './card';
import SquidCard from './workshopcard';

function Home() {
    return (
        <>
            <CustomNavbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <ExampleCard name="Workshop SB IEEE" sd="Technical" type="Technical" />
                    </div>
                    <div className="col-md-6">
                        <SquidCard />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;






