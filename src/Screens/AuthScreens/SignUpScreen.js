import React, { useState, useRef, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
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
  const [number, setNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  const [code, setCode] = useState(0);
  const [sessionID, setSessionID] = useState("");
  console.log(name, number, email);

  const [loaded, setLoaded] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 1000);
  }, []);

  const storeToken = async (value) => {
    try {
      const userToken = JSON.stringify(value);
      await AsyncStorage.setItem("userToken", userToken);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  // const updateProfile = () => {
  //   const userProfile = firebase.auth().currentUser;
  //   userProfile
  //     .updateProfile({
  //       displayName: name,
  //     })
  //     .then(() => {
  //       var displayName = userProfile.displayName;
  //       console.log(displayName, "NAME");
  //     })
  //     .catch((err) => console.log(err));
  //   // userProfile
  //   //   .updatePhoneNumber({ phoneNumber: number })
  //   //   .then((data) => {
  //   //     var phone = userProfile.phoneNumber;
  //   //     console.log(phone);
  //   //   })
  //   //   .catch((err) => console.log(err));
  //   console.log(userProfile.displayName, "UPDTED ONE");
  //   storeToken(userProfile);
  // };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const sendOtp = () => {
    axios
      .get(
        `https://2factor.in/API/V1/bba9d328-d970-11ea-9fa5-0200cd936042/SMS/+91${number}/AUTOGEN`
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
        `https://2factor.in/API/V1/bba9d328-d970-11ea-9fa5-0200cd936042/SMS/VERIFY/${sessionID}/${code}`
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
              setIsLoggedIn(true);
            })

            .catch((err) => console.log(err));

          firebase.database().ref("users").push({
            name: name,
            phoneNumber: number,
            email: email,
          });
          prevStep();
        }
      })
      .catch((err) => Alert.alert("Otp is wrong"));
    const userData = firebase.auth().currentUser;
    if (userData !== null) {
      navigation.navigate("Main");
    }
  };

  const renderView = (step) => {
    switch (step) {
      case 0:
        return (
          <View>
            <View style={styles.skip}>
              <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Text style={{ fontSize: 18, color: "#333" }}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Animatable.View animation="fadeInUp" duration={1500}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
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
                    keyboardType="visible-password"
                    keyboardAppearance="dark"
                    keyboardType="email-address"
                    onChangeText={(value) => setEmail(value)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardAppearance="dark"
                    keyboardType="number-pad"
                    onChangeText={(value) => setNumber(value)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Passord"
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
                <View style={{ position: "absolute", bottom: 20, left: 10 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignInScreen")}
                  >
                    <Text style={{ fontWeight: "900" }}>
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
            <TouchableOpacity onPress={() => prevStep()}>
              <View style={{ paddingTop: 50 }}>
                <AntDesign name="arrowleft" size={28} />
              </View>
            </TouchableOpacity>
            <View style={{ justifyContent: "flex-end" }}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Otp"
                  keyboardAppearance="dark"
                  keyboardType="number-pad"
                  onChangeText={(value) => setCode(value)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  verifyOtp();
                }}
              >
                <View style={styles.otpButton}>
                  <Text style={styles.otpText}> Verify Otp</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <Animatable.View
      duration={1000}
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {renderView(step)}
    </Animatable.View>
  );
}

export default SignUpScreen;

const styles = new StyleSheet.create({
  otpButton: {
    marginTop: HEIGHT / 25,
    marginBottom: 45,
    backgroundColor: "black",
    borderRadius: 10,
    width: WIDTH * 0.9,
    alignContent: "center",
    position: "relative",
  },
  otpText: {
    textAlign: "center",
    paddingVertical: 20,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    marginHorizontal: 20,
    width: WIDTH * 0.8,
    height: 60,
  },
  inputContainer: {
    height: 60,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 30,
  },
  optButtonText: {
    textAlign: "center",
    paddingVertical: 20,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  otpButtonContainer: {
    marginBottom: 45,
    backgroundColor: "black",
    borderRadius: 10,
    width: WIDTH * 0.9,
    alignContent: "center",
    position: "relative",
  },
  skip: {
    position: "absolute",
    right: 20,
    marginTop: HEIGHT / 20,
  },
});
