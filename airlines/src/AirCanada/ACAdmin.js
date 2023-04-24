import React, { useState, useEffect } from "react";
import { Table, ButtonGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiAC } from "../axios/api";

function ACAdmin() {
  const [flights, setFlights] = useState({});
  const navigate = useNavigate();

  const onDelete = async (id) => {
    apiAC
      .delete(`/api/items/${id}`)
      .then((response) => {
        // 处理删除成功后的逻辑
      })
      .catch((error) => {
        // 处理删除失败后的逻辑
      });
  };

  const onUpdate = async (id) => {
    navigate(`AC/update/${id}`);
  };

  const onAdd = async () => {
    navigate(`AC/add`);
    };

  useEffect(() => {
    const getFlights = async () => {
      try {
        const response = await apiAC.get(
          `/outsideApi/ourFlights`
        );
        setFlights(response.data);
      } catch (error) {
        console.log(error);
      }
    };
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
            <th><Button
                      variant="primary"
                      onClick={() => onAdd()}
                    >
                      Add
                    </Button></th>
          </tr>
        </thead>
        <tbody>
          {flights.length > 0 ? (
            flights.map((flight) => (
              <tr key={flight.flightNumber}>
                <td>{flight.flightNumber}</td>
                <td>{flight.departure}</td>
                <td>{flight.destination}</td>
                <td>{flight.departureTime}</td>
                <td>{flight.duration}</td>
                <td>{flight.price}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(flight.flightNumber)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => onUpdate(flight.flightNumber)}
                    >
                      Update
                    </Button>
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
