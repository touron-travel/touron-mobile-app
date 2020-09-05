import React, { useState, useEffect } from "react";

import * as firebase from "firebase";

export default () => {
  const [savedTour, setSavedTours] = useState([]);

  useEffect(() => {
    getSavedTours();
  }, []);

  return savedTour;
};
