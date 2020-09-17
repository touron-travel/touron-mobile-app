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
  ActivityIndicator
} from "react-native";
import touron from "../../api/touron";
import * as firebase from "firebase";
import { Surface } from "react-native-paper";
import ContentList from "../HomeScreens/components/ContentList";
import { TouchableOpacity } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const BlogHomeScreen = ({ navigation }) => {
  const [blog, setBlog] = useState([]);
  
  const [loaded, setLoaded] = useState(true);
  

  const getBlog = async () => {
    const blogResponse = await touron.get("/blog");
    console.log(blogResponse.data, "lll");
    setBlog(blogResponse.data);
    
   
  };

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 1000);

    getBlog();
  }, []);

 
   
  
  return (
    <ScrollView>

      <View style={{ marginHorizontal: 25 }}>
        <ContentList
          title={"Blogs Name"}
          more={""}
          content={"Content Goes Here"}
        />
      </View>
      {loaded ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
      <FlatList
        numColumns={2}
        data={blog}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <View style={{ marginHorizontal: 15 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("BlogInner", { item: item })}
              >
                <Surface
                  style={{
                    width: WIDTH / 2.4,
                    marginHorizontal:0,
                    marginLeft: 0,
                    marginVertical: 10,
                    borderRadius: 20,
                    elevation: 5,
                    height: HEIGHT / 2.4,
                  }}
                >
                  <View>
                    <Image
                      style={{
                        height: HEIGHT / 4.8,
                        width: WIDTH / 2.4 ,
                        borderRadius: 15,
                      }}
                      source={{ uri: item.imageSrc }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
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
                      {item.content.slice(0, 50)}...
                    </Text>
                  </View>
                </Surface>
              </TouchableOpacity>
            </View>
          );
        }}
      />
        )  }
     
    </ScrollView>
  );
};

export default BlogHomeScreen;
