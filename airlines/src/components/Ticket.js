import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getAirlineName,timeFormat } from "../utils/utils";
import {apiWithToken} from "../axios/api";

function Ticket() {
  const flight = JSON.parse(sessionStorage.getItem('flight'));
  console.log(flight);
  const { loginUsername } = sessionStorage.getItem("username");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await apiWithToken.get(
          `/user/profile?username=${sessionStorage.getItem("username")}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, [loginUsername]);

  function handleButtonClick() {
    
    apiWithToken.post('/tickets', {
      username : user.username,
      flight_number : flight.flight_number,
      departure : flight.departure,
      destination : flight.destination,
      departure_time : flight.departure_time,
      duration : flight.duration,
      price : flight.price,
      airline : flight.airline,
      status : "confirmed"
    })
      .then(response => {
        console.log('发送请求成功：', response);
        navigate('/redirect');
      })
      .catch(error => {
        console.error('发送请求失败：', error);
      });
      
  }

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <Card className="w-50 p-3">
        <h3 className="text-center mb-4">Purchase Confirmation</h3>
        <Row className="mb-3">
          <Col>
            <p>Airline: {getAirlineName(flight.flight_number)}</p>
            <p>Flight Number: {flight.flight_number}</p>
            <p>From: {flight.departure}</p>
            <p>To: {flight.destination}</p>
            <p>Departure Time: {timeFormat(flight.departure_time)}</p>
            <p>Duration: {flight.duration}</p>
            <p>Price: {flight.price}</p>
          </Col>
          <Col>
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </Col>
        </Row>
        <Button variant="primary" size="lg" block
        onClick={handleButtonClick}
        >
          Confirm Purchase
        </Button>
      </Card>
    </Container>
  );
}

export default Ticket;