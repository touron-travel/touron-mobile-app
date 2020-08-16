import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { AppLoading } from "expo";
import * as Font from "expo-font";
// import { Feather } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const Categories = ({ navigation }) => {
  const [fontLoaded, setFont] = useState(false);

  const fetchFont = async () => {
    await Font.loadAsync({
      Andika: require("../../../../assets/fonts/Andika-Regular.ttf"),
    });
    setFont(true);
  };
  useEffect(() => {
    fetchFont();
  }, []);
  // console.log(navigation, "ytryt");

  if (!fontLoaded) {
    console.log("not");
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Planned")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Feather name="search" style={styles.icon} color="black" /> */}
            <LinearGradient
              // colors={["#A6C5CD", "#FF83A1"]}
              colors={["#cfeeec", "#cfeeec"]}
              style={{ padding: 6, alignItems: "center", borderRadius: 50 }}
            >
              <View style={{ borderRadius: 50, padding: 10 }}>
                <Image
                  style={{
                    height: HEIGHT / 18,
                    width: WIDTH / 10,
                  }}
                  source={require("../../../../assets/greenb.png")}
                />
              </View>
            </LinearGradient>
            <Text style={styles.text}>Planned Tour</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Road")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LinearGradient
              // colors={["#A6C5CD", "#D7EDF3"]}
              colors={["#cfeeec", "#cfeeec"]}
              style={{ padding: 6, alignItems: "center", borderRadius: 50 }}
            >
              <View style={{ borderRadius: 50, padding: 10 }}>
                <Image
                  style={{
                    height: HEIGHT / 18,
                    width: WIDTH / 10,
                  }}
                  source={require("../../../../assets/greenc.png")}
                />
              </View>
            </LinearGradient>
            <Text style={styles.text}>Road Trip</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Surprise")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            {/* <Feather name="search" style={styles.icon} color="black" /> */}

            <LinearGradient
              // colors={["#A6C5CD", "#D7EDF3"]}
              colors={["#cfeeec", "#cfeeec"]}
              style={{ padding: 6, alignItems: "center", borderRadius: 50 }}
            >
              <View
                style={{
                  borderColor: "#cfeeec",

                  borderRadius: 50,
                  padding: 10,
                }}
              >
                <Image
                  style={{
                    height: HEIGHT / 18,
                    width: WIDTH / 10,
                  }}
                  source={require("../../../../assets/greena.png")}
                />
              </View>
            </LinearGradient>
            <Text style={styles.text}>Surprise Trip</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT / 4.7,
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  // icon: {
  //   fontSize: 55,
  //   width: 100,
  //   height: 100,
  //   borderRadius: 100,
  //   padding: 20,
  //   backgroundColor: "#fff",
  // },
  text: {
    fontSize: 16,
    justifyContent: "space-evenly",
    marginVertical: 10,
    marginHorizontal: 5,
    fontFamily: "Andika",
  },
});
