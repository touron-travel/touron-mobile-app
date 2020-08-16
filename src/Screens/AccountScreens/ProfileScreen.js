import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const ProfileScreen = () => {
  return (
    <Animatable.View
      animation="bounceIn"
      duration={3000}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Profile</Text>
    </Animatable.View>
  );
};

export default ProfileScreen;
