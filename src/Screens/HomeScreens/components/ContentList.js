import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

const ContentList = ({ title, more, navigation, route, data }) => {
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

  //   console.log(navigation, "hggj");
  //   console.log(data, "jhhjg");
  if (!fontLoaded) {
    console.log("not");
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(route, { name: "" })}
      >
        <Text style={styles.more}>{more}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 20,
    marginLeft: 0,
    fontFamily: "Andika",
  },
  more: {
    fontSize: 15,
    // color: "#EA7773",
    fontFamily: "Andika",
    marginRight: 15,
  },
});
export default ContentList;
