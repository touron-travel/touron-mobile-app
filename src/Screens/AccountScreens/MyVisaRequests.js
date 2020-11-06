import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import { List, Surface } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

const MyVisaRequestsScreen = ({ navigation }) => {
  const [visaRequest, setVisaRequest] = useState([]);
  const { user } = useContext(AuthContext);
  const [step, setStep] = useState(0);
  const [visaData, setVisaData] = useState({});
  const getUserVisaRequest = () => {
    const request = [];
    firebase
      .database()
      .ref(`visaSubmission`)
      .on("value", (data) => {
        data.forEach((c) => {
          if (c.val().userID === user.uid) {
            console.log(c.val(), "LLLLLL");
            request.push(c.val());
          }
          setVisaRequest(request);
        });
      });
  };

  useEffect(() => {
    getUserVisaRequest();
  }, []);

  const renderScreen = () => {
    switch (step) {
      case 0:
        return (
          <View
            animation="bounceIn"
            duration={3000}
            style={{ flex: 1, backgroundColor: "white" }}
          >
            <View
              style={{
                backgroundColor: "#28C9E1",
                height: HEIGHT / 8,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View style={{ flex: 0.2 }}>
                  <Feather
                    name="arrow-left"
                    size={28}
                    color="black"
                    style={{ paddingHorizontal: 20, paddingTop: -10 }}
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
                <Text style={{ color: "white", fontSize: 20 }}>
                  My Visa Request
                </Text>
              </View>
            </View>
            {visaRequest.length == 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    height: HEIGHT / 2,
                    width: WIDTH * 0.7,
                    marginTop: WIDTH / 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  source={require("../../../assets/myplans.png")}
                />
                <Text
                  style={{
                    fontFamily: "Avenir",
                    fontSize: 20,
                    marginTop: WIDTH / 10,
                  }}
                >
                  No Visa Request Yet
                </Text>
                <Text
                  style={{
                    fontFamily: "WSansl",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Go to Visa Page and put some request
                </Text>
              </View>
            ) : (
              <View>
                <FlatList
                  data={visaRequest}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setStep(1);
                          setVisaData(item);
                        }}
                      >
                        <List.Section>
                          <List.Item
                            title={item.countryName}
                            style={{ margin: 10 }}
                            left={(props) => (
                              <View
                                style={{
                                  marginHorizontal: 5,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <FontAwesome5
                                  name="passport"
                                  size={23}
                                  color="#C1C5C6"
                                />
                              </View>
                            )}
                          />
                        </List.Section>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
          </View>
        );

      case 1:
        return <>{visaFormInner(visaData)}</>;
    }
  };

  const visaFormInner = (data) => {
    return (
      <View
        style={{
          alignItems: "center",

          justifyContent: "center",
          flex: 1,
          backgroundColor: "#34495e",
        }}
      >
        <Surface
          style={{
            backgroundColor: "white",
            padding: 30,
            alignItems: "center",
            borderRadius: 30,
            elevation: 100,
            shadowColor: "#7ed6df",
            shadowOpacity: 3,
          }}
        >
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 30, fontFamily: "Avenir" }}>
              {" "}
              Visa Details of {data.name}{" "}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Name : </Text>
            <Text style={styles.text}>{data.name}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Country Name : </Text>
            <Text style={styles.text}>{data.countryName}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Phone Number: </Text>
            <Text style={styles.text}>{data.phoneNumber}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Travel Month: </Text>
            <Text style={styles.text}>{data.travelMonth}</Text>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setStep(0)}>
              <Text style={styles.button}>Back</Text>
            </TouchableOpacity>
          </View>
        </Surface>
      </View>
    );
  };
  return <>{renderScreen()}</>;
};

export default MyVisaRequestsScreen;

const styles = new StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  text: {
    fontSize: 17,
    fontFamily: "Andika",
    textAlign: "left",
  },
  text1: {
    fontSize: 14,
    fontFamily: "Andika",
  },
  button: {
    backgroundColor: "#34495e",
    paddingVertical: 13,
    paddingHorizontal: 20,
    color: "white",
    fontSize: 18,
    fontFamily: "WSansl",
    borderRadius: 20,
  },
});
