import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Tourname from "./Reusable components/Tourname";
import Tourtype from "./Reusable components/Tourtype";
import Travellertype from "./Reusable components/Travellertype";
import Checkout from "./Reusable components/Checkout";
import Touristnumber from "./Reusable components/Touristnumber";
import Travelmode from "./Reusable components/Travelmode";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DatePicker } from "native-base";
import Expediture from "./Reusable components/Expediture";
import Tourpreferance from "./Reusable components/Tourpreferance";
import * as firebase from "firebase";

import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SurpriseTourScreen = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tourType, setTourType] = React.useState("");
  const [travellerType, setTravellerType] = React.useState("");
  const [adult, setAdult] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [travelMode, setTravelMode] = React.useState("");
  const [expediture1, setExpediture1] = useState("");
  const [expediture2, setExpediture2] = useState("");
  const [expediture3, setExpediture3] = useState("");
  const [tourPreferance, setTourPreferance] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [number, setNumber] = useState("");
  const [step, setStep] = useState(1);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleFromDate = (date) => {
    setDatePickerVisibility(false);
    setFromDate(date.toLocaleDateString("en-GB"));
  };

  const handleToDate = (date) => {
    setDatePickerVisibility(false);

    setToDate(date.toLocaleDateString("en-GB"));
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const description = `We surprise you with the best suitable location within your budget and according to your travel preferences. We don’t have concrete itineraries as we believe that you should decide where you want to invest your money. We also recommend various things to do which you can book yourself or we can book upon your confirmation.`;
  const renderForm = (step) => {
    switch (step) {
      case 1:
        return (
          <Tourname
            step={() => nextStep()}
            // imgSrc={require("../../../assets/surprise-tour/Surprise.png")}
            imgSrc={
              "https://image.freepik.com/free-vector/xmas-surprise-concept-illustration_114360-1824.jpg"
            }
            description={description}
          />
        );

      case 2:
        return (
          <Tourtype
            imgSrc1={require("../../../assets/planned-tour/india.png")}
            imgScr2={require("../../../assets/planned-tour/International.png")}
            nextStep={() => nextStep()}
            tourType={tourType}
            setDomestic={() => setTourType("Domestic")}
            setInternational={() => setTourType("International")}
          />
        );

      case 3:
        return (
          <Travellertype
            imgSrc1={
              "https://image.freepik.com/free-vector/local-tourism-concept_23-2148606915.jpg"
            }
            imgSrc2={
              "https://image.freepik.com/free-vector/big-happy-family-with-flat-design_23-2147834774.jpg"
            }
            imgSrc3={
              "https://image.freepik.com/free-vector/group-happy-students-with-backpacks-books-stand-together_131590-216.jpg"
            }
            imgScr4={
              "https://image.freepik.com/free-vector/couple-celebrating-valentine-s-day_23-2148538999.jpg"
            }
            travellerType={travellerType}
            nextStep={() => nextStep()}
            setSolo={() => setTravellerType("Solo")}
            setFamily={() => setTravellerType("Family")}
            setFriends={() => setTravellerType("Friends")}
            setHoneymoon={() => setTravellerType("Honeymoon")}
          />
        );
      case 4:
        return (
          <Tourpreferance
            imgSrc1={
              "https://image.freepik.com/free-vector/skydiving-vector-sport-illustration-extreme-sport-background-skydiving-wing-suit_87946-304.jpg"
            }
            imgSrc2={
              "https://image.freepik.com/free-vector/relaxing-concept-illustration_114360-289.jpg"
            }
            imgSrc3={
              "https://image.freepik.com/free-vector/illustration-kathakali-dancer-performing-white-mandala-pattern-background_1302-19495.jpg"
            }
            imgScr4={
              "https://image.freepik.com/free-vector/backpacker-with-map-search-directions-wilderness_80802-300.jpg"
            }
            tourPreferance={tourPreferance}
            setAdventure={() => setTourPreferance("Adventure")}
            setRelaxation={() => setTourPreferance("Relaxation")}
            setCultural={() => setTourPreferance("Cultural")}
            setExplore={() => setTourPreferance("Explore")}
            nextStep={() => nextStep()}
          />
        );
      case 5:
        return (
          <Touristnumber
            imgSrc1={
              "https://image.freepik.com/free-vector/illustration-with-young-people-concept_23-2148467324.jpg"
            }
            imgScr2={
              "https://image.freepik.com/free-vector/smiling-boy-girl-kids-holding-hands-childhood-friendship-concept-love-romance-children-cartoon-characters-flat-vector-illustration-isolated-white-background_71593-450.jpg"
            }
            nextStep={() => nextStep()}
            adult={adult}
            children={children}
            setChildren={(value) => setChildren(value)}
            setAdult={(value) => setAdult(value)}
          />
        );
      case 6:
        return (
          <Travelmode
            imgSrc1={
              "https://image.freepik.com/free-vector/train-ride-railroad_1308-11154.jpg"
            }
            imgScr2={
              "https://image.freepik.com/free-vector/airplane-sky_1308-31202.jpg"
            }
            nextStep={() => nextStep()}
            name1={"Train"}
            name2={"Flight"}
            travelMode={travelMode}
            setTrain={() => setTravelMode("Train")}
            setFlight={() => setTravelMode("Flight")}
          />
        );
      case 7:
        return (
          <View style={{ alignItems: "center" }}>
            <View style={styles.imageContainer}>
              <Image
                style={{ height: HEIGHT / 2.5, width: WIDTH * 0.8 }}
                source={{
                  uri:
                    "https://image.freepik.com/free-vector/build-your-program-appointment-booking_23-2148552954.jpg",
                }}
              />
            </View>

            <View style={{ marginVertical: 20 }}>
              <Text style={{ fontSize: 20, textAlign: "center" }}>
                When do you want to embark on your journey?
              </Text>
              <View style={styles.dateContainer}>
                <View style={{ width: WIDTH / 4 }}>
                  <Text style={{ fontSize: 20 }}>From:</Text>
                </View>
                <View style={styles.dateContainer}>
                  <View>
                    <TouchableOpacity onPress={showDatePicker}>
                      {fromDate == "" ? (
                        <Text style={{ fontSize: 16, marginRight: 18 }}>
                          Select date
                        </Text>
                      ) : (
                        <Text style={{ fontSize: 16, marginLeft: 55 }}>
                          {fromDate}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  value={fromDate}
                  onConfirm={handleFromDate}
                  onCancel={hideDatePicker}
                  display="spinner"
                />
              </View>
              <View style={styles.dateContainer}>
                <View style={{ width: WIDTH / 6 }}>
                  <Text style={{ fontSize: 20, marginLeft: 20 }}>To:</Text>
                </View>
                <View style={styles.dateContainer}></View>

                <DatePicker
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"spinner"}
                  onDateChange={handleToDate}
                />
              </View>
            </View>
          </View>
        );
      case 8:
        return (
          <Expediture
            imgSrc={
              "https://image.freepik.com/free-vector/romantic-car-illustration_166742-180.jpg"
            }
            expediture3={expediture3}
            expediture2={expediture2}
            expediture1={expediture1}
            startPoint={startPoint}
            setStartPoint={(value) => setStartPoint(value)}
            setExpediture3={(value) => setExpediture3(value)}
            setExpediture2={(value) => setExpediture2(value)}
            setExpediture1={(value) => setExpediture1(value)}
          />
        );
      case 9:
        return (
          <Checkout
            imgSrc={
              "https://image.freepik.com/free-vector/business-background-design_1270-63.jpg"
            }
            setName={(value) => setName(value)}
            setNumber={(value) => setNumber(value)}
            setBudget={(value) => setBudget(value)}
            submitData={() => submitData()}
            name={name}
            number={number}
            budget={budget}
          />
        );
      default:
        break;
    }
  };

  const submitData = () => {
    const user = firebase.auth().currentUser;
    console.log(user, "GHGHGHJGHJHGGHJHHGHGGHHJGGHJHJGGHGH");
    const userID = user.uid;
    console.log(userID);
    const tourData = {
      userId: userID,
      tourType: tourType,
      travellerType: travellerType,
      fromDate: fromDate,
      adult: adult,
      children: children,
      travelMode: travelMode,
      startPoint: startPoint,
      toDate: toDate,
      expediture1: expediture1,
      expediture2: expediture2,
      expediture3: expediture3,
      tourPreferance: tourPreferance,
      name: name,
      number: number,
      budget: budget,
    };
    firebase.database().ref(`surprise-tours/`).push(tourData);

    console.log(
      tourType,
      travellerType,
      fromDate,
      adult,
      children,
      travelMode,
      startPoint,
      toDate,
      expediture1,
      expediture2,
      expediture3,
      tourPreferance,
      name,
      number,
      budget
    );
  };

  if (!isLoggedIn) {
    navigation.navigate("SignUpScreen");
  }
  return (
    <View style={styles.container}>
      <View style={styles.arrowsContainer}>
        {step == 1 ? (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack("Home");
              console.log("logged");
            }}
          >
            <View>
              <AntDesign name="arrowleft" size={28} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => prevStep()}>
            <View>
              <AntDesign name="arrowleft" size={28} />
            </View>
          </TouchableOpacity>
        )}

        <Text
          style={{
            fontSize: 20,
            marginTop: Platform.OS == "android" ? HEIGHT / 14 : 80,
          }}
        >
          Surprise Trip
        </Text>

        <TouchableOpacity
          onPress={() => {
            nextStep();
          }}
        >
          {step !== 9 ? (
            <View>
              <AntDesign name="arrowright" size={28} />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      {step == 1 ? null : (
        <View style={styles.progressContainer}>
          <View
            style={{
              borderRadius: 20,
              height: 6.5,
              borderWidth: 2,
              borderColor: "#a2cffe",
              paddingVertical: 1,
              width: WIDTH == 360 ? 30.5 * step : 40 * step,
              overflow: "hidden",
              backgroundColor: "#a2cffe",
            }}
          ></View>
        </View>
      )}

      {renderForm(step)}
    </View>
  );
};

export default SurpriseTourScreen;

const styles = StyleSheet.create({
  progressContainer: {
    height: 10,
    marginHorizontal: 25,
    bottom: 0,
    justifyContent: "flex-start",
    borderWidth: 2,
    borderColor: "#f0f8ff",
    borderRadius: 20,
    marginTop: 20,
    bottom: 0,
  },
  imageContainer: {
    height: HEIGHT / 2.5,
    width: WIDTH,
    alignItems: "center",
    marginTop: 0,
  },
  dateContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  arrowsContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: WIDTH / 15,
    position: "relative",
  },
});
