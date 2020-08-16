import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
const MyRequestScreen = () => {
  const [user, setUser] = useState();

  const [userRequests, setUserRequests] = useState();
  //console.log(user.uid, "USER");
  //userRequests.forEach((c) => console.log(c));
  console.log(userRequests, "KjjjjuuuykkkkujdjjL");
  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    // setUser(userDetails);
    const getUserRequests = () => {
      // let plannedTour = [];
      const requests = [];
      firebase
        .database()
        .ref(`planned-tours/${userId}/`)
        .on("value", (data) => {
          let task = [];
          // console.log(data, "ll");
          data.forEach((c) => {
            //task.push(c);
            setUserRequests([...userRequests, c]);
          });
          // console.log(data);
          // plannedTour.push(data);
        });

      firebase
        .database()
        .ref(`roadtrip-tours/${userId}`)
        .on("value", (data) => {
          let task = [];
          // console.log(data, "ll");
          data.forEach((c) => {
            setUserRequests([...userRequests, c]);
          });
          // requests = data;
          // roadTripTour.push(data);
        });
      // let surpriseTour = [];
      // firebase
      //   .database()
      //   .ref(`surprise-tours/${userId}`)
      //   .on("value", (data) => {
      //     let task = [];
      //     // console.log(data, "ll");
      //     data.forEach((c) => {
      //       setUserRequests({ ...userRequests, c });
      //     });
      //   });

      // setUserRequests(requests);
      // console.log(requests);
    };
    getUserRequests();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>My Request</Text>
    </View>
  );
};

export default MyRequestScreen;
