import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Dimensions,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
// import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  // const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const [step, setStep] = useState(1);
  const [aboutMe, setAboutMe] = useState("");
  const [travellerType, setTravellerType] = useState("");
  const { user } = useContext(AuthContext);

  console.log(userInfo, "P");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(user, "ojjjjp");

  const getUserData = () => {
    if (user !== null) {
      setName(user.displayName);
      setEmail(user.email);

      firebase
        .database()
        .ref(`userGeneralInfo/${user.uid}`)
        .on("value", (data) => {
          console.log(data, "DATA");
          console.log(user.uid, "klkkkkkk");

          if (data.val() == null) {
            setAboutMe("");
            setAddress("");
            setAge("");
            setNumber("");
            setGender("");
            setTravellerType("");
          }

          if (data.val() !== null) {
            let val = data.val();
            setUserInfo(val);
            setAboutMe(val.aboutMe);
            setAddress(val.address);
            setAge(val.age);
            setNumber(val.phoneNumber);
            setGender(val.gender);
            setTravellerType(val.travellerType);
          }
        });
    }
    // }
    // });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
    getUserData();
  }, [user]);

  const updateProfilePic = (uri) => {
    setLoading(true);
    if (user !== null) {
      user
        .updateProfile({
          photoURL: uri,
        })
        .then((displayName) => {
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const updateUser = () => {
    if (user !== null) {
      user
        .updateProfile({
          displayName: name,
        })
        .then((displayName) => console.log(displayName))
        .catch((err) => console.log(err));
    }
    prevStep();
    console.log(user, "p");

    firebase.database().ref(`userGeneralInfo/${user.uid}`).set({
      phoneNumber: number,
      address: address,
      age: age,
      gender: gender,
      aboutMe: aboutMe,
      travellerType: travellerType,
    });
  };

  // console.log(image);

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        //  allowsEditing: true,
        aspect: [1, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        updateProfilePic(result.uri);
      }

      //  console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  // const getPermissionAsync = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   // console.log(status, "STATUS");
  //   if (status !== "granted") {
  //     alert("Sorry, we need camera roll permissions to make this work!");
  //   }
  // };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const renderPage = (step) => {
    switch (step) {
      case 1:
        return (
          <ScrollView
            animation="bounceIn"
            duration={3000}
            // style={{ flex: 1, backgroundColor: "white" }}
          >
            {user == null ? null : (
              <>
                <View
                  style={{
                    flex: 1,
                    zIndex: -2,
                    // position: "relative",
                  }}
                >
                  {user.photoURL == null ? (
                    <Image
                      source={{
                        uri:
                          "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
                      }}
                      // source={require("../../../assets/Profile.png")}
                      style={{
                        width: WIDTH,
                        height: HEIGHT / 1.2,
                        borderBottomLeftRadius: WIDTH / 10,
                        borderBottomRightRadius: WIDTH / 10,
                      }}
                    />
                  ) : loading ? (
                    <ActivityIndicator
                      size="small"
                      color="black"
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: WIDTH / 1,
                        marginRight: WIDTH / 10,
                        height: HEIGHT,
                        flex: 1,
                      }}
                    />
                  ) : (
                    <Image
                      source={{ uri: user.photoURL }}
                      style={{
                        width: WIDTH,
                        height: HEIGHT / 1.2,
                        borderBottomLeftRadius: WIDTH / 10,
                        borderBottomRightRadius: WIDTH / 10,
                      }}
                    />
                  )}
                </View>

                <View
                  style={{
                    // height: HEIGHT / 12,
                    marginHorizontal: WIDTH / 13,

                    justifyContent: "center",
                    // flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      // marginHorizontal: WIDTH / 10,
                      color: "black",
                      fontFamily: "Andika",
                      marginVertical: 10,
                      fontSize: 14,
                    }}
                  >
                    {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ratione adipisci exercitationem sapiente modi. Perspiciatis
                  ipsum veniam sapiente officia, fugit obcaecati. */}
                    {aboutMe}
                  </Text>
                  <TouchableOpacity onPress={() => nextStep()}>
                    <View
                      style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Feather
                        name="edit"
                        size={28}
                        color="black"
                        onPress={navigation.toggleDrawer}
                        style={{ paddingRight: 5 }}
                      />
                      <Text style={{ fontFamily: "Andika", fontSize: 18 }}>
                        Edit Profile
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ position: "absolute", zIndex: 2 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: WIDTH * 0.9,
                      justifyContent: "space-between",
                      marginHorizontal: 20,
                      marginTop: WIDTH / 10,
                    }}
                  >
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                      <View>
                        <Feather
                          name="menu"
                          size={28}
                          color="white"
                          style={{ paddingHorizontal: 20, paddingTop: 10 }}
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: "center" }}>
                      <Feather
                        name="edit"
                        size={24}
                        color="white"
                        onPress={_pickImage}
                        style={{ paddingHorizontal: 20, paddingTop: 10 }}
                      />
                      <Text style={{ color: "white", fontSize: 14 }}>
                        Change Pic
                      </Text>
                    </View>
                  </View>
                  <View style={{ position: "absolute", top: HEIGHT / 1.45 }}>
                    <Text
                      style={{
                        fontSize: 50,
                        color: "white",
                        marginHorizontal: WIDTH / 10,
                        paddingBottom: 10,
                        fontFamily: "NewYorkl",
                      }}
                    >
                      {name}
                    </Text>
                    {age == "" && travellerType == "" ? null : (
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            // paddingBottom: 20,
                          }}
                        >
                          <FontAwesome
                            name="circle"
                            size={20}
                            color="green"
                            style={{
                              marginLeft: WIDTH / 10,
                            }}
                          />
                          <Text
                            style={{
                              marginLeft: WIDTH / 20,
                              color: "white",
                              fontFamily: "Andika",
                            }}
                          >
                            {age},{travellerType}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        );

      case 2:
        return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
              style={{ flex: 1, height: HEIGHT }}
              // behavior="position"
            >
              <ScrollView>
                <View
                  style={{
                    position: "absolute",
                    alignItems: "flex-start",
                    rotation: 10,
                  }}
                >
                  <ImageBackground
                    style={{
                      width: WIDTH * 1.2,
                      position: "absolute",
                      height: HEIGHT / 1.5,
                      top: -WIDTH / 2,

                      overflow: "hidden",
                    }}
                    resizeMode="stretch"
                    // source={{ uri: user.photoURL }}
                    source={{
                      uri:
                        "https://images.pexels.com/photos/207237/pexels-photo-207237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    }}
                  />
                </View>
                <View
                  style={{
                    height: HEIGHT / 8,
                    alignItems: "center",
                    flexDirection: "row",
                    // position: "absolute",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      updateUser();
                      navigation.toggleDrawer();
                    }}
                  >
                    <View style={{ flex: 0.2, zIndex: 2 }}>
                      <AntDesign
                        name="left"
                        size={28}
                        color="black"
                        style={{ paddingHorizontal: 20, paddingTop: 10 }}
                        onPress={() => prevStep()}
                      />
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 0.8,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: 15,
                    }}
                  >
                    <Text style={{ fontSize: 20, fontFamily: "NewYorkl" }}>
                      Profile
                    </Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      width: WIDTH,
                      alignItems: "center",
                      marginTop: HEIGHT / 4,
                    }}
                  >
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={(value) => setName(value)}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Type"
                        value={travellerType}
                        keyboardType="visible-password"
                        onChangeText={(value) => setTravellerType(value)}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        keyboardType="email-address"
                        onChangeText={(value) => setEmail(value)}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                      <View style={{ width: WIDTH / 2, paddingHorizontal: 20 }}>
                        <TextInput
                          style={styles.input}
                          placeholder="Age"
                          value={age}
                          keyboardType="visible-password"
                          onChangeText={(value) => setAge(value)}
                        />
                      </View>

                      <View style={{ width: WIDTH / 2 }}>
                        <TextInput
                          style={styles.input}
                          placeholder="Gender"
                          value={gender}
                          onChangeText={(value) => setGender(value)}
                        />
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="About Me"
                        value={aboutMe}
                        onChangeText={(value) => setAboutMe(value)}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={number}
                        onChangeText={(value) => setNumber(value)}
                        keyboardType="number-pad"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        multiline
                        onChangeText={(value) => setAddress(value)}
                      />
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          prevStep();
                        }}
                      >
                        <View style={styles.otpButton}>
                          <Text style={styles.otpText}> Discard</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => updateUser()}>
                        <View
                          style={[
                            styles.otpButton,
                            { backgroundColor: "white" },
                          ]}
                        >
                          <Text style={[styles.otpText, { color: "black" }]}>
                            save
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        );
    }
  };

  return (
    <>
      {!loaded ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        />
      ) : (
        <>{renderPage(step)}</>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = new StyleSheet.create({
  input: {
    marginHorizontal: 20,
    width: WIDTH * 0.8,
    height: 60,
    color: "#333",
    fontWeight: "bold",
    fontFamily: "Andika",
    fontSize: 18,
  },
  inputContainer: {
    height: HEIGHT / 15,
    borderRadius: 10,
    // backgroundColor: "#0009",
    marginBottom: 20,
    borderBottomColor: "grey",
    // borderWidth: 2,
    // borderBottomWidth: 2,
  },
  otpButton: {
    // marginTop: HEIGHT / 25,
    // marginBottom: 85,
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
});