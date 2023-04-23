import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import {apiWithToken} from "../axios/api";

const UserInfoCard = () => {
  const { loginUsername } = sessionStorage.getItem("username");
  const [user, setUser] = useState({});
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

  return (
    <div className=" pt-5 d-flex justify-content-center">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-center">
            {user.username}
          </Card.Subtitle>
          <Card.Text>
            <p>Phone: {user.phone}</p>
            <p>Email: {user.email}</p>
          </Card.Text>
          <Button variant="primary">Edit</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserInfoCard;
