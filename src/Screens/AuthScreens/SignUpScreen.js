import React, { useState, useRef, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as firebase from "firebase";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function SignUpScreen({ navigation }) {
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  const [code, setCode] = useState(0);
  const [sessionID, setSessionID] = useState("");
  const [loaded, setLoaded] = useState(true);
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);

  const storeToken = async (value) => {
    try {
      const userToken = JSON.stringify(value);
      await AsyncStorage.setItem("userToken", userToken);
    } catch (e) {
      console.log(e);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const sendOtp = () => {
    console.log("clicked");
    axios
      .get(
        `https://2factor.in/API/V1/8697a4f2-e821-11ea-9fa5-0200cd936042/SMS/+91${number}/AUTOGEN`
      )
      .then((response) => {
        //console.log(response.data);
        let session = response.data.Details;
        console.log(session, "RESPONSE DATA");
        setSessionID(session);
      })
      .catch((err) => console.log(err));
  };

  const verifyOtp = () => {
    axios
      .get(
        `https://2factor.in/API/V1/8697a4f2-e821-11ea-9fa5-0200cd936042/SMS/VERIFY/${sessionID}/${code}`
      )
      .then((response) => {
        console.log(response, "RESPONSE");
        const status = response.data.Details;
        console.log(status, "STATUS");
        if (status == "OTP Matched") {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
              setUser(user);
              firebase.database().ref("users").push({
                name: name,
                phoneNumber: number,
                email: email,
              });
              setUser(user);
              setIsLoggedIn(true);
              storeToken(user);
            })
            .catch((err) => console.log(err));
          navigation.navigate("Main");
          prevStep();
        }
      })
      .catch((err) => Alert.alert("Otp is wrong"));
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        setLoaded(false);
      }, 1000);
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user, "MANIVASAGAM");
        setUser(user);
      });
    }
    return () => (mounted = false);
  }, []);

  const renderView = (step) => {
    switch (step) {
      case 0:
        return (
          <View>
            <View style={styles.skip}>
              <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Text
                  style={{ fontSize: 18, color: "#333", fontWeight: "bold" }}
                >
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Animatable.View
                animation="fadeInUp"
                duration={1500}
                style={{ alignItems: "center" }}
              >
                <View
                  style={{ marginBottom: HEIGHT / 7, alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                      color: "white",
                      fontFamily: "NewYorkl",
                    }}
                  >
                    Sign Up
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={name}
                    placeholder="Name"
                    keyboardType="visible-password"
                    keyboardAppearance="dark"
                    keyboardType="email-address"
                    onChangeText={(value) => setName(value)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    keyboardType="visible-password"
                    keyboardAppearance="dark"
                    keyboardType="email-address"
                    onChangeText={(value) => setEmail(value)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={number}
                    placeholder="Phone Number"
                    keyboardAppearance="dark"
                    keyboardType="number-pad"
                    onChangeText={(value) => setNumber(value)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    keyboardType="visible-password"
                    keyboardAppearance="dark"
                    keyboardType="email-address"
                    onChangeText={(value) => setPassword(value)}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => {
                    sendOtp();
                    nextStep();
                  }}
                >
                  <View style={styles.otpButtonContainer}>
                    <Text style={styles.optButtonText}>Send Otp</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    position: "absolute",
                    bottom: 20,
                    width: WIDTH * 0.9,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignInScreen")}
                  >
                    <Text
                      style={{
                        fontWeight: "900",
                        textAlign: "center",
                        color: "white",
                        marginVertical: WIDTH / 10,
                      }}
                    >
                      Already have an account? Try Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </View>
          </View>
        );
      case 1:
        return (
          <View>
            <View
              style={{
                marginVertical: HEIGHT / 10,
                //  justifyContent: "t",
                position: "absolute",
                bottom: HEIGHT * 0.7,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "white",
                  // marginBottom: 10,
                  fontFamily: "Andika",
                }}
              >
                Enter the otp send to
              </Text>
              <Text
                style={{ fontSize: 25, color: "white", fontFamily: "Andika" }}
              >
                +91 {number}
              </Text>
            </View>
            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Otp"
                  keyboardAppearance="dark"
                  keyboardType="number-pad"
                  onChangeText={(value) => setCode(value)}
                />
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    prevStep();
                  }}
                >
                  <View style={styles.otpButton}>
                    <Text style={styles.otpText}> Back</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    verifyOtp();

                    navigation.navigate("Main");
                    prevStep();
                  }}
                >
                  <View
                    style={[styles.otpButton, { backgroundColor: "white" }]}
                  >
                    <Text style={[styles.otpText, { color: "black" }]}>
                      Sign Up
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior="position"> */}
      <Animatable.View
        duration={1000}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <ImageBackground
          style={{
            width: WIDTH,
            height: HEIGHT + 30,
            position: "absolute",
            //zIndex: -2,
          }}
          // source={require("../../../assets/loginimage.jpg")}
          source={{
            uri:
              "https://images.pexels.com/photos/2249602/pexels-photo-2249602.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          }}
        />
        {renderView(step)}
      </Animatable.View>
      {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>
  );
}

export default SignUpScreen;

const styles = new StyleSheet.create({
  otpButton: {
    marginTop: HEIGHT / 25,
    marginBottom: 85,
    backgroundColor: "black",
    borderRadius: 10,
    width: WIDTH / 3,
    alignContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    position: "relative",
  },
  otpText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "white",
    fontSize: 16,
    fontFamily: "Andika",
    // fontWeight: "bold",
  },
  input: {
    marginHorizontal: 20,
    width: WIDTH * 0.8,
    height: 60,
    color: "white",
    fontFamily: "Andika",
  },
  inputContainer: {
    height: 60,
    borderRadius: 10,
    backgroundColor: "#0005",
    marginBottom: 20,
  },
  optButtonText: {
    textAlign: "center",
    paddingVertical: 20,
    color: "white",
    fontSize: 16,
    fontFamily: "Andika",
    //  fontWeight: "bold",
  },
  otpButtonContainer: {
    marginBottom: HEIGHT / 10,
    backgroundColor: "black",
    borderRadius: 10,
    width: WIDTH * 0.9,
    alignContent: "center",
    position: "relative",
  },
  skip: {
    position: "absolute",
    right: 20,
    color: "#333",
    fontWeight: "bold",
    marginTop: HEIGHT / 20,
  },
});
