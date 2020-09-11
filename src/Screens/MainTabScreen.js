import React, { useState } from "react";
import { Image, Text, StyleSheet, Button } from "react-native";

import AccountScreen from "./AccountScreens/AccountScreen";
import HomeScreen from "./HomeScreens/HomeScreen";
import PlannedTourScreen from "./CategoryScreens/PlannedTourScreen";
import SurpriseTourScreen from "./CategoryScreens/SupriseTourScreen";
import RoadTripScreen from "./CategoryScreens/RoadTripScreen";
import CountryHomeScreen from "./CountryScreens/CountryHomeScreen";
import CountryInnerScreen from "./CountryScreens/CountryInnerScreen";
import CityHomeScreen from "./CityScreens/CityHomeScreen";
import CityInnerScreen from "./CityScreens/CityInnerScreen";
import BlogHomeScreen from "./BlogScreens/BlogHomeScreen";
import BlogInnerScreen from "./BlogScreens/BlogInnerScreen";
import TourHomeScreen from "./TourScreens/TourHomeScreen";
import TourInnerScreen from "./TourScreens/TourInnerScreen";
import SelfPlanningScreen from "./SelfPlanTourScreens/SelfPlanningScreen";
import SelfPlanForm from "./SelfPlanTourScreens/SelfPlanningFormScreen";
import SelfTourHome from "./SelfPlanTourScreens/SelfTourHome";
import SelfTourInner from "./SelfPlanTourScreens/SelfTourInner";
import ProgressScreen from "./CheckoutScreens/ProgressScreen";
import PaymentScreen from "./CheckoutScreens/PaymentScreen";
import Animated from "react-native-reanimated";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OverviewToursScreen from "./CheckoutScreens/OverviewToursScreen";
import OverviewCitiesScreen from "./CheckoutScreens/OverviewCitiesScreen";

import { SelfTourContext } from "../context/SelfTourContext";

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{}}>
      <HomeStack.Screen
        options={{
          headerShown: false,
          headerRight: () => <Button title="klk" />,
          headerLeft: () => (
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Feather
                name="menu"
                size={180}
                color="black"
                style={{ paddingHorizontal: 10 }}
              />
            </Button>
          ),
        }}
        name="Main"
        component={HomeScreen}
      />

      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Planned"
        component={PlannedTourScreen}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Surprise"
        component={SurpriseTourScreen}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Road"
        component={RoadTripScreen}
      />
      <HomeStack.Screen
        options={{
          title: "Country",
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: "bold",
            // marginLeft: WIDTH / 5,
          },
        }}
        name="CountryHome"
        component={CountryHomeScreen}
      />
      <HomeStack.Screen
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
        }}
        name="CountryInner"
        component={CountryInnerScreen}
      />
      <HomeStack.Screen
        options={{
          title: "Explore Cities",
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: "bold",
            // marginLeft: WIDTH / 7,
          },
        }}
        name="CityHome"
        component={CityHomeScreen}
      />
      <HomeStack.Screen
        name="CityInner"
        options={{
          headerTitle: "",
          headerShown: true,
          headerTransparent: true,
        }}
        component={CityInnerScreen}
      />
      <HomeStack.Screen
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: "bold",
            //   marginLeft: WIDTH / 5,
          },
        }}
        name="BlogHome"
        component={BlogHomeScreen}
      />
      <HomeStack.Screen
        options={{ headerShown: false, title: "", headerTransparent: true }}
        name="BlogInner"
        component={BlogInnerScreen}
      />
      <HomeStack.Screen
        options={{
          title: "Tours",
          headerShown: false,
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: "bold",
            //   marginLeft: WIDTH / 5,
          },
        }}
        name="TourHome"
        component={TourHomeScreen}
      />
      <HomeStack.Screen
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
        }}
        name="TourInner"
        component={TourInnerScreen}
      />
    </HomeStack.Navigator>
  );
};

const SelfTourStack = createStackNavigator();

const SelfTourStackScreen = () => {
  const [details, setDetails] = useState();
  return (
    <SelfTourContext.Provider value={{ details, setDetails }}>
      <SelfTourStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <SelfTourStack.Screen name="SelfPlan" component={SelfPlanningScreen} />
        <SelfTourStack.Screen name="SelfPlanForm" component={SelfPlanForm} />
        <SelfTourStack.Screen
          name="OverviewCities"
          component={OverviewCitiesScreen}
        />
        <SelfTourStack.Screen name="SelfTourHome" component={SelfTourHome} />
        <SelfTourStack.Screen name="SelfTourInner" component={SelfTourInner} />
        <SelfTourStack.Screen
          name="OverviewTours"
          component={OverviewToursScreen}
        />
        <SelfTourStack.Screen name="Progress" component={ProgressScreen} />
        <SelfTourStack.Screen name="Payment" component={PaymentScreen} />
      </SelfTourStack.Navigator>
    </SelfTourContext.Provider>
  );
};

const MainTabScreen = () => (
  <Tab.Navigator
    tabBarOptions={{
      keyboardHidesTabBar: true,
    }}
    // screenOptions={({ route }) => ({
    //   key
    //   tabBarIcon: ({ focused, color, size }) => {
    //     let iconName;

    //     if (route.name === "Home") {
    //       iconName = focused
    //         ? "ios-information-circle"
    //         : "ios-information-circle-outline";
    //     } else if (route.name === "Settings") {
    //       iconName = focused ? "ios-list-box" : "ios-list";
    //     }

    //     // You can return any component that you like here!
    //     return <Ionicons name={iconName} size={size} color={color} />;
    //   },
    // })}
  >
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
          // <Image
          //   style={{ height: 25, width: 25, marginBottom: 0 }}
          //   source={require("../../assets/House.png")}
          // />
        ),
      }}
      name="Home"
      component={HomeStackScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="flight-takeoff" size={24} color={color} />
          // <Image
          //   style={{ height: 25, width: 25, marginBottom: 0 }}
          //   source={require("../../assets/Compass.png")}
          // />
        ),
      }}
      name="Tour"
      component={SelfTourStackScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="shopping" size={24} color={color} />
          // <Images
          //   style={{ height: 25, width: 25, marginBottom: 0 }}
          //   source={require("../../assets/CountryInnericon/shop.png")}
          // />
        ),
      }}
      name="Blog"
      component={BlogHomeScreen}
    />
    {/* <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          // <MaterialCommunityIcons name="home" color={color} size={26} />
          <Image
            style={{ height: 25, width: 25, marginBottom: 0 }}
            source={require("../../assets/Profile.png")}
          />
        ),
      }}
      name="Plan"
      component={PaymentScreen}
    /> */}
  </Tab.Navigator>
);

export default MainTabScreen;
