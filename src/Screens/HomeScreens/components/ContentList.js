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

const ContentList = ({ title, more, navigation, route, data, content }) => {
  // const [fontLoaded, setFont] = useState(false);

  // const fetchFont = async () => {
  //   await Font.loadAsync({
  //     Andika: require("../../../../assets/fonts/Andika-Regular.ttf"),
  //   });
  //   setFont(true);
  // };
  // useEffect(() => {
  //   fetchFont();
  // }, []);

  // //   console.log(navigation, "hggj");
  // //   console.log(data, "jhhjg");
  // if (!fontLoaded) {
  //   console.log("not");
  //   return <AppLoading />;
  // }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text
          style={{
            marginTop: 5,
            marginBottom: 10,
            fontFamily: "WSansl",
            fontStyle: "normal",
            fontWeight: "900",
          }}
        >
          {content}
        </Text>
      </View>
      {more === "" ? null : (
        <TouchableOpacity
          onPress={() => navigation.navigate(route, { name: "" })}
        >
          <Text style={styles.more}>{more}</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 18,
    marginLeft: 0,
    marginTop: 30,
    fontFamily: "NewYorkl",
    fontStyle: "normal",
  },
  more: {
    fontSize: 10,
    // color: "#EA7773",
    // fontFamily: "Roboto",
    marginTop: -6,
    marginRight: 10,
    backgroundColor: "#626E7B",
    color: "white",
    padding: 8,
    borderRadius: 5,
  },
});
export default ContentList;
