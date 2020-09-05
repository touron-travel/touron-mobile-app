import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GettingStartedScreen from "./AuthScreens/GettingStartedScreen";
import SignUpScreen from "./AuthScreens/SignUpScreen";
import SignInScreen from "./AuthScreens/SignInScreen";
import MainTabScreen from "./MainTabScreen";
import { AuthContext } from "../context/AuthContext";
const RootStack = createStackNavigator();

export const RootStackScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="GettingStarted"
    >
      {isLoggedIn ? null : (
        <RootStack.Screen
          name="GettingStarted"
          component={GettingStartedScreen}
        />
      )}

      <RootStack.Screen name="Main" component={MainTabScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
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
