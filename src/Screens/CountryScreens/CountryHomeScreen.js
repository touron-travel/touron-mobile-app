import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import SearchBar from "../../Reusable Components/SearchBar";
import useData from "../../hooks/useData";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CountryHomeScreen = ({ navigation }) => {
  const [country] = useData();
  const [loader, setLoader] = useState(true);
  // const [loader, setLoader] = useState(true);

  const showLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };
  console.log(country);

  useEffect(() => {
    showLoader();
  }, []);
  return (
    <View style={styles.container}>
      {loader ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <SearchBar />
          {/* <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#FAFAFC",
                padding: 5,
                borderRadius: 25,
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "200" }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FAFAFC",
                padding: 10,
                borderRadius: 25,
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "200" }}>Weather</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FAFAFC",
                padding: 10,
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "200" }}>
                Travel Duration
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FAFAFC",
                padding: 10,
                borderRadius: 23,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "200" }}>
                Visa On Arrival
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FAFAFC",
                padding: 10,
                borderRadius: 23,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "200" }}>
                Travel Days
              </Text>
            </TouchableOpacity>
          </View> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={country}
            keyExtractor={(c) => c._id}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CountryInner", { item: item });
                  }}
                >
                  <View style={styles.imageContainer}>
                    <View>
                      <Text style={styles.name}>{item.countryName}</Text>
                      <Image
                        style={styles.image}
                        source={{ uri: item.imageUrl }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default CountryHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 70,
  },
  imageContainer: {
    padding: 5,
    position: "relative",
  },
  image: {
    height: HEIGHT / 3.25,
    width: WIDTH / 2.25,
    justifyContent: "space-around",
    borderRadius: 18,
    flexDirection: "row",
  },
  name: {
    position: "absolute",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Roboto",
    zIndex: 1,
    top: 10,
    left: 20,
  },
});
