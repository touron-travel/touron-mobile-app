import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import Checked from "./Checked";
const Tourtype = ({
  imgSrc1,
  imgScr2,
  nextStep,
  tourType,
  setDomestic,
  setInternational,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ marginTop: HEIGHT / 20 }}>
        <Text style={{ fontSize: 22 }}>Pick the type of tour! </Text>
      </View>

      <View style={{ marginHorizontal: 10 }}>
        <View
          style={{
            height: HEIGHT / 3.3,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setDomestic();
              nextStep();
            }}
          >
            <View style={styles.tourImageContainer}>
              <View style={{ position: "absolute", top: 10, right: 10 }}>
                {tourType == "Domestic" ? <Checked /> : null}
              </View>
              <Image
                style={{
                  height: 120,
                  width: 120,
                }}
                source={imgSrc1}
              />
            </View>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", fontSize: 20 }}>Domestic</Text>
        </View>
        <View
          style={{
            height: HEIGHT / 3.3,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setInternational();
              nextStep();
            }}
          >
            <View style={styles.tourImageContainer}>
              <View style={{ position: "absolute", top: 10, right: 10 }}>
                {tourType == "International" ? <Checked /> : null}
              </View>
              <Image
                style={{
                  height: 120,
                  width: 120,
                }}
                // source={imgScr2}
                source={imgScr2}
              />
            </View>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            International
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Tourtype;

const styles = StyleSheet.create({
  tourImageContainer: {
    height: 150,
    alignItems: "center",
    width: 200,
    justifyContent: "center",
  },
});
