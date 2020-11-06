import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as firebase from "firebase";
import * as Animatable from "react-native-animatable";
import { Spinner } from "native-base";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
function SignInScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);
  const [step, setStep] = useState(0);
  const [err, setErr] = useState("");
  const [req, setReq] = useState(false);
  const [expoToken, setExpoToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const storeToken = async (value) => {
    try {
      const userToken = JSON.stringify(value);
      await AsyncStorage.setItem("userToken", userToken);
    } catch (e) {
      console.log(e);
    }
  };
  const forgetPassword = () => {
    console.log(email, "email");
    setLoaded(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((res) => {
        setLoaded(false);
        setReq(true);
        setTimeout(() => {
          setStep(0);
          setReq(false);
        }, 3000);
      })
      .catch((err) => console.log(err, "err"));
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
      });
    }
    return () => (mounted = false);
  }, []);

  const updateUserToken = (user) => {
    if (user !== null) {
      firebase
        .database()
        .ref(`userGeneralInfo/${user.uid}`)
        .child("pushNotificationToken")
        .set(expoToken);
    }
  };
  const signIn = () => {
    setLoaded(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user);
        setLoaded(false);
        storeToken(user.user);
        updateUserToken(user.user);
        setEmail("");
        setPassword("");
        setIsLoggedIn(true);
        navigation.navigate("Main");
      })
      .catch((err) => {
        setLoaded(false);
        console.log(err.message, "po");
        setErr(err.message);
      });
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      console.log(finalStatus, existingStatus, "stst");

      if (existingStatus !== "granted" || Platform.OS === "android") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoToken(token));
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <Animatable.View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            animation="fadeInUp"
            duration={1500}
          >
            <View style={{ position: "absolute" }}>
              <View style={{ marginBottom: HEIGHT / 10, alignItems: "center" }}>
                <Text
                  style={{ fontSize: 40, fontFamily: "Andika", color: "black" }}
                >
                  Sign In
                </Text>
              </View>
              <View>
                <View style={[styles.inputContainer, { marginBottom: 30 }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="visible-password"
                    keyboardAppearance="dark"
                    keyboardType="email-address"
                    onChangeText={(value) => setEmail(value)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    keyboardType="visible-password"
                    keyboardAppearance="dark"
                    keyboardType="email-address"
                    onChangeText={(value) => setPassword(value)}
                    passwordRules={true}
                    secureTextEntry={true}
                  />
                </View>
                {err !== "" ? (
                  <View
                    style={[
                      styles.inputContainer,
                      { backgroundColor: "transparent" },
                    ]}
                  >
                    <Text
                      style={[styles.input, { color: "red", fontSize: 16 }]}
                    >
                      {err}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.buttonContainer}>
                {loaded ? (
                  <View style={{ paddingVertical: -10 }}>
                    <Spinner color="black" />
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => signIn()}>
                    <Text style={styles.signinButton}>Sign In</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity onPress={() => setStep(1)}>
                <Text
                  style={{
                    fontWeight: "900",
                    paddingTop: 20,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Forget Password ?
                </Text>
              </TouchableOpacity>

              <View style={{ width: WIDTH * 0.9 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUpScreen")}
                >
                  <Text
                    style={{
                      fontWeight: "900",
                      color: "white",
                      textAlign: "center",
                      marginVertical: Platform.OS === "ios" ? 30 : 20,
                    }}
                  >
                    Don't have a account? Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ImageBackground
              style={{ width: WIDTH, height: HEIGHT, zIndex: -2 }}
              source={{
                uri:
                  "https://images.pexels.com/photos/207237/pexels-photo-207237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              }}
            />
            <View style={styles.skipButton}>
              <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Text style={{ fontSize: 18, color: "#333" }}>Home</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        );

      case 1:
        return (
          <Animatable.View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            animation="fadeInUp"
            duration={1500}
          >
            <View style={{ position: "absolute" }}>
              <View style={{ marginBottom: HEIGHT / 10, alignItems: "center" }}>
                <Text
                  style={{ fontSize: 40, fontFamily: "Andika", color: "black" }}
                >
                  Enter the Email
                </Text>
              </View>
              <View>
                <View style={[styles.inputContainer, { marginBottom: 30 }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="visible-password"
                    keyboardAppearance="dark"
                    keyboardType="email-address"
                    onChangeText={(value) => setEmail(value)}
                  />
                </View>

                {err !== "" ? (
                  <View
                    style={[
                      styles.inputContainer,
                      { backgroundColor: "transparent" },
                    ]}
                  >
                    <Text
                      style={[styles.input, { color: "red", fontSize: 16 }]}
                    >
                      {err}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.forgetbuttonContainer}>
                {loaded ? (
                  <View style={{ paddingVertical: -10 }}>
                    <Spinner color="black" />
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => forgetPassword()}>
                    {req ? (
                      <Text style={styles.forgetButton}>
                        Password reset mail sent to your email .
                      </Text>
                    ) : (
                      <Text style={styles.forgetButton}>Change password</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <ImageBackground
              style={{ width: WIDTH, height: HEIGHT, zIndex: -2 }}
              source={{
                uri:
                  "https://images.pexels.com/photos/207237/pexels-photo-207237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              }}
            />
          </Animatable.View>
        );
    }
  };

  return <>{renderForm()}</>;
}

export default SignInScreen;
const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    width: WIDTH * 0.8,
    height: 60,
    color: "#FFF",
    fontFamily: "Andika",
  },
  inputContainer: {
    height: 60,
    borderRadius: 10,
    backgroundColor: "#0005",
  },
  skipButton: {
    position: "absolute",
    right: 20,
    top: 0,
    marginTop: HEIGHT / 20,
  },
  signinButton: {
    textAlign: "center",
    paddingVertical: 20,
    color: "black",
    fontFamily: "Andika",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: HEIGHT / 25,
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: WIDTH * 0.9,
    alignContent: "center",
    position: "relative",
  },
  forgetButton: {
    textAlign: "center",
    paddingVertical: 20,
    color: "black",
    fontFamily: "Andika",
    fontSize: 16,
  },
  forgetbuttonContainer: {
    marginBottom: 30,
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: WIDTH * 0.9,
    alignContent: "center",
    position: "relative",
  },
});
