import React from "react";
import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { URL_API_LOGIN } from "../utils/config";

// s'applique aux éléments enfants
const RouteAccessorMW = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticate = async () => {
      try {
        const response = await fetch(URL_API_LOGIN, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Erreur d'authentification : ${response.status}`);
        }
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
        throw new Error(`Erreur serveur : ${error}`);
      }
    };
    isAuthenticate();
  },[]);

  return authenticated ? children : <Navigate to="/login"/>;
};

export default RouteAccessorMW;