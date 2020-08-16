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
import { Feather, AntDesign } from "@expo/vector-icons";
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
      <HomeStack.Screen name="BlogHome" component={BlogHomeScreen} />
      <HomeStack.Screen name="BlogInner" component={BlogInnerScreen} />
      <HomeStack.Screen
        options={{
          title: "Tours",
          headerShown: true,
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
  <Tab.Navigator>
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          // <MaterialCommunityIcons name="home" color={color} size={26} />
          <Image
            style={{ height: 25, width: 25, marginBottom: 0 }}
            source={require("../../assets/House.png")}
          />
        ),
      }}
      name="Home"
      component={HomeStackScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          // <MaterialCommunityIcons name="home" color={color} size={26} />
          <Image
            style={{ height: 25, width: 25, marginBottom: 0 }}
            source={require("../../assets/Compass.png")}
          />
        ),
      }}
      name="Tour"
      component={SelfTourStackScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          // <MaterialCommunityIcons name="home" color={color} size={26} />
          <Image
            style={{ height: 25, width: 25, marginBottom: 0 }}
            source={require("../../assets/Profile.png")}
          />
        ),
      }}
      name="Account"
      component={AccountScreen}
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
// const Drawer = createDrawerNavigator();

// const DrawerScreen = () => {
//   const [progress, setProgress] = React.useState(new Animated.Value(0));
//   const scale = Animated.interpolate(progress, {
//     inputRange: [0, 1],
//     outputRange: [1, 0.8],
//   });
//   const borderRadius = Animated.interpolate(progress, {
//     inputRange: [0, 1],
//     outputRange: [0, 16],
//   });

//   return (
//     <Drawer.Navigator
//       drawerType="slide"
//       edgeWidth={2}
//       drawerPosition="left"
//       drawerStyle={{
//         backgroundColor: "#fff",
//         width: 300,
//       }}
//       overlayColor={0}
//       contentContainerStyle={{ flex: 1 }}
//       drawerContent={(props) => <DrawerContent {...props} />}
//       sceneContainerStyle={{ backgroundColor: "red" }}
//     >
//       <Drawer.Screen name="Drawer" component={RootStackScreen} />
//       {/* <Drawer.Screen name="MyRequest" component={MyRequestScreen} />
//       <Drawer.Screen name="MyPlans" component={MyPlansScreen} />
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen name="Visa" component={VisaDetailsScreen} />
//     <Drawer.Screen name="WishList" component={WishListScreen} /> */}
//       <Drawer.Screen name="Account" component={AccountStackScreen} />
//     </Drawer.Navigator>
//   );
// };

// export default DrawerScreen;

// const animatedStyle = { borderRadius, transform: [{ scale }] };
// <LinearGradient style={{ flex: 1 }} colors={["#E94057", "#4A00E0"]}>
//   <Drawer.Navigator
//     drawerType="slide"
//     overlayColor="transparent"
//     drawerStyle={styles.drawerStyles}
//     contentContainerStyle={{ flex: 1 }}
//     drawerContentOptions={{
//       activeBackgroundColor: "transparent",
//       activeTintColor: "white",
//       inactiveTintColor: "white",
//     }}
//     sceneContainerStyle={{ backgroundColor: "transparent" }}
//     drawerContent={(props) => {
//       setProgress(props.progress);
//       return <DrawerContent {...props} />;
//     }}
//   >
//     >
//     <Drawer.Screen name="D" component={MainTabScreen} />
//     <Drawer.Screen
//       name="Drawer"
//       {...(props) => (
//         <AccountStackScreen {...props} style={animatedStyle} />
//       )}
//       // component={MainTabScreen}
//     />
//   </Drawer.Navigator>
// </LinearGradient>

// const DrawerContent = (props) => {
//   return (
//     <DrawerContentScrollView
//       {...props}
//       scrollEnabled={false}
//       contentContainerStyle={{ flex: 1 }}
//     >
//       <Image
//         source={{
//           uri:
//             "https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png",
//           height: 60,
//           width: 60,
//           scale: 0.5,
//         }}
//         resizeMode="center"
//         style={styles.avatar}
//       />
//       <Text white title>
//         React UI Kit
//       </Text>
//       <Text white size={9}>
//         contact@react-ui-kit.com
//       </Text>

//       <DrawerItem
//         label="My Request"
//         labelStyle={styles.drawerLabel}
//         style={styles.drawerItem}
//         onPress={() => props.navigation.navigate("MyRequest")}
//         icon={() => <AntDesign name="dashboard" color="white" size={16} />}
//       />
//       <DrawerItem
//         label="My Plans"
//         labelStyle={{ color: "white", marginLeft: -16 }}
//         style={{ alignItems: "flex-start", marginVertical: 0 }}
//         onPress={() => props.navigation.navigate("MyPlans")}
//         icon={() => <AntDesign name="message1" color="white" size={16} />}
//       />
//       <DrawerItem
//         label="Profile"
//         labelStyle={{ color: "white", marginLeft: -16 }}
//         style={{ alignItems: "flex-start", marginVertical: 0 }}
//         onPress={() => props.navigation.navigate("Profile")}
//         icon={() => <AntDesign name="phone" color="white" size={16} />}
//       />
//       <DrawerItem
//         label="Logout"
//         labelStyle={{ color: "white" }}
//         icon={() => <AntDesign name="logout" color="white" size={16} />}
//         onPress={() => alert("Are your sure to logout?")}
//       />
//     </DrawerContentScrollView>
//   );
// };
