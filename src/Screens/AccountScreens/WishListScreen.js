import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WishListScreen = () => {
  return (
    <Animatable.View
      animation="bounceIn"
      duration={3000}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Wish List</Text>
    </Animatable.View>
  );
};

export default WishListScreen;
