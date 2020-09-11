import React, { useState, useEffect } from "react";
import touron from "../../api/touron";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { ScrollView } from "react-native-gesture-handler";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CityHomeScreen = ({ navigation, route }) => {
  const [city, setCity] = useState([]);
  const [error, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(true);
  const [cityName, setCityName] = useState("");

  const showLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  const getCity = async () => {
    console.log(route.params.name, "kk");
    if (route.params.name) {
      try {
        const cityResponse = await touron.get("/city");
        const data = cityResponse.data.filter((d) => {
          return d.countryName == route.params.name;
        });
        setCity(data);
      } catch (err) {
        setErrorMessage("Something went wrong");
      }
    } else {
      try {
        const cityResponse = await touron.get("/city");
        console.log(cityResponse.data, "hghjgjgh");
        setCity(cityResponse.data);
      } catch (err) {
        setErrorMessage("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getCity(), showLoader();
  }, []);

  const search = () => {
    console.log(cityName, "NAME");

    if (city.length > 0) {
      const d = city.filter((c) => {
        return c.cityName
          .trim()
          .toUpperCase()
          .includes(cityName.trim().toUpperCase());
      });
      console.log(d, "popopopopop");
      return d;
      // setVisa(d);
    }
  };

  return (
    <View style={styles.container}>
      {loader ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View style={styles.background}>
            <Feather name="search" style={styles.iconStyle}></Feather>
            <TextInput
              style={styles.inputStyle}
              placeholder="Search"
              onChangeText={(value) => setCityName(value)}
              onSubmitEditing={search}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={search()}
            keyExtractor={(c) => c._id}
            numColumns={2}
            renderItem={({ item, index }) => {
              console.log(item, "ITEM");

              // return (
              //   <View
              //     style={{
              //       flex: 1,
              //       justifyContent: "center",
              //       alignItems: "center",
              //     }}
              //   >
              //     <Text>No countriesbasd on your result</Text>
              //   </View>
              // );

              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CityInner", { item: item });
                  }}
                >
                  <View style={styles.imageContainer}>
                    <View>
                      <Text style={styles.name}>{item.cityName}</Text>
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

export default CityHomeScreen;

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

    zIndex: 1,
    top: 10,
    left: 20,
  },
  background: {
    backgroundColor: "#fff",
    height: HEIGHT / 15,
    borderRadius: 20,
    flexDirection: "row",
    // borderWidth: 1,
    width: WIDTH * 0.9,
    marginVertical: 20,
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
});
