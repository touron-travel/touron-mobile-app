import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import { Feather, AntDesign } from "@expo/vector-icons";

const WishListScreen = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const [savedTours, setSavedTours] = useState([]);
  console.log(savedTours);
  const userId = firebase.auth().currentUser.uid;
  const getSavedTours = () => {
    firebase
      .database()
      .ref(`saved-tours/${userId}`)
      .on("value", (data) => {
        if (data) {
          let sT = [];
          data.forEach((c) => {
            sT.push(c.val());
            //  console.log(surpriseTour);
          });
          setSavedTours(sT);
        }
      });
  };

  useEffect(() => {
    getSavedTours();
    // setTimeout(() => {
    //   setLoaded(false);
    // }, 150);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
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
              <Text style={{ color: "white", fontSize: 20 }}>Saved Tours</Text>
            </View>
          </View>

          {savedTours.length == 0 ? (
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
                source={require("../../../assets/savedtours.png")}
              />
              <Text
                style={{
                  fontFamily: "Avenir",
                  fontSize: 20,
                  marginTop: WIDTH / 10,
                }}
              >
                Nothings Saved Yet
              </Text>
              <Text
                style={{
                  fontFamily: "WSansl",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Conent goes here
              </Text>
            </View>
          ) : (
            <View>
              {/* <Text>Planned Tour</Text> */}
              <FlatList
                data={savedTours}
                keyExtractor={(item) => item.tourName}
                renderItem={({ item }) => {
                  console.log(item, "ITEM");
                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 20,
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            style={{
                              height: WIDTH / 6,
                              width: WIDTH / 6,
                              borderRadius: 100,
                            }}
                            source={{ uri: item.imageUrl }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 0.75,
                            justifyContent: "center",
                            marginLeft: 10,
                            marginRight: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("TourInner", { item: item });
                            }}
                          >
                            {/* <LinearGradient
                              colors={["#E76847", "#FF9B60"]}
                              style={{
                                padding: 5,
                                borderRadius: 18,
                                // width: 60,
                              }}
                            > */}
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "Avenir",
                                fontWeight: "bold",
                              }}
                            >
                              {item.cityName}
                            </Text>
                            {/* </LinearGradient> */}
                            <Text style={{ fontSize: 16 }}>
                              {item.tourName}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            flex: 0.1,
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 8,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              const filterTour = savedTours.filter((c) => {
                                return c.tourName != item.tourName;
                              });

                              // setSavedTours(filterTour);
                              firebase
                                .database()
                                .ref(`saved-tours/${userId}`)
                                .set(filterTour)
                                .then((data) => console.log(data))
                                .catch((err) => console.log(err));
                              setTimeout(() => {
                                setSavedTours(filterTour);
                                const userId = firebase.auth().currentUser.uid;
                              }, 1000);
                            }}
                          >
                            <AntDesign
                              style={{ marginRight: 0 }}
                              name="heart"
                              size={24}
                              color="#FF4500"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default WishListScreen;
