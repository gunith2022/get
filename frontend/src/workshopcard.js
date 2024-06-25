import React from 'react';
import { Card, Button } from 'react-bootstrap';
import imageUrl from './IMG_8061.PNG';
import { Link } from 'react-router-dom';

const SquidCard = () => {
  // You can use placeholder images or provide actual image URLs


  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>SQUIDGAMES</Card.Title>
        <Card.Text>
          <strong>SD:</strong>IEEE
        </Card.Text>
        <Card.Text>
          <strong>Type:</strong>Technical
        </Card.Text>
        <Link to="/squidregister">
        <Button variant="primary">Register</Button>
      </Link>
      </Card.Body>
    </Card>
  );
};

export default SquidCard;