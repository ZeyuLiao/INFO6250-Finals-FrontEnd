import React from "react";
import { useNavigate } from "react-router-dom";

const ACLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 m-5 rounded shadow">
      <h1>Login</h1>

      <div className="mt-5 container">
        <div className="col-3 m-3">
          <button
            className=" btn btn-primary"
            onClick={() => navigate("/ACADmin")}
          >
            Login as Admin
          </button>
        </div>
        <div className="col-3 m-3">
          <button
            className=" btn btn-primary"
            onClick={() => navigate("/ACManager")}
          >
            Login as Manager
          </button>
        </div>
      </div>
    </div>
  );
};

export default ACLogin;
