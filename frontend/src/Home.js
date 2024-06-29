// Home.js

// import React from 'react';
import React from 'react';
import CustomNavbar from './Navbar';
import ExampleCard from './card';
import SquidCard from './workshopcard';
import { Container, Row, Col } from 'react-bootstrap';

function Home() {
    return (
        <>
            <CustomNavbar />
            <Container className="mt-4">
                <Row>
                    
                    <Col md={6}>
                        <SquidCard />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;
