import React, { useState, useEffect } from "react";
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
import * as Font from "expo-font";
import SearchBar from "../../Reusable Components/SearchBar";
import Categories from "./components/CategoriesScreen";
import ContentList from "./components/ContentList";
import { Feather, AntDesign } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const HomeScreen = ({ navigation, route }) => {
  const [country, city, tour, errorMessage] = useData();
  const [fontLoaded, setFont] = useState(false);
  const [imageLoaded, setImage] = useState(false);
  const [userData, setUserData] = useState({});

  const fetchFont = async () => {
    await Font.loadAsync({
      // Futura: require("../../../assets/fonts/Futura Std Medium.ttf"),
      Andika: require("../../../assets/fonts/Andika-Regular.ttf"),
      Avenir: require("../../../assets/fonts/AvenirLTStd-Black.otf"),
    });

    setImage(true);
    setFont(true);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchFont();
    }
    return () => (mounted = false);
  }, []);

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
      return c.general.bestTimeToVisit.includes("September");
    });
  };
  const filteredCity = () => {
    return city.filter((c) => {
      // console.log(c.travelDuration);
      return c.travelDuration == "6-8 hours";
    });
  };
  const filteredTour = () => {
    return tour.filter((c) => {
      //  console.log(c.tourCategory.includes("Honeymoon"));
      return c.idealType.includes("Mature Couple");
      //return c.trending == "Yes";
    });
  };

  if (!fontLoaded) {
    // console.log("not");
    return <AppLoading />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* <View style={{ marginTop: 20 }}>
          <SearchBar />
        </View> */}
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ height: 80, width: 80 }}>
            <Feather
              name="menu"
              size={28}
              color="black"
              style={{ paddingHorizontal: 20, paddingTop: 20 }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: window.width,
            flexDirection: "row",
            // justifyContent: "space-evenly",
            marginHorizontal: 15,
            marginTop: 20,
          }}
        >
          <Text style={styles.title}>
            Hi {userData.displayName ? userData.displayName : "welcome"} ,have a
            wonderful journey
          </Text>
        </View>

        <Categories navigation={navigation} />
        <ContentList
          route={"CountryHome"}
          navigation={navigation}
          title={"Popular Countries"}
          more={"Show More"}
        />
        <FlatList
          data={filteredCountry()}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(d) => d._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CountryInner", { item: item });
                }}
              >
                <View style={styles.tileStyle}>
                  <Text style={styles.name}>{item.countryName}</Text>
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
          route={"CityHome"}
          navigation={navigation}
          title={"Marvelous Cities"}
          more={"Show More"}
        />
        <FlatList
          data={filteredCity()}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(d) => d._id}
          renderItem={({ item }) => {
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
        />
        <FlatList
          data={filteredTour()}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(d) => d._id}
          renderItem={({ item }) => {
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
        <ContentList
          route={"BlogHome"}
          navigation={navigation}
          title={"Blogs"}
          more={"Show More"}
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
    fontSize: 18,
    fontFamily: "Andika",
    zIndex: 1,
    bottom: 15,
    position: "absolute",
    color: "white",
    fontWeight: "400",
    padding: 0,
    left: 10,
    margin: 0,
  },
  title: {
    fontSize: 35,
    fontFamily: Platform.OS == "android" ? "serif" : "Academy Engraved LET",
    marginLeft: 10,
  },
});

export default HomeScreen;
