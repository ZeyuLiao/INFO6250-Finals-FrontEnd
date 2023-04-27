import React, { useState } from "react";
import { Table, ButtonGroup, Button } from "react-bootstrap";
import { apiAC, apiCA, apiDL, apiEK, apiLF } from "../axios/api";
import { timeFormat } from "../utils/utils";

function CAAddProxy() {
  const [flights, setFlights] = useState({});

  const doProxy = async (flight) => {
    let generatedFlighNumber = window.prompt('Please Give A Flight Number', '');
    if(generatedFlighNumber.length!==4){
      alert('Invalid Flight Number');
      handleClick(flight.flight_number.substring(0,2));
      return;
    }
    generatedFlighNumber = "CA" + generatedFlighNumber;

    let discountPrice = window.prompt('How much to reduce proxy price?', '');

    try {
      apiCA
        .post(`/outsideApi/addFlight`, {
          flight_number: generatedFlighNumber,
          departure: flight.departure,
          destination: flight.destination,
          departure_time: flight.departure_time,
          duration: flight.duration,
          price: flight.price - discountPrice,
          proxy_flight_number: flight.flight_number,
          availableseats: 0,
          passengers: 0
        })
        .then((response) => {
          // 处理成功后的逻辑
          alert('Proxy Success');
          handleClick(flight.flight_number.substring(0,2));
        })
        .catch((error) => {
          // 处理失败后的逻辑
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (airline) => {
    try {
      let response;
      if(airline==='AC'){
         response = await apiAC.get(
                `/outsideApi/availableToProxy?proxy_company=${airline}`
              );
      }
      else if(airline==='CA'){
        response = await apiCA.get(
          `/outsideApi/availableToProxy?proxy_company=${airline}`
        );
      }
      else if(airline==='EK'){
        response = await apiEK.get(
          `/outsideApi/availableToProxy?proxy_company=${airline}`
        );
      }
      else if(airline==='LF'){
        response = await apiLF.get(
          `/outsideApi/availableToProxy?proxy_company=${airline}`
        );
      }
      else if(airline==='DL'){
        response = await apiDL.get(
          `/outsideApi/availableToProxy?proxy_company=${airline}`
        );
      }
      setFlights(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-light rounded shadow m-3">
      <ButtonGroup className="pb-2">
        <Button variant="secondary" onClick={() => handleClick("AC")}>
          AirCanada
        </Button>
        <Button variant="secondary" onClick={() => handleClick("EK")}>
          Emirates
        </Button>
        <Button variant="secondary" onClick={() => handleClick("LF")}>
          Lufthansa
        </Button>
        <Button variant="secondary" onClick={() => handleClick("DL")}>
          Delta Air Lines
        </Button>
      </ButtonGroup>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Flight Number</th>
            <th>Departure</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Action</th>
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
                  <Button variant="primary" onClick={() => doProxy(flight)}>
                    Proxy
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">No Data</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default CAAddProxy;
