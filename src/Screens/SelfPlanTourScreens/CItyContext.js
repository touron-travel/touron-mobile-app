import React, { createContext, useState } from "react";

export const CityContext = createContext();

export const CityProvider = (props) => {
  const [selectedCity, setSelectedCity] = useState([]);
  const [cityDates, setCityDates] = useState([]);

  return (
    <CityContext.Provider
      value={[selectedCity, setSelectedCity, cityDates, setCityDates]}
    >
      {props.children}
    </CityContext.Provider>
  );
};
