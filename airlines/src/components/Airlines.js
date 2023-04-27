import React from "react";
import { useNavigate } from "react-router-dom";

const Airlines = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 m-5 rounded shadow">
      <h1>Choose your airline</h1>
      <div className="mt-5 container row">
        <div className="col-2">
          <button
            className=" btn btn-primary "
            onClick={() => navigate("/ACLogin")}
          >
            Air Canada
          </button>
        </div>
        <div className="col-2">
          <button
            className=" btn btn-primary"
            onClick={() => navigate("/CALogin")}
          >
            Air China
          </button>
        </div>
        <div className="col-2">
          <button
            className=" btn btn-primary "
            onClick={() => navigate("/EKLogin")}
          >
            Emirates
          </button>
        </div>
        <div className="col-2">
          <button
            className=" btn btn-primary "
            onClick={() => navigate("/LHLogin")}
          >
            Lufthansa
          </button>
        </div>
        <div className="col-2">
          <button
            className=" btn btn-primary "
            onClick={() => navigate("/DLLogin")}
          >
            Delta Airlines
          </button>
        </div>
      </div>
    </div>
  );
};

export default Airlines;
