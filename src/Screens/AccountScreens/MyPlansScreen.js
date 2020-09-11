import React, { useEffect, useState, useContext } from "react";
import { Text, Image, View, Dimensions, TouchableOpacity } from "react-native";

import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import { Feather } from "@expo/vector-icons";

const MyPlansScreen = ({ navigation }) => {
  const [plannedTour, setPlannedTour] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  // console.log(plannedTour[0].tourDetails[0]);

  const userId = user.user.uid;

  useEffect(() => {
    const getUserPlans = () => {
      const plans = [];
      firebase
        .database()
        .ref(`self-planned-tours/${userId}/`)
        .on("value", (data) => {
          data.forEach((c) => {
            //  console.log(c, "LLLLLL");
            plans.push(c.val());
          });
        });

      plans.forEach((c) => console.log(c.tourDetails, "PLP"));
    };

    getUserPlans();
  }, []);
  // let plan = [];

  // plannedTour.map((c) => {
  //   plan.push(c.tourDetails);
  // });

  // console.log(plan);
  // plan.forEach((c) => console.log(c.cityName, "OP"));

  // console.log(plan, "lll");
  return (
    <View
      animation="bounceIn"
      duration={3000}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <View
        style={{
          backgroundColor: "#28C9E1",
          height: HEIGHT / 8,
          alignItems: "center",
          //  justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ flex: 0.2 }}>
            <Feather
              name="menu"
              size={28}
              color="black"
              style={{ paddingHorizontal: 20, paddingTop: 10 }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 0.8,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>My Plans</Text>
        </View>
      </View>
      {plannedTour.length == 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            // flex: 1,
          }}
        >
          <Image
            style={{
              height: HEIGHT / 2,
              width: WIDTH * 0.7,
              marginTop: WIDTH / 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            source={require("../../../assets/myplans.png")}
          />
          <Text
            style={{
              fontFamily: "Avenir",
              fontSize: 20,
              marginTop: WIDTH / 10,
            }}
          >
            No Tour Plans Yet
          </Text>
          <Text
            style={{
              fontFamily: "WSansl",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Go to Home and start planning
          </Text>
        </View>
      ) : (
        <View>n</View>
      )}
    </View>
  );
};

export default MyPlansScreen;
