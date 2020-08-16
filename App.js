import { YellowBox, View, Text, StyleSheet, Dimensions } from "react-native";
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

import firebase from "firebase";
import { createStackNavigator } from "@react-navigation/stack";
import MyRequestScreen from "./src/Screens/AccountScreens/MyRequestScreen";
import MyPlansScreen from "./src/Screens/AccountScreens/MyPlansScreen";
import ProfileScreen from "./src/Screens/AccountScreens/ProfileScreen";
import VisaDetailsScreen from "./src/Screens/AccountScreens/VisaDetailsScreen";
import WishListScreen from "./src/Screens/AccountScreens/WishListScreen";

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
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // const [progress, setProgress] = useState(new Animated.Value(0));

  const setStatus = (value) => {
    setIsLoggedIn(value);
  };

  const getToken = async () => {
    try {
      const data = await AsyncStorage.getItem("userToken");
      const userToken = JSON.parse(data);
      console.log(userToken, "TOKEn");
      if (userToken !== null) {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // const Scale = Animated.interpolate(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.8],
  // });

  // const borderRadius = Animated.interpolate(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 16],
  // });

  // const animatedStyles = { borderRadius, transform: [{ Scale }] };

  //   const RootStack = createStackNavigator();

  //  const RootStackScreen = () => {
  //    return (
  //     <RootStack.Navigator>
  //       {/* <RootStack.Screen name="GettingStarted" component={GettingStartedScreen} />
  //       <RootStack.Screen name="SignInScreen" component={SignInScreen} />
  //       <RootStack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
  //       <RootStack.Screen name="Main" component={MainTabScreen} />
  //     </RootStack.Navigator>
  //    )
  //     }

  const AccountStack = createStackNavigator();

  // const AccountStackScreen = ({ navigation, style }) => {
  //   return (
  //     <AccountStack.Navigator
  //       screenOptions={{
  //         headerTransparent: true,
  //         headerTitle: null,
  //       }}
  //     >
  //       <AccountStack.Screen name="MyRequest" component={MyRequestScreen} />
  //       <AccountStack.Screen name="MyPlans" component={MyPlansScreen} />
  //       <AccountStack.Screen name="Profile" component={ProfileScreen} />
  //       <AccountStack.Screen name="Visa" component={VisaDetailsScreen} />
  //       <AccountStack.Screen name="WishList" component={WishListScreen} />
  //     </AccountStack.Navigator>
  //   );
  // };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerType="slide"
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
          <Drawer.Screen name="WishList" component={WishListScreen} />
        </Drawer.Navigator>
        {/* {isLoggedIn ? <AuthStackScreen /> : <RootStackScreen />} */}
        {/* <RootStackScreen /> */}
        {/* <DrawerScreen /> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

// const styles = new StyleSheet.create({
//   drawerStyles: { flex: 1, width: "50%", backgroundColor: "transparent" },
//   stack: {
//     flex: 1,
//     shadowColor: "#FFF",
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.44,
//     shadowRadius: 10.32,
//     elevation: 5,
//     // overflow: 'scroll',
//     // borderWidth: 1,
//   },
// });

{
  /* <LinearGradient style={{ flex: 1 }} colors={["#E94057", "#4A00E0"]}>
          <Drawer.Navigator
            drawerType="slide"
            overlayColor="transparent"
            sceneContainerStyle={{ backgroundColor: "blue" }}
            drawerContent={(props) => {
              setProgress(props.progress);
              return (
                <View
                  style={{
                    ...props,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>welcome</Text>
                </View>
              );
            }}
            drawerStyle={styles.drawerStyle}
            drawerContentOptions={{
              activeTintColor: "green",
              inactiveTintColor: "green",
              activeBackgroundColor: "#333",
            }}
          >
            <Drawer.Screen name="H" component={RootStackScreen} />
            <Drawer.Screen name="Screens">
              {(props) => (
                <AccountStackScreen {...props} style={animatedStyles} />
              )}
            </Drawer.Screen>
            {/* <Drawer.Screen name="A" component={AccountStackScreen} />
          <Drawer.Screen name="B" component={AccountStackScreen} />
          <Drawer.Screen name="c" component={AccountStackScreen} />
          <Drawer.Screen name="D" component={AccountStackScreen} />
          <Drawer.Screen name="E" component={AccountStackScreen} /> 
          </Drawer.Navigator>
        </LinearGradient> */
}
