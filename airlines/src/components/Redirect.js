import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const RedirectPage = () => {
  const navigate  = useNavigate();

  useEffect(() => {
    const redirect = setTimeout(() => {
        navigate("/");
    }, 5000);

    return () => clearTimeout(redirect);
  }, [navigate]);

  return (
    <div>
      <div style={{ padding: "50px" }}>
        <h2 className="success">Registration Successful</h2>
        <p className="success-simple">
          (You will be redirected in 5 seconds.)
        </p>
      </div>
    </div>
  );
};

export default RedirectPage;
