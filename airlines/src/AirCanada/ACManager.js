import React from 'react';
import { Table, ButtonGroup, Button } from 'react-bootstrap';



function FlightList({ flights, onDelete, onUpdate }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Flight Number</th>
          <th>Departure</th>
          <th>Destination</th>
          <th>Departure Time</th>
          <th>Duration</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <tr key={flight.flightNumber}>
            <td>{flight.flightNumber}</td>
            <td>{flight.departure}</td>
            <td>{flight.destination}</td>
            <td>{flight.departureTime}</td>
            <td>{flight.duration}</td>
            <td>{flight.price}</td>
            <td>
              <ButtonGroup>
                <Button variant="danger" onClick={() => onDelete(flight.flightNumber)}>Delete</Button>
                <Button variant="primary" onClick={() => onUpdate(flight.flightNumber)}>Update</Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default FlightList;
