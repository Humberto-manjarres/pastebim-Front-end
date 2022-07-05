import React, { Component } from 'react';
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";


export const PrivateRoute = ({children}) => {
  /**TODO: protegemos las rutas para que no puedan acceder a la ruta desde el browser */
  /**si la variable que está en el store loggedIn está en true, se podrá acceder a la ruta */
  const loggedIn = useSelector(state => state.auth.loggedIn);
  return (loggedIn)? children : <Navigate to={"/signin"}/>
}
