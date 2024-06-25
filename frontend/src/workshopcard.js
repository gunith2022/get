import React from 'react';
import { Card, Button } from 'react-bootstrap';
import imageUrl from './IMG_8061.PNG';
const ECard = ({ name, sd, type }) => {
  // You can use placeholder images or provide actual image URLs


  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <strong>SD:</strong> {sd}
        </Card.Text>
        <Card.Text>
          <strong>Type:</strong> {type}
        </Card.Text>
        <Button variant="primary">Register</Button>
      </Card.Body>
    </Card>
  );
};

export default ECard;