import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  Image,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const HEIGHT = Dimensions.get("window").height;

const TourInnerScreen = ({ route }) => {
  const item = route.params.item;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <LinearGradient
              colors={["#d5e1d9ff", "#d5e1d9ff"]}
              style={{
                padding: 8,
                borderRadius: 10,
                // position: "absolute",
                // top: 100,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "NewYorkl" }}>
                {item.cityName}
              </Text>
            </LinearGradient>
          </View>
          <View
            style={{
              // position: "absolute",
              // top: 100,
              marginHorizontal: 10,
              marginTop: 5,
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.tourName}>{item.tourName}</Text>
            <Text style={styles.tourCategory}>
              Category Type:{item.tourCategory.join(",")}
            </Text>
          </View>

          {/* <View
            style={{
              bottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              width: WIDTH * 0.9,
              marginHorizontal: 20,
              alignItems: "center",
              position: "absolute",
            }}
          >
            <View>
              <LinearGradient
                colors={["#E76847", "#FF9B60"]}
                // colors={["#28C9E1", "#1CD5C6"]}
                style={{ padding: 10, borderRadius: 18 }}
              >
                <View>
                  {item.tourCost.adult == 15000 &&
                  item.tourCost.adult >= 10000 ? (
                    <Text style={{ fontSize: 18 }}>₹₹₹₹-High</Text>
                  ) : item.tourCost.adult < 10000 &&
                    item.tourCost.adult >= 5000 ? (
                    <Text style={{ fontSize: 18 }}>₹₹₹ - Medium</Text>
                  ) : item.tourCost.adult > 2500 &&
                    item.tourCost.adult < 500205 ? (
                    <Text style={{ fontSize: 18 }}>₹₹ - Low</Text>
                  ) : (
                    <Text style={{ fontSize: 18 }}>₹ - Very Low</Text>
                  )}
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <LinearGradient
                colors={["#2193b0", "#6dd5ed"]}
                style={{ padding: 10, borderRadius: 18, flexDirection: "row" }}
              >
                <Image
                  style={{ height: 25, width: 25, marginRight: 4 }}
                  source={require("../../../assets/Star.png")}
                />
                <Text style={{ fontSize: 18 }}>{item.ratings}/5</Text>
              </LinearGradient>
            </View>
          </View> */}
        </View>

        {/* Inner deatil */}

        <View style={[styles.innerDetail]}>
          <Text
            style={{
              fontSize: 20,
              backgroundColor: "#d5e1d9ff",
              fontFamily: "NewYorkl",
              padding: 5,
              borderRadius: 10,
            }}
          >
            About Tour
          </Text>
          <View
            style={{
              borderRadius: 40,
              marginVertical: 5,
              borderColor: "#fff",
            }}
          >
            <Text
              style={{
                lineHeight: 25,
                marginLeft: 20,
                marginTop: 15,
                fontFamily: "Andika",
              }}
            >
              {item.aboutTour}
            </Text>
          </View>
        </View>
        {/* <View style={styles.features}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/Scooter.png")}
            />
            <Text>{item.pickUpPoint.join(",")}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/Star.png")}
            />
            <Text>{item.tourPreferance}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/Signs.png")}
            />
            <Text>{item.tourType}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/Umbrella.png")}
            />
            <Text>{item.tourDuration}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/Cocktail.png")}
            />
            <Text>{item.idealType.join(",")}</Text>
          </View>

          {item.pickUpTime !== "-" ? (
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 40, width: 40 }}
                  source={require("../../../assets/Flag.png")}
                />
                <Text>{item.pickUpTime} Pick up</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 40, width: 40 }}
                  source={require("../../../assets/Scooter.png")}
                />
                <Text>{item.dropTime} Drop</Text>
              </View>
            </View>
          ) : null}
        </View> */}

        {item.itinerary === "-" ? null : (
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                backgroundColor: "#d5e1d9ff",
                padding: 5,
                fontFamily: "NewYorkl",
                borderRadius: 10,
                // marginLeft: 10,
              }}
            >
              Itinerary
            </Text>

            <View
              style={{
                borderRadius: 40,
                marginVertical: 5,
                borderColor: "#fff",
              }}
            >
              <Text
                style={{
                  // fontWeight: "700",
                  lineHeight: 25,
                  marginLeft: 20,
                  marginTop: 15,

                  fontFamily: "Andika",
                }}
              >
                {item.itinerary}
              </Text>
            </View>
          </View>
        )}

        {/* Pickups */}

        {/* Additional information */}

        {item.additionalInformation == "-" ? null : (
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                backgroundColor: "#d5e1d9ff",
                fontFamily: "NewYorkl",

                padding: 5,
                borderRadius: 10,
              }}
            >
              Additional Information
            </Text>

            <View
              style={{
                borderRadius: 40,
                marginVertical: 5,
                borderColor: "#fff",
              }}
            >
              <Text
                style={{
                  lineHeight: 20,
                  marginLeft: 20,
                  marginTop: 15,
                  fontFamily: "Andika",
                }}
              >
                {item.additionalInformation}
              </Text>
            </View>
          </View>
        )}

        {/* Button */}
        {/* <View style={{ marginHorizontal: 20 }}>
          <LinearGradient
            colors={["#626E7B", "#626E7B"]}
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "#FFF" }}>
              Select this Tour
            </Text>
          </LinearGradient>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default TourInnerScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  image: {
    height: HEIGHT / 1.8,
    borderBottomLeftRadius: 40,
    resizeMode: "cover",
    borderBottomRightRadius: 40,
    position: "relative",
    width: WIDTH,
    overlayColor: "#0000",
  },
  cityName: {
    fontSize: 20,
    fontFamily: "NewYorkl",
    margin: 5,
  },
  tourName: {
    fontSize: 25,
    margin: 5,
    fontFamily: "NewYorkl",
  },
  innerDetail: {
    margin: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  tourCategory: {
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 5,

    // fontFamily: "NewYorkl",
    fontFamily: "WSansl",
  },
  features: {
    justifyContent: "center",
  },
  itinerary: {},
});
