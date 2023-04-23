import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { apiWithToken } from "../axios/api";
import { timeFormat, getAirlineName } from "../utils/utils";

function OrdersTable() {
  const [orders, setOrders] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await apiWithToken.get(
          `/orders?username=${sessionStorage.getItem("username")}`
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="bg-light rounded shadow m-3">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Ticket Number</th>
            <th>Flight Number</th>
            <th>Passenger</th>
            <th>Departure</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Operate By</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.orderNumber}>
                <td>{order.orderNumber}</td>
                <td>{order.ticketNumber}</td>
                <td>{order.flightNumber}</td>
                <td>{order.name}</td>
                <td>{order.departure}</td>
                <td>{order.destination}</td>
                <td>{timeFormat(order.departureTime)}</td>
                <td>{order.duration.toString()}</td>
                <td>{order.price.toString()}</td>
                <td>
                  {order.proxyFlightNumber === null
                    ? getAirlineName(order.flightNumber)
                    : getAirlineName(order.proxyFlightNumber)}
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

export default OrdersTable;
