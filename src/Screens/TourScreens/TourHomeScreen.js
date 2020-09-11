import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import firebase from "firebase";
import touron from "../../api/touron";
import { LinearGradient } from "expo-linear-gradient";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import { AntDesign, Feather } from "@expo/vector-icons";

import SearchBar from "../../Reusable Components/SearchBar";

const TourHomeScreen = ({ navigation, route }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const name = route.params.name;
  console.log(route.params.name);
  const getSavedTours = () => {
    let sT = [];
    let sTNames = [];
    if (isLoggedIn) {
      const userId = firebase.auth().currentUser.uid;

      firebase
        .database()
        .ref(`saved-tours/${userId}`)
        .on("value", (data) => {
          if (data) {
            data.forEach((c) => {
              sT.push(c.val());
              sTNames.push(c.val().tourName);
            });
          }
        });

      return [sT, sTNames];
    } else {
      return [sT, sTNames];
    }
  };

  const [sT, sTNames] = getSavedTours();
  const [tour, setTour] = useState([]);
  const [error, setErrorMessage] = useState();
  const [loader, setLoader] = useState(true);
  const [savedTours, setSavedTours] = useState(sTNames);
  const [savedToursDetails, setSavedToursDetails] = useState(sT);
  const [tourName, setTourName] = useState("");
  let indexValue = 20;

  const showLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  const search = () => {
    console.log(tourName, "NAME");
    if (tour.length > 0) {
      const d = tour.filter((c) => {
        return c.tourName
          .trim()
          .toUpperCase()
          .includes(tourName.trim().toUpperCase());
      });

      return d;
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      if (savedToursDetails.length > 0) {
        const userID = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref(`saved-tours/${userID}`)
          .set(savedToursDetails)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      }
    }
  }, [tour, savedToursDetails, indexValue]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getTour(), showLoader();
    }
    return () => (mounted = false);
  }, []);

  // const save = () => {
  //   tour.map((c) => {
  //     firebase
  //       .database()
  //       .ref(`tours`)
  //       .push(c)
  //       .then((data) => {
  //         console.log(data);
  //         nextStep();
  //       })
  //       .catch((err) => console.log(err));
  //   });
  // };

  const getTour = async () => {
    console.log(route.params.name, "kk");
    if (route.params.name) {
      try {
        const tourResponse = await touron.get("/tour");
        console.log(tourResponse.data, "lpllplpll");
        const data = tourResponse.data.filter((d) => {
          return d.cityName == route.params.name;
        });
        console.log(data, "lplshvjfvfwvhwiuhlplpll");
        setTour(data);
      } catch (err) {
        setErrorMessage("Something went wrong");
      }
    } else {
      try {
        const tourResponse = await touron.get("/tour");
        console.log(tourResponse.data, "lpllplpll");
        setTour(tourResponse.data);
      } catch (err) {
        setErrorMessage("Something went wrong");
      }
    }
    // firebase
    //   .database()
    //   .ref(`tours/`)
    //   .on("value", (data) => {
    //     if (data) {
    //       let pT = [];
    //       data.forEach((c, index) => {
    //         console.log(index, "INDEX");
    //         pT.push(c.val());
    //       });
    //       console.log(pT, "PTUYU");
    //       setTour(pT);
    //     }
    //   });
  };

  return (
    <View style={styles.container}>
      {loader ? (
        <ActivityIndicator
          size="large"
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        />
      ) : (
        <View>
          <View style={styles.background}>
            <Feather name="search" style={styles.iconStyle}></Feather>
            <TextInput
              style={styles.inputStyle}
              placeholder="Search"
              onChangeText={(value) => setTourName(value)}
              onSubmitEditing={search}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(c) => c._id}
            data={search()}
            renderItem={({ item, index }) => {
              if (index < indexValue)
                return (
                  <>
                    <View style={styles.imageContainer}>
                      <View style={styles.shadow}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("TourInner", { item: item });
                          }}
                        >
                          <Image
                            style={styles.image}
                            source={{ uri: item.imageUrl }}
                          />
                        </TouchableOpacity>
                        <View
                          style={{
                            flexDirection: "row",
                            position: "absolute",
                            width: WIDTH * 0.9,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <LinearGradient
                            colors={["#FFA26E", "#E36D5D"]}
                            style={{
                              marginHorizontals: 15,
                              marginTop: 10,
                              padding: 2,
                              borderRadius: 5,
                              left: 10,
                            }}
                          >
                            <View>
                              <Text style={styles.cityname}>
                                {item.cityName}
                              </Text>
                            </View>
                          </LinearGradient>
                        </View>
                        <View style={styles.tourDetails}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#8395A7", fontSize: 15 }}>
                              {item.tourCategory.join(",")}
                            </Text>
                            <View>
                              {savedTours.includes(item.tourName) ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    let filterData = savedTours.filter((c) => {
                                      return c != item.tourName;
                                    });

                                    setSavedTours(filterData);

                                    const filterDetails = savedToursDetails.filter(
                                      (c) => {
                                        return c.tourName !== item.tourName;
                                      }
                                    );

                                    setSavedToursDetails(filterDetails);
                                  }}
                                >
                                  <AntDesign
                                    style={{ marginRight: 0 }}
                                    name="heart"
                                    size={24}
                                    color="#FF4500"
                                  />
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => {
                                    if (isLoggedIn) {
                                      setSavedTours([
                                        ...savedTours,
                                        item.tourName,
                                      ]);
                                      setSavedToursDetails([
                                        ...savedToursDetails,
                                        item,
                                      ]);
                                    } else {
                                      navigation.navigate("SignUpScreen");
                                    }
                                  }}
                                >
                                  <Image
                                    style={{
                                      height: 35,

                                      width: 35,
                                    }}
                                    source={require("../../../assets/heart.png")}
                                  />
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>

                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                              marginTop: 2,
                            }}
                          >
                            {item.tourName}
                          </Text>
                          <Text
                            style={{
                              color: "#8395A7",
                              fontSize: 15,
                              marginVertical: 5,
                            }}
                          >
                            {item.tourType}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {/* <LinearGradient
                            colors={["#fff", "#fff"]}
                            style={{
                              paddingHorizontal: 8,
                              borderRadius: 8,
                              borderColor: "black",
                            }}
                          > */}
                            <View
                              style={{
                                padding: 8,
                                borderWidth: 1,
                                borderColor: "#333",
                                borderRadius: 14,
                              }}
                            >
                              {item.tourCost.adult == 15000 &&
                              item.tourCost.adult >= 10000 ? (
                                <Text style={{ fontSize: 13 }}>
                                  ₹₹₹₹ - High
                                </Text>
                              ) : item.tourCost.adult < 10000 &&
                                item.tourCost.adult >= 5000 ? (
                                <Text style={{ fontSize: 13 }}>
                                  ₹₹₹ - Medium
                                </Text>
                              ) : item.tourCost.adult > 2500 &&
                                item.tourCost.adult < 500205 ? (
                                <Text style={{ fontSize: 13 }}>₹₹ - Low</Text>
                              ) : (
                                <Text style={{ fontSize: 13 }}>
                                  ₹ - Very Low
                                </Text>
                              )}
                            </View>
                            {/* <Text>{item.tourCost.adult}</Text> */}
                            {/* </LinearGradient> */}
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                style={{
                                  height: 25,
                                  width: 25,
                                  marginRight: 4,
                                }}
                                source={require("../../../assets/Star.png")}
                              />
                              <Text style={{ fontSize: 18 }}>
                                {item.ratings}/5
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default TourHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  imageContainer: {
    padding: 5,
    position: "relative",
  },
  image: {
    height: Dimensions.get("window").height / 4.5,
    width: WIDTH * 0.9,
    borderRadius: 20,
  },
  shadow: {
    // height: Dimensions.get("window").height / 2.4,
    width: WIDTH * 0.9,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 10,
  },
  cityname: {
    padding: 5,
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    fontStyle: "normal",

    zIndex: 1,
    left: 0,
  },

  view: {
    width: 100,
    height: 100,
    marginTop: 20,
    backgroundColor: "red",
  },
  tourDetails: {
    margin: 15,
  },
  background: {
    backgroundColor: "#fff",
    height: HEIGHT / 15,
    borderRadius: 20,
    flexDirection: "row",
    //  borderWidth: 1,
    width: WIDTH * 0.9,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  inputStyle: {
    fontSize: 18,
    flex: 1,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});
