import React from "react";
import {
  Text,
  Image,
  View,
  Dimensions,
  Linking,
  ScrollView,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ContactUs = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View
        style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
      >
        <Image
          style={{ height: HEIGHT / 3, width: HEIGHT / 3 }}
          source={require("../../../assets/playstore.png")}
        />
      </View>
      <View style={{ marginHorizontal: 5 }}>
        <Text style={{ fontSize: 25, fontFamily: "NewYorkl" }}>Contact Us</Text>
        <Text style={{ fontFamily: "Andika", fontSize: 15, margin: 15 }}>
          tour On{"\n"}Workafella, Rathha Towers,{"\n"}Tek Meadows - A Block,
          4th Floor,{"\n"}Opposite to Accenture, Sholinganallur,{"\n"}OMR,
          Chennai-119{"\n"}Contact No:8667801206
        </Text>
      </View>
      <View style={{ marginHorizontal: 5 }}>
        <Text style={{ fontFamily: "Andika", fontSize: 15, margin: 15 }}>
          tour On{"\n"}The Hive,{"\n"}Level 3 VR Mall Next to Madras
          House(Landmark),{"\n"}Thirumangalam, Chennai-40
          {"\n"}Contact No:8667801206
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContactUs;
