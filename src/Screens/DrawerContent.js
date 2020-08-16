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
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const userDetails = firebase.auth().currentUser;
      if (userDetails !== null) setUser(userDetails);
    }
    return () => (mounted = false);
  }, []);

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

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (e) {
      console.log(err);
    }

    console.log("Done.");
  };

  useEffect(() => {
    getToken();
  }, []);

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
              <Avatar.Text
                // label={user.displayName ? user.displayName.charAt(0) : "N"}
                label="N"
                style={{ backgroundColor: "#DBE8EB", marginLeft: 20 }}
              />
              <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <Text style={{ color: "#FFF", fontSize: 20 }}>
                  {/* {user.displayName ? user.displayName : "Null"} */}
                </Text>
                <Text style={{ color: "#FFF", fontSize: 10 }}>
                  {/* {user.email} */}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 40 }}>
              <DrawerItem
                label={() => <Text style={styles.label}>Home</Text>}
                style={{ color: "white" }}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={require("../../assets/log-out.png")}
                  />
                )}
                onPress={() => props.navigation.navigate("Main")}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>My Requests</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={require("../../assets/log-out.png")}
                  />
                )}
                onPress={() => props.navigation.navigate("MyRequest")}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>My Plans</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={require("../../assets/log-out.png")}
                  />
                )}
                onPress={() => {
                  props.navigation.navigate("MyPlans");
                }}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>Wish List</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={require("../../assets/log-out.png")}
                  />
                )}
                onPress={() => {
                  props.navigation.navigate("WishList");
                }}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>Profile</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={require("../../assets/Drawer Icons/Profile.png")}
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
                    style={{ height: 40, width: 40 }}
                    source={require("../../assets/log-out.png")}
                  />
                )}
                onPress={() => {}}
              />
              <DrawerItem
                label={() => <Text style={styles.label}>Visa Details</Text>}
                //   icon={({ color, size }) => <Feather name="menu" />}
                icon={() => (
                  <View style={{ marginHorizontal: 9 }}>
                    <FontAwesome5 name="passport" size={25} color="#C1C5C6" />
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
              label={() => <Text style={styles.label}>Log Out</Text>}
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
                  style={{ height: 40, width: 40 }}
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
    // fontFamily: "Avenir",
    fontSize: 16,
  },
});
