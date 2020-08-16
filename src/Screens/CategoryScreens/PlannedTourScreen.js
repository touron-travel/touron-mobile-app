import React, { useState, useEffect, useContext } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DatePicker } from "native-base";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Tourname from "./Reusable components/Tourname";
import Checkout from "./Reusable components/Checkout";
import Destination from "./Reusable components/Destination";
import Tourtype from "./Reusable components/Tourtype";
import Travellertype from "./Reusable components/Travellertype";
import Travelmode from "./Reusable components/Travelmode";
import Touristnumber from "./Reusable components/Touristnumber";
import * as firebase from "firebase";
import { AuthContext } from "../../context/AuthContext";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const PlannedTourScreen = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tourType, setTourType] = React.useState("");
  const [travellerType, setTravellerType] = React.useState("");
  const [adult, setAdult] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [travelMode, setTravelMode] = React.useState("");
  const [preferanece, setPreferanece] = React.useState("");
  const [destination, setDestination] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [number, setNumber] = useState("");
  const [step, setStep] = useState(1);
  const { isLoggedIn } = useContext(AuthContext);

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

  const description = `This tour is perfect for all busy-bee travel enthusiasts! Our itinerary completely depends on you and your preferences and wepersonalize the whole tour accordingly
   We offer you a complete list ofthings to do, places to visit, etc. and further prepare an appropriate itinerary for you within your budget and according to your travel preferences, making the experience worth every penny!`;

  const renderForm = (step) => {
    switch (step) {
      case 1:
        return (
          <Tourname
            step={() => nextStep()}
            imgSrc={
              "https://image.freepik.com/free-vector/traveling-man-with-backpack-luggage-camping-trip-outdoor-adventure-hiking-hipster-tourism-engraved-hand-drawn-old-sketch-vintage-style-vacation-tour_248627-527.jpg"
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
      case 5:
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
      case 6:
        return (
          <View style={{ alignItems: "center" }}>
            <View style={styles.imageContainer}>
              <Image
                style={{ height: HEIGHT / 3, width: WIDTH * 0.8 }}
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
                        <Text style={{ fontSize: 16, marginLeft: 5 }}>
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
      case 7:
        return (
          <Destination
            imgSrc={
              "https://image.freepik.com/free-vector/destination-concept-illustration_114360-453.jpg"
            }
            destination={destination}
            preferanece={preferanece}
            startPoint={startPoint}
            setDestination={(value) => setDestination(value)}
            setStartPoint={(value) => setStartPoint(value)}
            setPreferanece={(value) => setPreferanece(value)}
          />
        );
      case 8:
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
    firebase
      .database()
      .ref(`planned-tours/${userID}`)
      .push({
        tourType: tourType,
        travellerType: travellerType,
        fromDate: fromDate,
        adult: adult,
        children: children,
        travelMode: travelMode,
        startPoint: startPoint,
        toDate: toDate,
        preferanece: preferanece,
        destination: destination,
        name: name,
        number: number,
        budget: budget,
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    // console.log(
    //   tourType,
    //   travellerType,
    //   fromDate,
    //   adult,
    //   children,
    //   travelMode,
    //   startPoint,
    //   toDate,
    //   preferanece,
    //   destination,
    //   name,
    //   number,
    //   budget
    // );
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
              //   console.log("logged");
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
          Planned Tour
        </Text>

        <TouchableOpacity
          onPress={() => {
            nextStep();
          }}
        >
          {step !== 8 ? (
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
              width: WIDTH == 360 ? 38.5 * step : 45 * step,
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

export default PlannedTourScreen;

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
  dateContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    position: "relative",
  },
  arrowsContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: WIDTH / 15,
    position: "relative",
  },
  imageContainer: {
    height: HEIGHT / 2.5,
    width: WIDTH,
    alignItems: "center",
    marginTop: 20,
  },
});
