import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAirlineName, timeFormat } from "../utils/utils";

const FlightList = ({ flights }) => {
  const [sortType, setSortType] = useState(""); // 维护当前排序方式的状态

  const sortedFlights = flights.slice().sort((a, b) => {
    // 根据当前排序方式对航班数组排序
    switch (sortType) {
      case "price":
        return a.price - b.price;
      case "duration":
        return a.duration - b.duration;
      default:
        return 0;
    }
  });

  const handleSortByPrice = () => {
    // 更新排序方式为按价格排序
    setSortType("price");
  };

  const handleSortByDuration = () => {
    // 更新排序方式为按航班时长排序
    setSortType("duration");
  };

  return (
    <div className="bg-light rounded shadow p-3 m-5">
      <div className="m-2 d-flex flex-row container-fluid justify-content-end">
        <button
          className="mx-2 btn btn-secondary"
          onClick={handleSortByDuration}
        >
          Sort by Duration
        </button>
        <button className="mx-2 btn btn-secondary" onClick={handleSortByPrice}>
          Sort by Price
        </button>
      </div>
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
          {sortedFlights.length > 0 ? (
            sortedFlights.map((flight) => (
              <Link
                to="/buyTicket"
                onClick={() =>
                  sessionStorage.setItem("flight", JSON.stringify(flight))
                }
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
            <div className="text-center">No Data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightList;
