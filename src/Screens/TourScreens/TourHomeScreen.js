import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Surface } from "react-native-paper";
import touron from "../../api/touron";
import { LinearGradient } from "expo-linear-gradient";
const WIDTH = Dimensions.get("window").width;

import SearchBar from "../../Reusable Components/SearchBar";

const TourHomeScreen = ({ navigation, route }) => {
  const [tour, setTour] = useState([]);
  const [error, setErrorMessage] = useState();
  const [loader, setLoader] = useState(true);

  const showLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  const getTour = async () => {
    try {
      const tourResponse = await touron.get("/tour");
      setTour(tourResponse.data);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  // const getTour = async () => {
  //   if (route.params.name) {
  //     console.log(route.params.name, "kk");
  //     try {
  //       const tourResponse = await touron.get("/tour");
  //       const data = tourResponse.data.filter((d) => {
  //         // console.log(d, name);
  //         return d.cityName == route.params.name;
  //       });
  //       setTour(data);
  //     } catch (err) {
  //       setErrorMessage("Something went wrong");
  //     }
  //   } else {
  //     try {
  //       const tourResponse = await touron.get("/tour");
  //       console.log(tourResponse.data, "hghjgjgh");
  //       setTour(tourResponse.data);
  //     } catch (err) {
  //       setErrorMessage("Something went wrong");
  //     }
  //   }
  // };

  useEffect(() => {
    getTour(), showLoader();
  }, []);

  const shadowstyle = {
    shadowOpacity: 1,
  };
  return (
    <View style={styles.container}>
      {/* <View style={(styles.view, { shadowOpacity: 1 })}></View> */}
      {loader ? (
        <ActivityIndicator
          size="large"
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        />
      ) : (
        <View>
          {/* <SearchBar /> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(c) => c._id}
            data={tour}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("TourInner", { item: item });
                  }}
                >
                  <View style={styles.imageContainer}>
                    <View style={styles.shadow}>
                      <Image
                        style={styles.image}
                        source={{ uri: item.imageUrl }}
                      />
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
                            <Text style={styles.cityname}>{item.cityName}</Text>
                          </View>
                        </LinearGradient>
                        <View>
                          <Image
                            style={{
                              height: 25,
                              marginRight: 10,
                              width: 25,
                            }}
                            source={require("../../../assets/heart.png")}
                          />
                        </View>
                      </View>
                      <View style={styles.tourDetails}>
                        <Text style={{ color: "#8395A7", fontSize: 15 }}>
                          {item.tourCategory.join(",")}
                        </Text>
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
                              <Text style={{ fontSize: 13 }}>₹₹₹₹ - High</Text>
                            ) : item.tourCost.adult < 10000 &&
                              item.tourCost.adult >= 5000 ? (
                              <Text style={{ fontSize: 13 }}>₹₹₹ - Medium</Text>
                            ) : item.tourCost.adult > 2500 &&
                              item.tourCost.adult < 500205 ? (
                              <Text style={{ fontSize: 13 }}>₹₹ - Low</Text>
                            ) : (
                              <Text style={{ fontSize: 13 }}>₹ - Very Low</Text>
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
                              style={{ height: 25, width: 25, marginRight: 4 }}
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
                </TouchableOpacity>
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
    // borderTopLeftRadius: 18,
    // borderTopRightRadius: 18,
    borderRadius: 20,
    // position: "relative",
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
});
