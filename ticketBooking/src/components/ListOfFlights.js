import React from "react";
import { Link } from "react-router-dom";
import { getAirlineName,timeFormat } from "../utils/utils";


const FlightList = ({ flights }) => {
  return (
    <div className="bg-light rounded shadow p-3 m-5">
      <div className="list-group">
        <div className="d-flex flex-row container-fluid align-items-end">
          <h5 className="col-2">Airline</h5>
          <h5 className="col-2">Flight Number</h5>
          <h5 className="col-2">From - To</h5>
          <h5 className="col-2">Departure Time</h5>
          <h5 className="col-2">Duration /hr</h5>
          <h5 className="col-2">Price /CA$</h5>s
        </div>
        <div className=" w-100">
          {flights.length > 0 ? (
            flights.map((flight) => (
              <Link
              to='/buyTicket'
              onClick={() => sessionStorage.setItem('flight', JSON.stringify(flight))}
                className="list-group-item list-group-item-action"
                aria-current="true"
              >
                <div
                  key={flight.flight_number}
                  className="d-flex flex-row container-fluid align-items-end"
                >
                  <div className="col-2">
                    {flight.proxy_flight_number && (
                      <small className="text-secondary">
                        Operated by:{" "}
                        {getAirlineName(flight.proxy_flight_number)}
                      </small>
                    )}
                    <h5 className="text-primary">
                      {getAirlineName(flight.flight_number)}
                    </h5>
                  </div>
                  <h5 className="col-2">{flight.flight_number}</h5>
                  <h5 className="col-2">
                    {flight.departure} - {flight.destination}
                  </h5>
                  <h5 className="col-2">{timeFormat(flight.departure_time)}</h5>
                  <h5 className="col-2">{flight.duration}</h5>
                  <h5 className="col-2">{flight.price}</h5>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center">
              No Data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightList;
