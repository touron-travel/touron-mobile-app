import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import touron from "../../api/touron";

import { Surface } from "react-native-paper";
import ContentList from "../HomeScreens/components/ContentList";
import { TouchableOpacity } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const BlogHomeScreen = ({ navigation }) => {
  const [blog, setBlog] = useState([]);
  console.log(blog, "llk");

  const getBlog = async () => {
    const blogResponse = await touron.get("/blog");
    console.log(blogResponse.data, "lll");
    setBlog(blogResponse.data);
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 25 }}>
        <ContentList
          title={"Blogs Name"}
          more={""}
          content={"Content Goes Here"}
        />
      </View>

      <FlatList
        data={blog}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          console.log(item);
          return (
            <View style={{ marginHorizontal: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("BlogInner", { item: item })}
              >
                <Surface
                  style={{
                    width: WIDTH / 1.5,
                    marginHorizontal: 0,
                    marginLeft: 0,
                    marginVertical: 10,
                    borderRadius: 20,
                  }}
                >
                  <View>
                    <Image
                      style={{
                        height: HEIGHT / 4.8,
                        width: WIDTH / 1.5,
                        borderRadius: 15,
                      }}
                      source={{ uri: item.imageSrc }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "NewYorkl",
                        marginHorizontal: 10,
                        marginTop: 10,
                      }}
                    >
                      {item.blogTitle}
                    </Text>
                  </View>
                  <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 14, fontFamily: "Andika" }}>
                      {item.content.slice(0, 150)}...
                    </Text>
                  </View>
                </Surface>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default BlogHomeScreen;
