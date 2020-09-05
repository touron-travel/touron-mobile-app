import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { Feather, AntDesign } from "@expo/vector-icons";
import { Surface } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
const RequestInner = ({ navigation, route }) => {
  const plan = route.params.planned;
  const road = route.params.road;
  const surprise = route.params.surprise;
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 1500);
  });

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#28C9E1",
          height: HEIGHT / 8,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("MyRequest")}>
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
          <Text style={{ color: "white", fontSize: 20 }}>My Requests</Text>
        </View>
      </View>
      {plan ? (
        <View>
          <Surface style={{ margin: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Andika", fontSize: 30 }}>
                {plan.tourCategory}
              </Text>
            </View>
            <View style={{ marginHorizontal: WIDTH / 10 }}>
              <Text style={styles.text}>Request Id :{plan.requestID}</Text>
              <Text style={styles.text}>Status: {plan.status}</Text>
              <Text style={styles.text}>Name: {plan.name}</Text>
              <Text style={styles.text}>Number: {plan.number}</Text>
              <Text style={styles.text}>Budget: {plan.budget}</Text>
              <Text style={styles.text}>Adult: {plan.adult}</Text>
              <Text style={styles.text}>Children : {plan.children}</Text>
              <Text style={styles.text}>From Date: {plan.fromDate}</Text>
              <Text style={styles.text}>To Date: {plan.toDate}</Text>
              <Text style={styles.text}>Destination: {plan.destination}</Text>
              <Text style={styles.text}>Preferance: {plan.preferanece}</Text>
              <Text style={styles.text}>Start Point: {plan.startPoint}</Text>
              <Text style={styles.text}>Tour Type: {plan.tourType}</Text>
              <Text style={styles.text}>Travel Mode: {plan.travelMode}</Text>
              <Text style={styles.text}>
                Traveller Type: {plan.travellerType}
              </Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("MyRequest")}>
              <View style={{ alignItems: "center", margin: 10 }}>
                <Text
                  style={{
                    // backgroundColor: "red",
                    textAlign: "center",
                    padding: 8,
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 20,
                  }}
                >
                  Back
                </Text>
              </View>
            </TouchableOpacity>
          </Surface>
        </View>
      ) : null}
      {road ? (
        <View>
          <Surface style={{ margin: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Andika", fontSize: 30 }}>
                {road.tourCategory}
              </Text>
            </View>
            <View style={{ marginHorizontal: WIDTH / 10 }}>
              <Text style={styles.text}>Request Id :{road.requestID}</Text>
              <Text style={styles.text}>Status: {road.status}</Text>
              <Text style={styles.text}>Name: {road.name}</Text>
              <Text style={styles.text}>Number: {road.number}</Text>
              <Text style={styles.text}>Budget: {road.budget}</Text>
              <Text style={styles.text}>Adult: {road.adult}</Text>
              <Text style={styles.text}>Children : {road.children}</Text>
              <Text style={styles.text}>From Date: {road.fromDate}</Text>
              <Text style={styles.text}>To Date: {road.toDate}</Text>
              <Text style={styles.text}>Start Point: {road.startPoint}</Text>

              <Text style={styles.text}>Travel Mode: {road.travelMode}</Text>
              <Text style={styles.text}>
                Car Rent: {road.carRent ? "Needed" : "No Need"}
              </Text>
              <Text style={styles.text}>
                Additional Beds: {road.additionalInfo ? "Needed" : "No Need"}
              </Text>
              <Text style={styles.text}>
                Drive Duration: {road.driveDuration}
              </Text>
              <Text style={styles.text}>
                Drive Restriction: {road.driveRestriction}
              </Text>
              <Text style={styles.text}>Drive Type: {road.driveType}</Text>
              <Text style={styles.text}>Driver Type: {road.driverType}</Text>
              <Text style={styles.text}>Stops: {road.stops}</Text>
              <Text style={styles.text}>Travel Mode: {road.travelMode}</Text>
              <Text style={styles.text}>
                Traveller Type: {road.travellerType}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("MyRequest")}>
              <View style={{ alignItems: "center", margin: 10 }}>
                <Text
                  style={{
                    // backgroundColor: "red",
                    textAlign: "center",
                    padding: 8,
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 20,
                  }}
                >
                  Back
                </Text>
              </View>
            </TouchableOpacity>
          </Surface>
        </View>
      ) : null}
      {surprise ? (
        <View>
          <Surface style={{ margin: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Andika", fontSize: 30 }}>
                {surprise.tourCategory}
              </Text>
            </View>

            <View style={{ marginHorizontal: WIDTH / 10 }}>
              <Text style={styles.text}>Request Id :{surprise.requestID}</Text>
              <Text style={styles.text}>Status: {surprise.status}</Text>
              <Text style={styles.text}>Name: {surprise.name}</Text>
              <Text style={styles.text}>Number: {surprise.number}</Text>
              <Text style={styles.text}>Budget: {surprise.budget}</Text>
              <Text style={styles.text}>Adult: {surprise.adult}</Text>
              <Text style={styles.text}>Children : {surprise.children}</Text>
              <Text style={styles.text}>From Date: {surprise.fromDate}</Text>
              <Text style={styles.text}>To Date: {surprise.toDate}</Text>
              <Text style={styles.text}>
                Expediture1: {surprise.expediture1}
              </Text>
              <Text style={styles.text}>
                Expediture1: {surprise.expediture2}
              </Text>
              <Text style={styles.text}>
                Expediture1: {surprise.expediture3}
              </Text>
              <Text style={styles.text}>
                Start Point: {surprise.startPoint}
              </Text>
              <Text style={styles.text}>
                Preferance: {surprise.tourPreferance}
              </Text>
              <Text style={styles.text}>Tour Type: {surprise.tourType}</Text>
              <Text style={styles.text}>
                Travel Mode: {surprise.travelMode}
              </Text>
              <Text style={styles.text}>
                Traveller Type: {surprise.travellerType}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("MyRequest")}>
              <View style={{ alignItems: "center", margin: 10 }}>
                <Text
                  style={{
                    // backgroundColor: "red",
                    textAlign: "center",
                    padding: 8,
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 20,
                  }}
                >
                  Back
                </Text>
              </View>
            </TouchableOpacity>
          </Surface>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default RequestInner;

const styles = new StyleSheet.create({
  text: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Andika",
    textAlign: "justify",
  },
});
