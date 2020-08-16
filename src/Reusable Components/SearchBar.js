import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, TextInput, Image, StyleSheet, Dimensions } from "react-native";
import Search from "../.././assets/Search.png";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SearchBar = () => {
  return (
    <View style={styles.background}>
      <Feather name="search" style={styles.iconStyle}></Feather>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        // onChangeText = {onTermChange}
        // onEndEditing={onTermSubmitted}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  background: {
    height: HEIGHT / 14,
    borderRadius: 15,
    flexDirection: "row",
    marginVertical: 10,
    width: WIDTH * 1 - 30,
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
  // iconStyle: {
  //   height: 40,
  //   width: 40,
  //   alignSelf: "center",
  // },
});

export default SearchBar;
