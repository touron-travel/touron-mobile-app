import {
  YellowBox,
  View,
  Text,
  StyleSheet,
  AppLoading,
  Dimensions,
} from "react-native";
YellowBox.ignoreWarnings(["Remote debugger"]);
YellowBox.ignoreWarnings(["Setting a timer"]);
import React, { useState, useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./src/Screens/DrawerContent";
import { RootStackScreen } from "./src/Screens/RootStackScreen";
import { AuthContext } from "./src/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import AsyncStorage from "@react-native-community/async-storage";
import Animated from "react-native-reanimated";
import * as Font from "expo-font";

import firebase from "firebase";
import { createStackNavigator } from "@react-navigation/stack";
import MyRequestScreen from "./src/Screens/AccountScreens/MyRequestScreen";
import MyPlansScreen from "./src/Screens/AccountScreens/MyPlansScreen";
import ProfileScreen from "./src/Screens/AccountScreens/ProfileScreen";
import VisaDetailsScreen from "./src/Screens/AccountScreens/VisaDetailsScreen";
import WishListScreen from "./src/Screens/AccountScreens/WishListScreen";
import RequestInner from "./src/Screens/AccountScreens/RequestInner";
import VisaInner from "./src/Screens/AccountScreens/VisaInner";

const firebaseConfig = {
  apiKey: "AIzaSyCCZ2bo_iPbtvarsADQe84qX2s9cWPMq3U",
  authDomain: "touronapp-248e4.firebaseapp.com",
  databaseURL: "https://touronapp-248e4.firebaseio.com",
  projectId: "touronapp-248e4",
  storageBucket: "touronapp-248e4.appspot.com",
  messagingSenderId: "813320271971",
  appId: "1:813320271971:web:5a10483e3c11bc953aa056",
  measurementId: "G-KCPSW6WFC9",
};

firebase.initializeApp(firebaseConfig);

const Drawer = createDrawerNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [fontLoaded, setFont] = useState(false);

  const fetchFont = async () => {
    await Font.loadAsync({
      // Futura: require("../../../assets/fonts/Futura Std Medium.ttf"),
      Andika: require("./assets/fonts/Andika-Regular.ttf"),
      Avenir: require("./assets/fonts/AvenirLTStd-Black.otf"),
      NewYorkl: require("./assets/fonts/NewYorkLargeBlack.otf"),
      WSans: require("./assets/fonts/WorkSans-Black.ttf"),
      WSansl: require("./assets/fonts/WorkSans-Light.ttf"),
      SFProDisplayRegular: require("./assets/fonts/SF-Pro-Display-Regular.otf"),
      SFProTextRegular: require("./assets/fonts/SF-Pro-Text-Regular.otf"),
    });

    setFont(true);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchFont();
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user, "MANIVASAGAM");
        setUser(user);
      });
    }
    return () => (mounted = false);
  }, []);

  const getToken = async () => {
    try {
      const data = await AsyncStorage.getItem("userToken");
      const userToken = JSON.parse(data);
      console.log(userToken, "TOKEn");
      if (userToken !== null) {
        setUser(userToken);
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getToken();
    }
    return () => (mounted = false);
  }, []);

  const AccountStack = createStackNavigator();

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerType="slides"
          screenOptions={{
            gestureEnabled: true,
          }}
          edgeWidth={0}
          drawerStyle={{
            backgroundColor: "#000000",
            width: WIDTH * 0.75,
            opacity: 0.6,
            zIndex: 2,
          }}
          overlayColor={0}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="HomeDrawer" component={RootStackScreen} />
          <Drawer.Screen name="MyRequest" component={MyRequestScreen} />
          <Drawer.Screen name="MyPlans" component={MyPlansScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Visa" component={VisaDetailsScreen} />
          <Drawer.Screen name="VisaInner" component={VisaInner} />
          <Drawer.Screen name="WishList" component={WishListScreen} />
          <Drawer.Screen name="RequestInner" component={RequestInner} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
{/* <Drawer.Screen name="HomeDrawer" component={RootStackScreen} />
<Drawer.Screen name="MyRequest" component={MyRequestScreen} />
<Drawer.Screen name="MyPlans" component={MyPlansScreen} />
<Drawer.Screen name="Profile" component={ProfileScreen} />
<Drawer.Screen name="Visa" component={VisaDetailsScreen} />
<Drawer.Screen name="VisaInner" component={VisaInner} />
<Drawer.Screen name="WishList" component={WishListScreen} />
<Drawer.Screen name="Reque */}