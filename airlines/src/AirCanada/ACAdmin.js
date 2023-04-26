import React, { useState, useEffect } from "react";
import { Table, ButtonGroup, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { apiAC } from "../axios/api";
import { timeFormat } from "../utils/utils";

function ACAdmin() {
  const [flights, setFlights] = useState({});
  const navigate = useNavigate();

  const getFlights = async () => {
    try {
      const response = await apiAC.get(`/outsideApi/ourFlights`);
      setFlights(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (flight_number) => {
    apiAC
      .delete(`/outsideApi/delete?flight_number=${flight_number}`)
      .then((response) => {
        window.alert("Flight deleted successfully.");
        getFlights();
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  const onUpdate = async (id) => {
    navigate(`/update/${id}`);
  };

  const onAdd = async () => {
    navigate(`/ACAddFlight`);
  };

  useEffect(() => {
    getFlights();
  }, []);

  return (
    <div className="bg-light rounded shadow m-3">
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Flight Number</th>
            <th>Departure</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Duration</th>
            <th>Price</th>
            <th>
              <Button variant="primary" onClick={() => onAdd()}>
                Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {flights.length > 0 ? (
            flights.map((flight) => (
              <tr key={flight.flight_number} className="text-center">
                <td>{flight.flight_number}</td>
                <td>{flight.departure}</td>
                <td>{flight.destination}</td>
                <td>{timeFormat(flight.departure_time)}</td>
                <td>{flight.duration}</td>
                <td>{flight.price}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(flight.flight_number)}
                    >
                      Delete
                    </Button>
                    {/* <Button
                      variant="primary"
                      onClick={() => onUpdate(flight.flightNumber)}
                    >
                      Update
                    </Button> */}
                  </ButtonGroup>
                </td>
              </tr>
            ))
          ) : (
            <div className="text-center">No Data</div>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ACAdmin;
