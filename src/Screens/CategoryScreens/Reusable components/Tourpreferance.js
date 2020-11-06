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
const Tourpreferance = ({
  imgSrc1,
  imgSrc2,
  imgSrc3,
  imgScr4,
  tourPreferance,
  setAdventure,
  setRelaxation,
  setCultural,
  setExplore,
  nextStep,
}) => {
  return (
    <View>
      <View style={{ marginVertical: HEIGHT / 20, marginHorizontal: 5 }}>
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          When you travel,you prefer?
        </Text>
      </View>
      <View>
        <View style={styles.travelTypeContainer}>
          <TouchableOpacity
            onPress={() => {
              setAdventure();
              nextStep();
            }}
          >
            <View style={styles.travelTypeView}>
              <View styles={[styles.travelTypeView]}>
                <View style={{ position: "absolute", top: -30, right: -20 }}>
                  {tourPreferance == "Action" ? <Checked /> : null}
                </View>
                <Image
                  style={{
                    height: HEIGHT / 6,
                    width: 150,
                    marginVertical: 10,
                  }}
                  source={{
                    uri: imgSrc1,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginVertical: 10,
                  }}
                >
                  Action
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRelaxation();
              nextStep();
            }}
          >
            <View style={styles.travelTypeView}>
              <View styles={[styles.travelTypeView]}>
                <View style={{ position: "absolute", top: -25, right: 0 }}>
                  {tourPreferance == "Relaxation" ? <Checked /> : null}
                </View>
                <Image
                  style={{
                    height: HEIGHT / 6,
                    width: 180,
                    marginVertical: 10,
                  }}
                  source={{ uri: imgSrc2 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginVertical: 10,
                  }}
                >
                  Relaxation
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.travelTypeContainer}>
          <TouchableOpacity
            onPress={() => {
              setCultural();
              nextStep();
            }}
          >
            <View style={styles.travelTypeView}>
              <View styles={[styles.travelTypeView]}>
                <View style={{ position: "absolute", top: -30, right: -20 }}>
                  {tourPreferance == "Cultural" ? <Checked /> : null}
                </View>
                <Image
                  style={{
                    height: HEIGHT / 6,
                    width: 130,
                    marginVertical: 10,
                  }}
                  //   source={imgSrc3}
                  source={{
                    uri: imgSrc3,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginVertical: 10,
                  }}
                >
                  Cultural
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setExplore();
              nextStep();
            }}
          >
            <View style={styles.travelTypeView}>
              <View styles={[styles.travelTypeView]}>
                <View style={{ position: "absolute", top: -30, right: -20 }}>
                  {tourPreferance == "Explore" ? <Checked /> : null}
                </View>
                <Image
                  style={{
                    height: HEIGHT / 6,
                    width: 150,
                    marginVertical: 10,
                  }}
                  source={{ uri: imgScr4 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginVertical: 10,
                  }}
                >
                  Explore
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Tourpreferance;

const styles = StyleSheet.create({
  travelTypeContainer: {
    width: WIDTH,
    height: HEIGHT / 3.7,
    flexDirection: "row",
  },
  travelTypeView: {
    width: WIDTH / 2,
    height: HEIGHT / 3.9,
    alignItems: "center",
  },
});
