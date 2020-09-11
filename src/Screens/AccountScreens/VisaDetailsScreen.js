import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
import touron from "../../api/touron";
import { Feather } from "@expo/vector-icons";
const HEIGHT = Dimensions.get("window").height;
const VisaDetailsScreen = ({ navigation }) => {
  const [visa, setVisa] = useState([]);
  const [visaName, setVisaName] = useState("");
  console.log(visa.length, "VISA");
  console.log(visaName, "NAME");
  
  const search = () => {
    console.log(visaName, "NAME");

    if (visa.length > 0) {
      const d = visa.filter((c) => {
        return c.countryName
          .trim()
          .toUpperCase()
          .includes(visaName.trim().toUpperCase());
      });
      console.log(d, "popopopopop");
      return d;
      // setVisa(d);
    }
  };

  const getVisaDetails = async () => {
    const visaResponse = await touron.get("/visa");
    setVisa(visaResponse.data);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getVisaDetails();
    }
    return () => (mounted = false);
  }, []);
  return (
    <View
      animation="bounceIn"
      duration={3000}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          marginTop: HEIGHT / 14,
          width: WIDTH,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View
            style={{
              //flex: 0.2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather
              name="menu"
              size={28}
              color="black"
              style={{ paddingHorizontal: 20 }}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            flex: 1,
          }}
        >
          Select the Country you are Travelling
        </Text>
      </View>
      <View style={styles.background}>
        <Feather name="search" style={styles.iconStyle}></Feather>
        <TextInput
          style={styles.inputStyle}
          placeholder="Search"
          onChangeText={(value) => setVisaName(value)}
          onSubmitEditing={search}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
      </View>
      <FlatList
        data={search()}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <View style={{ alignItems: "center" }}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("VisaInner", { item: item })
                  }
                >
                  <Image
                    style={styles.cityImage}
                    source={{ uri: item.imageUrl }}
                  />
                </TouchableOpacity>
                <Text style={{ textAlign: "center", marginBottom: 5 }}>
                  {item.countryName}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  cityImage: {
    width: 100,
    height: 100,
    margin: 10,
    marginTop: 20,
    borderRadius: 100,
  },
  background: {
    backgroundColor: "#fff",
    height: HEIGHT / 15,
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: WIDTH / 18,
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
export default VisaDetailsScreen;
