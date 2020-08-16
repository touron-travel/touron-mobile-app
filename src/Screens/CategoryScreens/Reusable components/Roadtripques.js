import React from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Roadtripques = ({
  imgSrc,
  attr1,
  attr2,
  attr3,
  que1,
  que2,
  que3,
  func1,
  func2,
  func3,
  placeholder1,
  placeholder2,
  placeholder3,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              height: HEIGHT / 2.5,
              width: WIDTH,
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Image
              style={{ height: HEIGHT / 2.7, width: WIDTH * 0.8 }}
              source={{ uri: imgSrc }}
            />
          </View>

          <View>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Get the best planned road trip
            </Text>
            <View
              style={{
                height: HEIGHT / 2.65,
                marginTop: 20,
                width: WIDTH * 0.9,
                marginHorizontal: 40,

                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: HEIGHT / 13,
                  flexDirection: "row",
                  width: WIDTH * 0.9,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View style={{ width: WIDTH / 2 }}>
                  <Text style={{ fontSize: 14 }}>{que1}</Text>
                </View>
                <View style={{ width: WIDTH / 3 }}>
                  <TextInput
                    placeholder={placeholder1}
                    multiline
                    style={{ fontSize: 14 }}
                    value={attr1}
                    onChangeText={(value) => func1(value)}
                  />
                </View>
              </View>
              <View
                style={{
                  height: HEIGHT / 13,
                  flexDirection: "row",
                  width: WIDTH * 0.9,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View style={{ width: WIDTH / 2 }}>
                  <Text style={{ fontSize: 14 }}>{que2}</Text>
                </View>
                <View style={{ width: WIDTH / 3 }}>
                  <TextInput
                    placeholder={placeholder2}
                    style={{ fontSize: 14 }}
                    multiline
                    value={attr2}
                    onChangeText={(value) => func2(value)}
                  />
                </View>
              </View>

              <View
                style={{
                  height: HEIGHT / 13,
                  flexDirection: "row",
                  width: WIDTH * 0.9,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View style={{ width: WIDTH / 2 }}>
                  <Text style={{ fontSize: 14 }}>{que3}</Text>
                </View>
                <View style={{ width: WIDTH / 3 }}>
                  <TextInput
                    placeholder={placeholder3}
                    multiline
                    style={{ fontSize: 14 }}
                    value={attr3}
                    onChangeText={(value) => func3(value)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Roadtripques;
