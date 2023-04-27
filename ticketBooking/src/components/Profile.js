import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import {apiWithToken} from "../axios/api";

const UserInfoCard = () => {
  if(sessionStorage.getItem("username") === null){
    window.location.href = "/login";
  }

  const { loginUsername } = sessionStorage.getItem("username");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await apiWithToken.get(
          `/user/profile?username=${sessionStorage.getItem("username")}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getInfo();
  }, [loginUsername]);

  const handleEdit = () => {
    navigate("/update");
  };

  return (
    <div className=" pt-5 d-flex justify-content-center">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle className="mb-2">
            {user.username}
          </Card.Subtitle>
          <Card.Text>
            <p>Phone: {user.phone}</p>
            <p>Email: {user.email}</p>
          </Card.Text>
          <Button variant="primary" onClick={handleEdit}>Edit</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserInfoCard;
