import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  Image,
  View,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CityInnerScreen = ({ navigation, route }) => {
  const item = route.params.item;
  console.log(item);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
        </View>
        <View style={styles.innerDetail}>
          <Text style={styles.cityName}>{item.cityName}</Text>
          <Text style={styles.about}>{item.aboutCity}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 50, width: 50, marginRight: 10 }}
              source={require("../../../assets/Snow.png")}
            />
            <Text style={{ fontSize: 15 }}>{item.weather}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 42, width: 42, marginRight: 10 }}
              source={require("../../../assets/Airplane.png")}
            />
            <Text style={{ fontSize: 15 }}>{item.travelDuration}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 32, width: 32, marginRight: 10 }}
              source={require("../../../assets/Calendar.png")}
            />
            <Text style={{ fontSize: 15 }}>{item.idealDays} Required</Text>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        > */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
            marginHorizontal: 10,
          }}
        >
          <Image
            style={{ height: 45, width: 45, marginRight: 10 }}
            source={require("../../../assets/airport.png")}
          />
          <Text style={{ fontSize: 15, marginTop: 15 }}>
            {item.airportName}
          </Text>
          {/* </View> */}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              marginTop: 60,

              marginRight: 50,
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            Famous Places
          </Text>
          {item.famousPlacesToVisit.split(".").map((d) => {
            return <Text style={{ fontSize: 15 }}>{d}</Text>;
          })}
          {/* </View> */}
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TourHome", { name: item.cityName })
          }
        >
          <View style={{ marginHorizontal: 20 }}>
            <LinearGradient
              colors={["#626E7B", "#626E7B"]}
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                padding: 15,
                marginBottom: 15,
              }}
            >
              <Text style={{ fontSize: 20, color: "#FFF" }}>Explore Tours</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ marginHorizontal: 20 }}>
            <LinearGradient
              colors={["#626E7B", "#626E7B"]}
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                padding: 15,
                marginBottom: 15,
              }}
            >
              <Text style={{ fontSize: 20, color: "#FFF" }}>Explore Shop</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CityInnerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F3F6",
  },
  image: {
    height: HEIGHT / 1.6,
    width: WIDTH,
    position: "relative",
  },
  cityName: {
    marginTop: 60,
    marginLeft: 30,
    fontSize: 40,
    fontWeight: "bold",
  },
  innerDetail: {
    top: -30,
    flex: 1,
    backgroundColor: "#F1F3F6",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  about: {
    marginTop: 20,
    fontSize: 17,
    marginHorizontal: 30,
  },
});
