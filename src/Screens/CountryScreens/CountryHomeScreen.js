import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as firebase from "firebase";
import useData from "../../hooks/useData";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CountryHomeScreen = ({ navigation }) => {
  const [country] = useData();
  const [loader, setLoader] = useState(true);
  // const [loader, setLoader] = useState(true);
  const [countryName, setCountryName] = useState("");

  const showLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };
  console.log(country);

  // const getCountry = () => {
  //   firebase
  //     .database()
  //     .ref(`countries/`)
  //     .on("value", (data) => {
  //       if (data) {
  //         let pT = [];
  //         data.forEach((c) => {
  //           pT.push(c.val());
  //         });
  //         setCountry(pT);
  //       }
  //     });
  // };

  useEffect(() => {
    // getCountry();
    showLoader();
  }, []);

  const search = () => {
    console.log(countryName, "NAME");

    if (country.length > 0) {
      const d = country.filter((c) => {
        return c.countryName
          .trim()
          .toUpperCase()
          .includes(countryName.trim().toUpperCase());
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
              onChangeText={(value) => setCountryName(value)}
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

    zIndex: 1,
    top: 10,
    left: 20,
  },
  background: {
    backgroundColor: "#fff",
    height: HEIGHT / 15,
    borderRadius: 20,
    flexDirection: "row",
    //  borderWidth: 1,
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
