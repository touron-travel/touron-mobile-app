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
import * as Network from "expo-network";
import Categories from "./components/CategoriesScreen";
import ContentList from "./components/ContentList";
import { Feather, AntDesign } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import { AuthContext } from "../../context/AuthContext";

const HomeScreen = ({ navigation, route }) => {
  const [country, city, tour, errorMessage] = useData();
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState();

  const [loaded, setLoaded] = useState(true);
  console.log(user, "DATA");

  const getNetwork = async () => {
    const status = await (await Network.getNetworkStateAsync()).isConnected;
    console.log(status, "STATUS");
    setStatus(status);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        setLoaded(false);
      }, 2000);

      getNetwork();
    }

    return () => (mounted = false);
  });

  const filteredCountry = () => {
    if (country.length > 0)
      return country.filter((c) => {
        return c.general.bestTimeToVisit.includes("October");
      });
  };
  const filteredCity = () => {
    if (city.length > 0)
      return city.filter((c) => {
        return c.travelDuration == "8-10 hours";
      });
  };
  const filteredTour = () => {
    if (tour.length > 0)
      return tour.filter((c) => {
        return c.idealType.includes("Young Couple");
      });
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      {status ? (
        <View style={styles.container}>
          <View>
            <TouchableOpacity>
              <View style={{ height: HEIGHT / 10, width: HEIGHT / 10 }}>
                <Feather
                  name="menu"
                  size={28}
                  color="black"
                  style={{ paddingHorizontal: 10, paddingTop: 20 }}
                  onPress={() => navigation.toggleDrawer()}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: window.width,
              flexDirection: "row",
              marginRight: WIDTH / 20,
            }}
          >
            {/* {user == null ? (
              <Text style={styles.title}>Hey, Start Planning your...</Text>
            ) : (
              <Text style={styles.title}>
                Hey, {user.displayName} Start Planning your...
              </Text>
            )} */}
            <Text style={styles.title}>Hey, Start Planning your...</Text>
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
                          source={{
                            uri:
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAADWCAMAAAAHMIWUAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB3A8VIAAFqm4S1AAAAAElFTkSuQmCC",
                          }}
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
      ) : (
        <>
          <View style={{ width: WIDTH, height: HEIGHT }}>
            <Text>vg</Text>
          </View>
        </>
      )}
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
    // fontFamily: "Roboto",
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
