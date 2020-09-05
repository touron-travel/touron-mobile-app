import React, { useState, useEffect, useContext } from "react";
import { AppLoading } from "expo";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import useData from "../../hooks/useData";

import Categories from "./components/CategoriesScreen";
import ContentList from "./components/ContentList";
import { Feather, AntDesign } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import { AuthContext } from "../../context/AuthContext";

const HomeScreen = ({ navigation, route }) => {
  const [country, city, tour, errorMessage] = useData();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [loaded, setLoaded] = useState(true);
  //console.log(userData, "DATA");

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 1500);
  });

  const getToken = async () => {
    try {
      const data = await AsyncStorage.getItem("userToken");
      const userToken = JSON.parse(data);
      console.log(userToken, "TOKEn");
      if (userToken !== null) {
        setUserData(userToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const filteredCountry = () => {
    return country.filter((c) => {
      // console.log(c.general.bestTimeToVisit.includes("August"));
      // return c.visa.onArrival == "NO";
      return c.general.bestTimeToVisit.includes("October");
    });
  };
  const filteredCity = () => {
    return city.filter((c) => {
      // console.log(c.travelDuration);
      return c.travelDuration == "8-10 hours";
    });
  };
  const filteredTour = () => {
    return tour.filter((c) => {
      // console.log(c.tourCategory.includes("Family"));
      return c.idealType.includes("Young Couple");
      //return c.trending == "Yes";
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* <View style={{ marginTop: 20 }}>
          <SearchBar />
        </View> */}
        <View>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View style={{ height: 60, width: 60 }}>
              <Feather
                name="menu"
                size={28}
                color="black"
                style={{ paddingHorizontal: 10, paddingTop: 20 }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: window.width,
            flexDirection: "row",
            // justifyContent: "space-evenly",
            marginRight: WIDTH / 20,
            // marginTop: 20,
          }}
        >
          {user == null ? (
            <Text style={styles.title}>Hey, Start Planning your...</Text>
          ) : (
            <Text style={styles.title}>
              Hey, {user.displayName} Start Planning your...
            </Text>
          )}
        </View>
        <ContentList
          route={"CountryHome"}
          navigation={navigation}
          title={"Tour Categories"}
          more={""}
          content={"Content Goes Here"}
        />
        <Categories navigation={navigation} />
        <ContentList
          route={"CountryHome"}
          navigation={navigation}
          title={"Popular Countries"}
          more={"Show More"}
          content={"Content Goes Here"}
        />
        <FlatList
          data={filteredCountry()}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(d) => d._id}
          renderItem={({ item, index }) => {
            if (index < 5)
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CountryInner", { item: item });
                  }}
                >
                  <View style={styles.tileStyle}>
                    <Text style={styles.name}>{item.countryName}</Text>

                    {loaded ? (
                      <Image
                        fadeDuration={1000}
                        style={styles.cityImage}
                        source={require("../../../assets/person.png")}
                      />
                    ) : (
                      <Image
                        fadeDuration={1000}
                        style={styles.cityImage}
                        source={{ uri: item.imageUrl }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
          }}
        />
        <ContentList
          route={"CityHome"}
          navigation={navigation}
          title={"Marvelous Cities"}
          more={"Show More"}
          content={"Content Goes Here"}
        />
        <FlatList
          data={filteredCity()}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(d) => d._id}
          renderItem={({ item, index }) => {
            if (index < 5)
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CityInner", { item: item });
                  }}
                >
                  <View style={styles.tileStyle}>
                    <Text style={styles.name}>{item.cityName}</Text>
                    <Image
                      fadeDuration={1000}
                      style={styles.cityImage}
                      source={{ uri: item.imageUrl }}
                    />
                  </View>
                </TouchableOpacity>
              );
          }}
        />
        <ContentList
          route={"TourHome"}
          navigation={navigation}
          title={"Curated Tours"}
          more={"Show More"}
          content={"Content Goes Here"}
        />
        <FlatList
          data={filteredTour()}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(d) => d._id}
          renderItem={({ item, index }) => {
            if (index < 4)
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("TourInner", { item: item });
                  }}
                >
                  <View style={styles.tileStyle}>
                    <Text style={styles.name}>{item.tourName}</Text>

                    <Image
                      fadeDuration={1000}
                      style={styles.tourImage}
                      source={{ uri: item.imageUrl }}
                    />
                  </View>
                </TouchableOpacity>
              );
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cityImage: {
    height: HEIGHT / 3.8 + 10,
    width: WIDTH / 2.8,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 10,
  },
  tourImage: {
    height: HEIGHT / 3.8,
    width: WIDTH / 1.2,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 10,
  },
  container: {
    paddingTop: 30,
    flex: 1,
    padding: 15,
    backgroundColor: "#FFF",
  },
  tileStyle: {
    flexDirection: "column",
    position: "relative",
  },
  name: {
    fontSize: 17,
    fontFamily: "Roboto",
    zIndex: 1,
    bottom: 15,
    position: "absolute",
    color: "white",
    fontWeight: "300",
    padding: 0,
    left: 10,
    margin: 0,
  },
  title: {
    fontSize: 35,
    color: "#626E7B",
    fontFamily: Platform.OS == "android" ? "NewYorkl" : "Academy Engraved LET",
    marginLeft: 10,
  },
});

export default HomeScreen;
