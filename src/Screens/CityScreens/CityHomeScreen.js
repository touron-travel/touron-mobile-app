import React, { useState, useEffect } from "react";
import touron from "../../api/touron";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
// import useData from "../../hooks/useData";
import SearchBar from "../../Reusable Components/SearchBar";
import { ScrollView } from "react-native-gesture-handler";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CityHomeScreen = ({ navigation, route }) => {
  const [city, setCity] = useState([]);
  const [error, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(true);

  const showLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  const getCity = async () => {
    console.log(route.params.name, "kk");
    if (route.params.name) {
      try {
        const cityResponse = await touron.get("/city");
        const data = cityResponse.data.filter((d) => {
          // console.log(d, name);
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

  // console.log(city);
  return (
    <View style={styles.container}>
      {loader ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <SearchBar />

          <FlatList
            showsVerticalScrollIndicator={false}
            data={city}
            keyExtractor={(c) => c._id}
            numColumns={2}
            renderItem={({ item }) => {
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
    fontFamily: "Roboto",
    zIndex: 1,
    top: 10,
    left: 20,
  },
});
