import React, { useState, useEffect } from "react";
import touron from "../api/touron";
import * as firebase from "firebase";
export default () => {
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [tour, setTour] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  const getCountry = async () => {
    try {
      const countryResponse = await touron.get("/country");

      setCountry(countryResponse.data);
      console.log(citResponse.data);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  const getCity = async () => {
    try {
      const citResponse = await touron.get("/city");

      setCity(citResponse.data);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  const getTour = async () => {
    try {
      const tourResponse = await touron.get("/tour");
      setTour(tourResponse.data);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    getCity(), getCountry(), getTour();
  }, []);

  return [country, city, tour, errorMessage];
};
