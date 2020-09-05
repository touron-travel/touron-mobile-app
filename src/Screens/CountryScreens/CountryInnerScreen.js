import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WIDTH = Dimensions.get("window").width;

const HEIGHT = Dimensions.get("window").height;

const CountryInnerScreen = ({ navigation, route }) => {
  console.log(route.params.item);
  const item = route.params.item;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.imageUrl }} />
        <Text style={styles.countryName}>{item.countryName}</Text>

        <TouchableOpacity
          style={{
            zIndex: 1,
            bottom: -40,
            padding: 15,
            borderRadius: 20,
            position: "absolute",
          }}
          onPress={() =>
            navigation.navigate("CityHome", { name: item.countryName })
          }
        >
          <LinearGradient
            colors={["#E28633", "#E28633"]}
            style={{ padding: 15, alignItems: "center", borderRadius: 15 }}
          >
            <Text style={styles.button}>Explore Cities</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: WIDTH * 0.9,
          alignItems: "center",
          justifyContent: "center",

          marginHorizontal: 20,
          marginTop: HEIGHT / 15,
        }}
      >
        <Text
          style={{
            padding: 10,
            fontFamily: "Roboto",
            lineHeight: 18,
            fontSize: 13,
            fontWeight: "500",
          }}
        >
          {item.aboutCountry}
        </Text>
      </View>

      <View
        style={{
          // flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {/* <View
          style={{
            width: WIDTH * 0.9,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image
              style={{ height: 80, width: 80 }}
              source={require("../../../assets/weather.png")}
            />

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 26, fontFamily: "NewYorkl" }}>
                {item.weather}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  // fontWeight: "bold",
                  fontFamily: "WSansl",
                }}
              >
                Average Weather throughout the Year
              </Text>
            </View>
          </View> */}
        {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image
              style={{ height: 80, width: 80 }}
              source={require("../../../assets/time-zone.png")}
            />

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 26, fontFamily: "NewYorkl" }}>
                {item.general.timeZone}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  // fontWeight: "bold",
                  fontFamily: "WSansl",
                }}
              >
                Average Time Difference From India
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 30,
            }}
          >
            <Image
              style={{ height: 80, width: 80, marginRight: 40 }}
              source={require("../../../assets/visa.png")}
            />

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 26, fontFamily: "NewYorkl" }}>
                {item.visa.onArrival}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  // fontWeight: "bold",
                  fontFamily: "WSansl",
                }}
              >
                Eligible for Visa On Arrival
              </Text>
            </View>
          </View> 
              </View> */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 30,
            justifyContent: "space-evenly",
            //   alignItems: "flex-start",
            width: WIDTH * 0.9,
          }}
        >
          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
              width: WIDTH / 2,
              // height: HEIGHT / 3,
            }}
          >
            <Image
              style={{ height: 60, width: 60, marginTop: 25 }}
              source={require("../../../assets/visa.png")}
            />
            <Image
              style={{ height: 60, width: 60, marginTop: 25 }}
              source={require("../../../assets/time-zone.png")}
            />
            <Image
              style={{ height: 60, width: 60, marginTop: 25 }}
              source={require("../../../assets/weather.png")}
            />
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
              width: WIDTH / 2,
              marginRight: 20,
            }}
          >
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
                width: WIDTH / 2,
                marginTop: 30,
              }}
            >
              <Text style={{ fontSize: 20, fontFamily: "NewYorkl" }}>
                {item.visa.onArrival}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  // fontWeight: "bold",
                  fontFamily: "WSansl",
                }}
              >
                Eligible for Visa On Arrival
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Text style={{ fontSize: 20, fontFamily: "NewYorkl" }}>
                {item.weather} ° C
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  textAlign: "center",
                  fontFamily: "WSansl",
                }}
              >
                Average Weather throughout the Year
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Text style={{ fontSize: 20, fontFamily: "NewYorkl" }}>
                {item.general.timeZone}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  textAlign: "center",
                  fontFamily: "WSansl",
                }}
              >
                Average Time Difference From India
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Planned")}>
            <View
              style={{
                alignItems: "center",
                // borderWidth: 2,
                borderRadius: 13,
                elevation: 200,
                // borderColor: "black",
                backgroundColor: "#FA3B5A",
                padding: 15,
              }}
            >
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../../../assets/CountryInnericon/shop.png")}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Andika",
                fontSize: 12,
              }}
            >
              Shopp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Planned")}>
            <View
              style={{
                alignItems: "center",
                // borderWidth: 2,
                borderRadius: 13,
                elevation: 200,
                backgroundColor: "#9EB19E",

                //borderColor: "black",
                padding: 15,
              }}
            >
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../../../assets/CountryInnericon/travelplan.png")}
              />
            </View>
            <Text
              style={{
                fontFamily: "Andika",
                textAlign: "center",
                fontSize: 12,
              }}
            >
              Start Planning for {item.countryName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Planned")}>
            <View
              style={{
                alignItems: "center",
                // borderWidth: 2,
                backgroundColor: "#FFB400",
                borderRadius: 13,
                elevation: 200,
                // borderColor: "black",
                padding: 15,
              }}
            >
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../../../assets/CountryInnericon/contact.png")}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Andika",
                fontSize: 12,
              }}
            >
              Talk to us
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CountryInnerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  image: {
    height: HEIGHT / 1.7,
    width: WIDTH,
    position: "relative",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  countryName: {
    position: "absolute",
    bottom: 65,
    fontSize: 40,
    fontFamily: "NewYorkl",

    color: "#FFF",
  },
  button: {
    fontSize: 15,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#FFF",
    fontStyle: "normal",
  },
});
