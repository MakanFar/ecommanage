import React from "react";
import {  Route } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {

const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);
  return (
    <Route
      render={(props) => {
        if (user) {
          return <Component {...props} />;
        } else {
            navigate('/auth');
        }
      }}
    />
  );
};

export default ProtectedRoute;