import React, { useState } from "react";
import {NavLink } from "react-bootstrap";
import DLProxy from "./DLProxy";
import DLAddProxy from "./DLAddProxy";

const DLManagerDashboard = () => {
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
                <NavLink onClick={() => handleComponentChange(<DLProxy/>)}>
                  Check Proxy Flight
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink onClick={() => handleComponentChange(<DLAddProxy/>)}>
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

export default DLManagerDashboard;
