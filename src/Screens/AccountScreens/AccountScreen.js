import React, { useState, useEffect, useContext, useMemo } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import * as firebase from "firebase";

import { Container, Header, Content, List, ListItem, Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { AuthContext } from "../../context/AuthContext";
const AccountScreen = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userDetails = firebase.auth().currentUser;
    setUser(userDetails);
  }, [user]);

  console.log(userData, "klklkl");
  const getToken = async () => {
    try {
      const data = await AsyncStorage.getItem("userToken");
      const userToken = JSON.parse(data);
      console.log(userToken, "Token");
      if (userToken !== null) {
        setIsLoggedIn(true);
        setUserData(userToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  //  console.log(user, "USER");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
      }}
    >
      {isLoggedIn ? (
        <View>
          <View
            style={{
              width: WIDTH,
              height: HEIGHT / 4,
              backgroundColor: "#28C9E1",
            }}
          ></View>
          <Container
            style={{
              flex: 1,
              height: HEIGHT,
              backgroundColor: "#FFF",
              top: -14,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
          >
            <Content>
              <List showsVerticalScrollIndicator={false}>
                <TouchableOpacity>
                  <ListItem style={{ marginTop: 30 }}>
                    {/* <Feather
                      name="inbox"
                      size={30}
                      color="black"
                      style={{ marginRight: 20 }}
                    /> */}
                    <Image
                      style={{ height: 30, width: 30, marginRight: 20 }}
                      source={require("../../../assets/Drawer Icons/Profile.png")}
                    />
                    <Text>My Request</Text>
                  </ListItem>
                </TouchableOpacity>
                <TouchableOpacity>
                  <ListItem>
                    <Feather
                      name="bookmark"
                      size={30}
                      color="black"
                      style={{ marginRight: 20 }}
                    />
                    <Text>My Plans</Text>
                  </ListItem>
                </TouchableOpacity>
                <TouchableOpacity>
                  <ListItem>
                    <Feather
                      name="heart"
                      size={30}
                      color="black"
                      style={{ marginRight: 20 }}
                    />
                    <Text>Wish List </Text>
                  </ListItem>
                </TouchableOpacity>
                <ListItem>
                  <FontAwesome
                    name="support"
                    size={30}
                    color="black"
                    style={{ marginRight: 20 }}
                  />
                  <Text>Support</Text>
                </ListItem>
                <ListItem>
                  <MaterialCommunityIcons
                    name="account-circle-outline"
                    size={30}
                    color="black"
                    style={{ marginRight: 20 }}
                  />
                  <Text>Profile</Text>
                </ListItem>
                <ListItem>
                  <MaterialCommunityIcons
                    name="passport"
                    size={30}
                    color="black"
                    style={{ marginRight: 20 }}
                  />
                  <Text>Visa Details</Text>
                </ListItem>
              </List>
            </Content>
          </Container>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
              firebase.auth().signOut();
              setUser(null);
              setIsLoggedIn(false);
            }}
          >
            <ListItem>
              <Feather
                name="log-out"
                size={30}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text>Log Out</Text>
            </ListItem>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignInScreen");
          }}
        >
          <View
            style={{
              backgroundColor: "#28C9E1",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontFamily: "Avenir" }}> Log In</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* <Progress.Bar progress={0.3} width={200} />
      <Progress.Pie progress={0.4} size={50} />
      <Progress.Circle size={30} indeterminate={true} /> */}
      {/* <Progress.CircleSnail color={["red", "green", "blue"]} /> */}

      {/* <View>
        <Text>Apple</Text>
        <Divider />
        <Text>Orange</Text>
        <Divider />
      </View> */}
      {/* <View style={{ alignItems: "center" }}>
        <Image
          style={{ height: 250, width: 250, borderRadius: 40 }}
          source={require("../../../assets/logo.jpeg")}
        />
      </View> */}
    </View>
  );
};

export default AccountScreen;
