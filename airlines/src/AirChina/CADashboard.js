import React, { useState } from "react";
import {NavLink } from "react-bootstrap";
import CAProxy from "./CAProxy";
import CAAddProxy from "./CAAddProxy";

const CAManagerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("WELCOME");



  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <div>
        <div className="row"> 
          <div className="col-2">
            <ul className="nav nav-tabs flex-column">
              <li className="nav-item">
                <NavLink onClick={() => handleComponentChange(<CAProxy/>)}>
                  Check Proxy Flight
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink onClick={() => handleComponentChange(<CAAddProxy/>)}>
                  Add Proxy Flight
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-10">{activeComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default CAManagerDashboard;
