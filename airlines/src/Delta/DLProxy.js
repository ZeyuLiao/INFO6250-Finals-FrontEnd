import React, { useState, useEffect } from "react";
import { Table, ButtonGroup, Button } from "react-bootstrap";
import { apiDL } from "../axios/api";
import { timeFormat } from "../utils/utils";

function DLProxy() {
  const [flights, setFlights] = useState({});

  const getFlights = async () => {
    try {
      const response = await apiDL.get(
        `/outsideApi/theirFlights?proxy_company=DL`
      );
      setFlights(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (proxy_flight_number) => {
    apiDL
      .delete(`/outsideApi/deleteProxy?proxy_flight_number=${proxy_flight_number}`)
      .then((response) => {
        // 处理删除成功后的逻辑
        window.alert("Delete Success");
        getFlights();
      })
      .catch((error) => {
        // 处理删除失败后的逻辑
      });
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
            <th>Operated By</th>
            <th>
              Action
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
                <td>{flight.proxy_flight_number}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(flight.proxy_flight_number)}
                    >
                      Delete
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

export default DLProxy;
