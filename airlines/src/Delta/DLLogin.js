import React from "react";
import { useNavigate } from "react-router-dom";

const DLLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 m-5 rounded shadow">
      <h1>Login</h1>

      <div className="mt-5 container">
        <div className="col-3 m-3">
          <button
            className=" btn btn-primary"
            onClick={() => navigate("/DLADmin")}
          >
            Login as Admin
          </button>
        </div>
        <div className="col-3 m-3">
          <button
            className=" btn btn-primary"
            onClick={() => navigate("/DLManager")}
          >
            Login as Manager
          </button>
        </div>
      </div>
    </div>
  );
};

export default DLLogin;
