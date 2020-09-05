import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import { Feather, AntDesign } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import Destination from "../CategoryScreens/Reusable components/Destination";

const MyRequestScreen = ({ navigation }) => {
  // const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(true);

  const [surpriseTour, setSurpriseTour] = useState([]);
  const [plannedTour, setPlannedTour] = useState([]);
  const [roadTrip, setRoadTrip] = useState([]);

  const fullData = [...surpriseTour, ...plannedTour, ...roadTrip];

  console.log(fullData.length);

  const getUserRequests = () => {
    const user = firebase.auth().currentUser;
    const userId = user.uid;

    firebase
      .database()
      .ref(`planned-tours/${userId}/`)
      .on("value", (data) => {
        if (data) {
          let pT = [];
          data.forEach((c) => {
            pT.push(c.val());
          });
          setPlannedTour(pT);
        }
      });

    firebase
      .database()
      .ref(`roadtrip-tours/${userId}`)
      .on("value", (data) => {
        if (data) {
          let rT = [];
          data.forEach((c) => {
            rT.push(c.val());
          });
          setRoadTrip(rT);
        }
      });
    firebase
      .database()
      .ref(`surprise-tours/${userId}`)
      .on("value", (data) => {
        if (data) {
          let sT = [];
          data.forEach((c) => {
            sT.push(c.val());
            //  console.log(surpriseTour);
          });
          setSurpriseTour(sT);
        }
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 1500);
  });

  useEffect(() => {
    getUserRequests();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
      {loaded ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
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
              <Text style={{ color: "white", fontSize: 20 }}>My Requests</Text>
            </View>
          </View>

          {fullData.length == 0 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Image
                style={{
                  height: HEIGHT / 2,
                  width: WIDTH * 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                source={require("../../../assets/myrequest.png")}
              />
              <Text
                style={{
                  fontFamily: "Avenir",
                  fontSize: 20,
                  marginTop: -WIDTH / 10,
                }}
              >
                No Requests Yet
              </Text>
              <Text
                style={{
                  marginTop: 20,
                  fontFamily: "WSansl",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Go to Home and start planning
              </Text>
            </View>
          ) : (
            <View>
              {plannedTour.length == 0 ? null : (
                <View>
                  {/* <Text>Planned Tour</Text> */}
                  <FlatList
                    data={plannedTour}
                    keyExtractor={(item) => item.requestID}
                    renderItem={({ item }) => {
                      console.log(item, "ITEM");
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("RequestInner", {
                                planned: item,
                                road: null,
                                surprise: null,
                              })
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                marginTop: 20,
                                justifyContent: "space-between",
                              }}
                            >
                              <View style={{ flex: 0.3 }}>
                                <Avatar.Text
                                  // label={user.displayName ? user.displayName.charAt(0) : "N"}
                                  label="P"
                                  style={{
                                    backgroundColor: "#DBE8EB",
                                    marginLeft: 20,
                                  }}
                                />
                              </View>
                              <View
                                style={{ flex: 0.7, justifyContent: "center" }}
                              >
                                <Text style={{ fontSize: 20 }}>
                                  {item.tourCategory}
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                  Status: {item.status}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
              {roadTrip.length == 0 ? null : (
                <View>
                  <FlatList
                    data={roadTrip}
                    keyExtractor={(item) => item.requestID}
                    renderItem={({ item }) => {
                      console.log(item, "IffffTEM");
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("RequestInner", {
                                road: item,
                                planned: null,
                                surprise: null,
                              })
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                marginTop: 20,
                                justifyContent: "space-between",
                              }}
                            >
                              <View style={{ flex: 0.3 }}>
                                <Avatar.Text
                                  // label={user.displayName ? user.displayName.charAt(0) : "N"}
                                  label="R"
                                  style={{
                                    backgroundColor: "#DBE8EB",
                                    marginLeft: 20,
                                  }}
                                />
                              </View>
                              <View
                                style={{ flex: 0.7, justifyContent: "center" }}
                              >
                                <Text style={{ fontSize: 20 }}>
                                  {item.tourCategory}
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                  Status: {item.status}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
              {surpriseTour.length == 0 ? null : (
                <View>
                  <FlatList
                    data={surpriseTour}
                    keyExtractor={(item) => item.requestID}
                    renderItem={({ item }) => {
                      //  console.log(item, "ITEM");
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("RequestInner", {
                                surprise: item,
                                road: null,
                                planned: null,
                              })
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                marginTop: 20,
                                justifyContent: "space-between",
                              }}
                            >
                              <View style={{ flex: 0.3 }}>
                                <Avatar.Text
                                  // label={user.displayName ? user.displayName.charAt(0) : "N"}
                                  label="S"
                                  style={{
                                    backgroundColor: "#DBE8EB",
                                    marginLeft: 20,
                                  }}
                                />
                              </View>
                              <View
                                style={{ flex: 0.7, justifyContent: "center" }}
                              >
                                <Text style={{ fontSize: 20 }}>
                                  {item.tourCategory}
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                  Status: {item.status}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default MyRequestScreen;

const styles = new StyleSheet.create({
  modalView: {
    margin: 20,

    backgroundColor: "#fff",
    borderRadius: 20,
    //  padding: 40,
    //  alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
});
