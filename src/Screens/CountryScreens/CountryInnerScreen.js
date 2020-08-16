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
    // <ScrollView>
    //   <View style={styles.container}>

    //     <Image style={styles.image} source={{ uri: item.imageUrl }} />
    //     <View style={styles.imageDetail}>
    //       <View style={{ marginLeft: 20, marginTop: 15 }}>
    //         <View style={{ flexDirection: "row" }}>
    //           <Image
    //             style={{ height: 25, width: 25 }}
    //             source={require("../../../assets/Star.png")}
    //           />
    //           <Image
    //             style={{ height: 25, width: 25 }}
    //             source={require("../../../assets/Star.png")}
    //           />
    //           <Image
    //             style={{ height: 25, width: 25 }}
    //             source={require("../../../assets/Star.png")}
    //           />
    //           <Image
    //             style={{ height: 25, width: 25 }}
    //             source={require("../../../assets/Star.png")}
    //           />

    //           <Image
    //             style={{ height: 25, width: 25 }}
    //             source={require("../../../assets/Star-grey.png")}
    //           />
    //           <Text
    //             style={{
    //               fontSize: 18,
    //               paddingHorizontal: 10,
    //               fontWeight: "bold",
    //             }}
    //           >
    //             (4.{Math.floor(Math.random() * 8.8)})
    //           </Text>
    //         </View>
    //         <Text style={styles.countryName}>{item.countryName}</Text>
    //       </View>
    //       <View
    //         style={{
    //           width: WIDTH * 0.9,
    //           alignItems: "center",
    //           justifyContent: "center",
    //           backgroundColor: "#F1F3F6",
    //           marginHorizontal: 20,
    //           marginVertical: 5,
    //         }}
    //       >
    //         <Text
    //           style={{
    //             backgroundColor: "#fff",
    //             borderRadius: 30,
    //             padding: 16,
    //             fontFamily: "sans-serif-condensed",
    //             lineHeight: 18,
    //             fontSize: 14,
    //             fontWeight: "700",
    //           }}
    //         >
    //           {item.aboutCountry}
    //         </Text>
    //       </View>

    //       <View
    //         style={{
    //           flexDirection: "row",
    //           flexWrap: "wrap",
    //           marginHorizontal: 5,
    //         }}
    //       >
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             flexBasis: WIDTH / 2.5,
    //             marginVertical: 20,
    //           }}
    //         >
    //           <Image
    //             style={{ height: 50, width: 50, marginLeft: 5 }}
    //             source={require("../../../assets/Sun.png")}
    //           />
    //           <Text
    //             style={{
    //               fontSize: 20,
    //               marginLeft: 5,
    //               justifyContent: "center",
    //             }}
    //           >
    //             {item.weather}
    //           </Text>
    //         </View>

    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             marginVertical: 20,
    //           }}
    //         >
    //           <Image
    //             style={{ height: 50, width: 50, marginLeft: 5 }}
    //             source={require("../../../assets/Umbrella.png")}
    //           />
    //           <Text
    //             style={{
    //               fontSize: 20,
    //               marginLeft: 15,
    //               justifyContent: "center",
    //             }}
    //           >
    //             {item.idealDays}
    //           </Text>
    //         </View>

    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             flexBasis: WIDTH / 2.5,
    //             marginVertical: 20,
    //           }}
    //         >
    //           <Image
    //             style={{ height: 50, width: 50 }}
    //             source={require("../../../assets/Wallet.png")}
    //           />
    //           <Text
    //             style={{
    //               fontSize: 15,
    //               justifyContent: "center",
    //               marginLeft: 5,
    //             }}
    //           >
    //             {item.general.currency}
    //           </Text>
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             marginVertical: 20,
    //           }}
    //         >
    //           <Image
    //             style={{ height: 50, width: 50 }}
    //             source={require("../../../assets/World.png")}
    //           />
    //           <Text
    //             style={{
    //               fontSize: 18,
    //               justifyContent: "center",
    //             }}
    //           >
    //             {item.general.timeZone}
    //           </Text>
    //         </View>

    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             marginVertical: 20,
    //           }}
    //         >
    //           <Image
    //             style={{ height: 50, width: 50, marginLeft: 10 }}
    //             source={require("../../../assets/Backpack.png")}
    //           />
    //           <Text
    //             style={{
    //               fontSize: 15,
    //               flexWrap: "wrap",
    //               justifyContent: "center",
    //             }}
    //           >
    //             {item.general.bestTimeToVisit.join(",")}
    //           </Text>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // </ScrollView>

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
            colors={["#28C9E1", "#1CD5C6"]}
            style={{ padding: 15, alignItems: "center", borderRadius: 15 }}
          >
            <Text style={styles.button}>Explore Cities</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", bottom: 40, position: "absolute" }}
        >
          <Image
            style={{ height: 22, width: 22 }}
            source={require("../../../assets/Star.png")}
          />
          <Image
            style={{ height: 22, width: 22 }}
            source={require("../../../assets/Star.png")}
          />
          <Image
            style={{ height: 22, width: 22 }}
            source={require("../../../assets/Star.png")}
          />
          <Image
            style={{ height: 22, width: 22 }}
            source={require("../../../assets/Star.png")}
          />

          <Image
            style={{ height: 22, width: 22 }}
            source={require("../../../assets/Star-grey.png")}
          />
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 10,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            (4.{Math.floor(Math.random() * 8.8)})
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <View style={{ marginRight: 5, alignItems: "center" }}>
          <Text style={{ fontWeight: "700", fontSize: 15 }}>
            {item.general.timeZone}
          </Text>
          <Text
            style={{
              color: "#2475B0",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "notoserif",
            }}
          >
            Time Difference
          </Text>
        </View>

        <View style={{ marginRight: 10, lignItems: "center" }}>
          <Text style={{ fontWeight: "700", fontSize: 15 }}>
            {item.weather}
          </Text>
          <Text
            style={{
              color: "#2475B0",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "notoserif",
            }}
          >
            Weather
          </Text>
        </View>

        <View style={{ marginRight: 10, alignItems: "center" }}>
          <Text style={{ fontWeight: "700", fontSize: 15 }}>
            {item.visa.onArrival}
          </Text>
          <Text
            style={{
              color: "#2475B0",
              fontSize: 17,
              fontWeight: "bold",
              fontFamily: "notoserif",
            }}
          >
            Visa On Arrival
          </Text>
        </View>
      </View>

      <View
        style={{
          width: WIDTH * 0.9,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          marginHorizontal: 20,
          marginVertical: 25,
        }}
      >
        <Text
          style={{
            backgroundColor: "#F1F3F6",
            borderRadius: 40,
            padding: 16,
            fontFamily: "Roboto",
            lineHeight: 18,
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          {item.aboutCountry}
        </Text>
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
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#FFF",
    fontStyle: "normal",
  },
  button: {
    fontSize: 15,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#FFF",
    fontStyle: "normal",
  },
  // container: {
  //   flex: 1,
  //   position: "relative",
  // },
  // countryName: {
  //   fontSize: 40,
  //   fontFamily: "sans-serif",
  //   fontWeight: "bold",
  //   color: "#626E7B",
  //   fontStyle: "normal",
  // },
  // image: {
  //   height: HEIGHT / 2,
  //   width: WIDTH,
  //   position: "relative",

  // },
  // imageDetail: {
  //   top: -30,
  //   height: HEIGHT,
  //   backgroundColor: "#fff",
  //   borderTopRightRadius: 40,
  //   borderTopLeftRadius: 40,
  // },
  // countryName: {
  //   top: 220,
  //   left: 20,
  //   color: "#FFF",
  //   position: "absolute",
  //   fontSize: 40,
  //   zIndex: 1,
  // },
});
