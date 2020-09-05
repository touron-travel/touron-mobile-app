import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import touron from "../../api/touron";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import useData from "../../hooks/useData";
import { Surface } from "react-native-paper";
const BlogInnerScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const [click, setClick] = useState(false);
  const [country, city, tour, errorMessage] = useData();

  const filteredTour = (name) => {
    return tour.filter((c) => {
      return c.cityName.includes(name);
    });
  };

  console.log(filteredTour(), "cjnjhjlg");

  useEffect(() => {
    filteredTour();
  }, []);

  //console.log(item, "ITEM");
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View
        style={{
          // backgroundColor: "#333",
          height: HEIGHT / 10,
          alignItems: "center",
          //  justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Blog")}>
          <View style={{ flex: 0.2 }}>
            <MaterialCommunityIcons name="home" color="red" size={260} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 0.8,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>My Requests</Text>
        </View>
      </View>
      <View>
        <Image
          style={{ width: WIDTH, height: HEIGHT / 3 }}
          source={{ uri: item.imageSrc }}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            backgroundColor: "transparent",
            borderColor: "black",
            padding: 8,
            margin: 8,
            fontSize: 12,
            fontFamily: "WSansl",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          {item.countryName}
        </Text>
        {item.cityName.length == 0 ? null : (
          <Text
            style={{
              backgroundColor: "transparent",
              borderColor: "black",
              padding: 8,
              margin: 8,
              fontSize: 12,
              fontFamily: "WSansl",
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            {item.cityName[0]}
          </Text>
        )}

        {!click ? (
          <TouchableOpacity onPress={() => setClick(true)}>
            {item.cityName.length > 2 ? (
              <Text>+ {item.cityName.length - 1}</Text>
            ) : null}
          </TouchableOpacity>
        ) : (
          <>
            {item.cityName.map((c, index) => {
              if (index > 0) {
                return (
                  <Text
                    style={{
                      backgroundColor: "transparent",
                      position: "relative",
                      borderColor: "black",
                      padding: 8,
                      margin: 5,
                      fontSize: 12,
                      fontFamily: "WSansl",
                      borderWidth: 1,
                      zIndex: 10,
                      borderRadius: 10,
                    }}
                  >
                    {c}
                  </Text>
                );
              }
            })}
            <TouchableOpacity onPress={() => setClick(false)}>
              <View style={{ bottom: 10, zIndex: 20 }}>
                <Text
                  style={{
                    //   borderWidth: 1,
                    //   borderRadius: 50,

                    padding: 3,
                    fontSize: 20,
                    fontFamily: "Avenir",
                    //  zIndex: 100,
                  }}
                >
                  X
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text style={{ fontFamily: "NewYorkl", fontSize: 30, margin: 10 }}>
        {item.blogTitle}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <Image
            style={{ width: WIDTH / 8, height: WIDTH / 8, borderRadius: 50 }}
            source={require("../../../assets/logo.jpeg")}
          />
        </View>
        <Text style={{ fontFamily: "Andika", fontSize: 18 }}>
          PUBLISHED {item.createdAt.slice(0, 10)} {"\n"}by tour On Team
        </Text>
      </View>

      <Text
        style={{
          marginVertical: 10,
          marginHorizontal: 15,
          fontSize: 15,
          lineHeight: HEIGHT / 40,
        }}
      >
        {item.content}
      </Text>

      {item.subHeading1 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading1}
          </Text>
        </View>
      )}
      {item.imageSrc1 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc1 }}
          />
        </View>
      )}
      {item.content1 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content1}
        </Text>
      )}

      <FlatList
        data={filteredTour(item.subHeading1)}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          console.log(item, "ITEN");
          return (
            <Surface
              style={{
                width: WIDTH / 3,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
            >
              <View>
                <Image
                  style={{ height: WIDTH / 2.5, height: HEIGHT / 8 }}
                  source={{ uri: item.imageUrl }}
                />
                <Text style={{ fontSize: 16, fontFamily: "Avenir" }}>
                  {item.tourName}
                </Text>
              </View>
            </Surface>
          );
        }}
      />
      {item.subHeading2 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading2}
          </Text>
        </View>
      )}
      {item.imageSrc2 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc2 }}
          />
        </View>
      )}
      {item.content2 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content2}
        </Text>
      )}

      <FlatList
        data={filteredTour(item.subHeading2)}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          console.log(item, "ITEN");
          return (
            <Surface
              style={{
                width: WIDTH / 3,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
            >
              <View>
                <Image
                  style={{ height: WIDTH / 2.5, height: HEIGHT / 8 }}
                  source={{ uri: item.imageUrl }}
                />
                <Text style={{ fontSize: 16, fontFamily: "Avenir" }}>
                  {item.tourName}
                </Text>
              </View>
            </Surface>
          );
        }}
      />
      {item.subHeading3 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading3}
          </Text>
        </View>
      )}
      {item.imageSrc3 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc3 }}
          />
        </View>
      )}
      {item.content3 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content3}
        </Text>
      )}

      <FlatList
        data={filteredTour(item.subHeading3)}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          console.log(item, "ITEN");
          return (
            <Surface
              style={{
                width: WIDTH / 3,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
            >
              <View>
                <Image
                  style={{ height: WIDTH / 2.5, height: HEIGHT / 8 }}
                  source={{ uri: item.imageUrl }}
                />
                <Text style={{ fontSize: 16, fontFamily: "Avenir" }}>
                  {item.tourName}
                </Text>
              </View>
            </Surface>
          );
        }}
      />
      {item.subHeading4 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading4}
          </Text>
        </View>
      )}
      {item.imageSrc4 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc4 }}
          />
        </View>
      )}
      {item.content4 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content4}
        </Text>
      )}

      <FlatList
        data={filteredTour(item.subHeading4)}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          console.log(item, "ITEN");
          return (
            <Surface
              style={{
                width: WIDTH / 3,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
            >
              <View>
                <Image
                  style={{ height: WIDTH / 2.5, height: HEIGHT / 8 }}
                  source={{ uri: item.imageUrl }}
                />
                <Text style={{ fontSize: 16, fontFamily: "Avenir" }}>
                  {item.tourName}
                </Text>
              </View>
            </Surface>
          );
        }}
      />
      {item.subHeading4 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading4}
          </Text>
        </View>
      )}
      {item.imageSrc5 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc5 }}
          />
        </View>
      )}
      {item.content5 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content5}
        </Text>
      )}

      <FlatList
        data={filteredTour(item.subHeading5)}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          console.log(item, "ITEN");
          return (
            <Surface
              style={{
                width: WIDTH / 3,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
            >
              <View>
                <Image
                  style={{ height: WIDTH / 2.5, height: HEIGHT / 8 }}
                  source={{ uri: item.imageUrl }}
                />
                <Text style={{ fontSize: 16, fontFamily: "Avenir" }}>
                  {item.tourName}
                </Text>
              </View>
            </Surface>
          );
        }}
      />
      {item.subHeading6 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading6}
          </Text>
        </View>
      )}
      {item.imageSrc6 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc6 }}
          />
        </View>
      )}
      {item.content6 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content6}
        </Text>
      )}

      <FlatList
        data={filteredTour(item.subHeading6)}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          console.log(item, "ITEN");
          return (
            <Surface
              style={{
                width: WIDTH / 3,
                marginHorizontal: 5,
                marginVertical: 10,
              }}
            >
              <View>
                <Image
                  style={{ height: WIDTH / 2.5, height: HEIGHT / 8 }}
                  source={{ uri: item.imageUrl }}
                />
                <Text style={{ fontSize: 16, fontFamily: "Avenir" }}>
                  {item.tourName}
                </Text>
              </View>
            </Surface>
          );
        }}
      />
    </ScrollView>
  );
};

export default BlogInnerScreen;
