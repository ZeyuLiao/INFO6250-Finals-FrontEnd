import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import FlightList from "./ListOfFlights";
import { api } from "../axios/api";

const airports = [
  { code: "PEK", name: "Beijing Capital International Airport" },
  { code: "PVG", name: "Shanghai Pudong International Airport" },
  { code: "HND", name: "Tokyo Haneda International Airport" },
  { code: "YYZ", name: "Toronto Pearson International Airport" },
  { code: "JFK", name: "New York JFK" },
  { code: "BOS", name: "Boston Logan International Airport" },
];

function MainPage() {
  const [flights, setFlights] = useState([]);
  const handleSearch = async () => {
    try {
      const departure = document.getElementById("from").value;
      const destination = document.getElementById("destination").value;
      const departure_time = document.getElementById("date").value;
      // Send POST request with form data
      const response = await api.post("/flights", {
        departure,
        destination,
        departure_time,
      });

      // Update flights state with response data
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const verifyNotNull = () => {
    const from = document.getElementById("from").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const isFormValid = from && destination && date && from !== destination;
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
      searchButton.disabled = !isFormValid;
    }
  };

  useEffect(() => {
    verifyNotNull();
  }, []);

  return (
    <main className="bg-light rounded shadow p-3 m-5">
      <div className="bg-light rounded shadow p-3 m-5">
        <h1 className="text-center">Flight Search</h1>
        <Form className="mt-5">
          <Row className="justify-content-center align-items-end">
            <Col sm={3}>
              <Form.Label>From</Form.Label>
              <Form.Select id="from" onChange={verifyNotNull} defaultValue={""}>
                <option disabled value="">
                  -- Select an option --
                </option>
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={3}>
              <Form.Label>Destination</Form.Label>
              <Form.Select
                id="destination"
                onChange={verifyNotNull}
                defaultValue={""}
              >
                <option disabled value="">
                  -- Select an option --
                </option>
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={3}>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                id="date"
                onKeyDown={(e) => e.preventDefault()}
                onChange={verifyNotNull}
              />
            </Col>
            <Col sm={2}>
              <Button id="searchButton" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <FlightList flights={flights} />
    </main>
  );
}

export default MainPage;
