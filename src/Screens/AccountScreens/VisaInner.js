import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

const VisaInner = ({ navigation, route }) => {
  const visaDetails = route.params.item;
  const [step, setStep] = useState(0);
  console.log(visaDetails, "asas");

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const renderItem = () => {
    switch (step) {
      case 0:
        return (
          <View>
            <Text style={styles.headings}>Document Required</Text>
            <Text>{visaDetails.salaryDocs.salaryDocsRequired}</Text>
            <Text style={styles.headings}>Financials</Text>
            <Text>{visaDetails.salaryDocs.salaryFinancials}</Text>
            <Text style={styles.headings}>Submisiion</Text>
            <Text>{visaDetails.salaryDocs.salarySubmission}</Text>
            <Text style={styles.headings}>Appointment</Text>
            <Text>{visaDetails.salaryDocs.salaryAppointment}</Text>
            <Text style={styles.headings}>Honeymooners</Text>
            <Text>{visaDetails.salaryDocs.salaryHoneymooners}</Text>
            <Text style={styles.headings}>Duration</Text>
            <Text>{visaDetails.salaryDocs.salaryDuration}</Text>
            <Text style={styles.headings}>Photograph</Text>
            <Text>{visaDetails.salaryDocs.salaryPhotography}</Text>
          </View>
        );
      case 1:
        return (
          <View>
            <Text style={styles.headings}>Document Required</Text>
            <Text>{visaDetails.selfEmployedDocs.selfEmployedDocsRequired}</Text>
            <Text style={styles.headings}>Financials</Text>
            <Text>{visaDetails.selfEmployedDocs.selfEmployedFinancials}</Text>
            <Text style={styles.headings}>Submisiion</Text>
            <Text>{visaDetails.selfEmployedDocs.selfEmployedSubmission}</Text>
            <Text style={styles.headings}>Appointment</Text>
            <Text>{visaDetails.selfEmployedDocs.selfEmployedAppointment}</Text>
            <Text style={styles.headings}>Honeymooners</Text>
            <Text>{visaDetails.selfEmployedDocs.selfEmployedHoneymooners}</Text>
            <Text style={styles.headings}>Duration</Text>
            <Text>{visaDetails.selfEmployedDocs.selfEmployedDuration}</Text>
            <Text style={styles.headings}>Photograph</Text>
            <Text>{visaDetails.selfEmployedDocs.selfEmployedPhotography}</Text>
          </View>
        );
    }
  };

  return (
    <ScrollView>
      <Animatable.View
        animation="bounceIn"
        duration={3000}
        style={{ flex: 1, position: "relative" }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            top: WIDTH / 14,
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Visa")}>
            <AntDesign name="arrowleft" size={36} color="#333" />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            width: WIDTH,
            height: HEIGHT / 3,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
          source={{ uri: visaDetails.imageUrl }}
        />

        <View>
          <View
            style={{
              position: "absolute",
              zIndex: 2,
              justifyContent: "center",
              alignItems: "center",
              width: WIDTH,
              top: -HEIGHT / 10 + 20,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                color: "white",
                fontFamily: "Avenir",
                fontWeight: "bold",
              }}
            >
              {visaDetails.countryName}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity onPress={() => prevStep()}>
            <Text
              style={{
                borderColor: "black",
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                borderWidth: 2,
                borderRightWidth: 0,
                paddingVertical: 4,
                paddingHorizontal: 18,
                backgroundColor: step == 0 ? "#A6C5CD" : null,
                color: step == 0 ? "white" : "black",
                alignItems: "center",
              }}
            >
              Salary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nextStep()}>
            <Text
              style={{
                borderColor: "black",
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderWidth: 2,
                padding: 4,
                backgroundColor: step == 1 ? "#A6C5CD" : null,

                color: step == 1 ? "white" : "black",
              }}
            >
              Self Employed
            </Text>
          </TouchableOpacity>
        </View>

        {renderItem()}
      </Animatable.View>
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  headings: {
    fontFamily: "Avenir",
    fontSize: 24,
    marginLeft: 10,
    marginTop: 5,
  },
});

export default VisaInner;
