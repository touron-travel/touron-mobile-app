import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GettingStartedScreen from "./AuthScreens/GettingStartedScreen";
import SignUpScreen from "./AuthScreens/SignUpScreen";
import SignInScreen from "./AuthScreens/SignInScreen";
import MainTabScreen from "./MainTabScreen";

import { AuthContext } from "../context/AuthContext";
import DrawerScreen from "./MainTabScreen";
const RootStack = createStackNavigator();

export const RootStackScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  return (
    <>
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="GettingStarted"
      >
        <RootStack.Screen
          name="GettingStarted"
          component={GettingStartedScreen}
        />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <RootStack.Screen name="Main" component={MainTabScreen} />
      </RootStack.Navigator>
    </>
  );
};

// const AuthStack = createStackNavigator();

// export const AuthStackScreen = () => {
//   return (
//     <AuthStack.Navigator screenOptions={{ headerShown: false }}>
//       <AuthStack.Screen
//         name="GettingStarted"
//         component={GettingStartedScreen}
//       />
//       <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
//       <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
//     </AuthStack.Navigator>
//   );
// };
