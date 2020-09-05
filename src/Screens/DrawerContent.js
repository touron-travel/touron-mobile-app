import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { Feather, AntDesign } from "@expo/vector-icons";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import { AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const DrawerContent = (props) => {
  const { isLoggedIn, setIsLoggedIn, setUser, user } = useContext(AuthContext);
  // const [user, setUser] = useState();
  // console.log(user, "USER");
  const [userData, setUserData] = useState({});
  // console.log(userData.userData.name, "LO");
  // const name = userData.userData.name;
  // console.log(name, "NAME");
  // useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const data = await AsyncStorage.getItem("userToken");
  //       const userToken = JSON.parse(data);
  //      // console.log(userToken.user, "Token");
  //       if (userToken !== null) {
  //         setIsLoggedIn(true);
  //         setUser(userToken.user);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  // getToken();

  // if (isLoggedIn) {
  //   let mounted = true;
  //   if (mounted) {
  //     const userDetails = firebase.auth().currentUser;
  //     console.log(userDetails, "DETAILS");
  //     setUser(userDetails);
  //   }
  //   return () => (mounted = false);
  // }
  // }, []);

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (e) {
      console.log(err);
    }

    console.log("Done.");
  };

  // useEffect(() => {}, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          width: WIDTH * 0.75,
          height: HEIGHT + 30,
          zIndex: -1,
          opacity: 0.9,
        }}
        source={{
          uri:
            "https://images.pexels.com/photos/2108813/pexels-photo-2108813.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
      />

      {isLoggedIn ? (
        <View
          style={{
            // zIndex: 2,
            backgroundColor: "#000000",
            //zIndex: 10,
            width: WIDTH * 0.75,
            height: HEIGHT + 30,
            position: "absolute",
          }}
        >
          <DrawerContentScrollView {...props}>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Image
                style={{ height: 100, width: 100 }}
                source={require("../../assets/clogo.png")}
              />
            </View>
            <View style={{ marginVertical: 40 }}>
              <DrawerItem
                label={() => <Text style={styles.label}>Home</Text>}
                style={{ color: "white" }}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require("../../assets/houses.png")}
                  />
                )}
                onPress={() => props.navigation.navigate("Main")}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>My Requests</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require("../../assets/Planes.png")}
                  />
                )}
                onPress={() => props.navigation.navigate("MyRequest")}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>My Plans</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require("../../assets/flash.png")}
                  />
                )}
                onPress={() => {
                  props.navigation.navigate("MyPlans");
                }}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>Saved Tours</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require("../../assets/heart.png")}
                  />
                )}
                onPress={() => {
                  props.navigation.navigate("WishList");
                }}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>Shop</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require("../../assets/heart.png")}
                  />
                )}
                // onPress={() => {
                //   props.navigation.navigate("WishList");
                // }}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>Profile</Text>}
                icon={() => (
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      // marginLeft: 10,
                      // marginRight: 3,
                    }}
                    source={require("../../assets/Profiles.png")}
                  />
                )}
                onPress={() => {
                  props.navigation.navigate("Profile");
                }}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>Support</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      // marginLeft: 5,
                      // marginRight: 3,
                    }}
                    source={require("../../assets/setting.png")}
                  />
                )}
                onPress={() => {}}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>Visa Assistance</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <View style={{ marginHorizontal: 5 }}>
                    <FontAwesome5 name="passport" size={23} color="#C1C5C6" />
                  </View>
                )}
                onPress={() => {
                  props.navigation.navigate("Visa");
                }}
              />
            </View>
          </DrawerContentScrollView>
          <Drawer.Section>
            {/* <DrawerItem
          label="Settings"
          //   icon={({ color, size }) => <Feather name="menu" />}
          icon={() => (
            <Image
              style={{ height: 30, width: 30 }}
              source={require("../../assets/settings.png")}
            />
          )}
          onPress={() => {}}
        /> */}

            <DrawerItem
              label={() => (
                <Text
                  style={{
                    marginBottom: HEIGHT / 10,
                    color: "#FFF",
                    fontWeight: "bold",
                    //fontFamily: "Avenir",
                    fontSize: 16,
                  }}
                >
                  Log Out
                </Text>
              )}
              onPress={() => {
                console.log("clicked");
                firebase.auth().signOut();
                setUser(null);
                removeToken();
                setIsLoggedIn(false);
                props.navigation.navigate("HomeDrawer");
              }}
              //   icon={({ color, size }) => <Feather name="menu" />}
              icon={() => (
                <Image
                  style={{ height: 30, width: 30, marginBottom: HEIGHT / 10 }}
                  source={require("../../assets/log-out.png")}
                />
              )}
            />
          </Drawer.Section>
        </View>
      ) : (
        <View
          style={{
            // zIndex: 2,
            backgroundColor: "#000000",
            // zIndex: 10,
            width: WIDTH * 0.75,
            justifyContent: "center",
            alignItems: "center",
            height: HEIGHT + 30,
            position: "absolute",
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("SignInScreen")}
          >
            <Text style={styles.label}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default DrawerContent;

const styles = new StyleSheet.create({
  label: {
    color: "#FFF",
    fontWeight: "bold",
    //fontFamily: "Avenir",
    fontSize: 16,
  },
});
