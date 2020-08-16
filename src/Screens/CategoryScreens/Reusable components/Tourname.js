import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Tourname = ({ imgSrc, step, description }) => {
  //   const [step, setStep] = useState(1);
  //   const nextStep = () => {
  //     setStep(stepCount + 1);
  //   };
  // console.log(imgSrc);
  return (
    <View>
      <View
        style={{
          width: WIDTH,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: imgSrc }}
          style={{ height: HEIGHT / 3, width: 230, marginTop: 20 }}
        />
      </View>

      <View style={{ marginHorizontal: WIDTH / 9 }}>
        <Text style={{ fontSize: 14, fontStyle: "italic" }}>{description}</Text>
      </View>

      <TouchableOpacity onPress={step}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonText: {
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
  },
});

export default Tourname;
