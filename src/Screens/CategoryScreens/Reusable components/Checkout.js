import React, { useState } from "react";
import { HelperText } from "react-native-paper";
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Checkout = ({
  imgSrc,
  setName,
  setBudget,
  setNumber,
  submitData,
  name,
  number,
  budget,
}) => {
  const [val, setVal] = useState();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/* <KeyboardAvoidingView
        style={{ flex: 1, height: HEIGHT }}
        behavior="position"
      > */}
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            height: HEIGHT / 2.5,
            width: WIDTH,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Image
            style={{ height: HEIGHT / 2.5, width: 300 }}
            source={{ uri: imgSrc }}
          />
        </View>
        <View
          style={{
            height: HEIGHT / 2.65,
            width: WIDTH * 0.9,
            marginHorizontal: 40,
          }}
        >
          <View
            style={{
              height: HEIGHT / 13,
              flexDirection: "row",
              width: WIDTH * 0.9,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 20, fontFamily: "Andika" }}>Name:</Text>
            </View>
            <View>
              <TextInput
                onChangeText={(value) => setName(value)}
                placeholder="Vikash"
                value={name}
              />
            </View>
          </View>
          <View
            style={{
              height: HEIGHT / 13,
              flexDirection: "row",
              width: WIDTH * 0.9,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 20, fontFamily: "Andika" }}>
                Budget:
              </Text>
            </View>
            <View>
              <TextInput
                onChangeText={(value) => setBudget(value)}
                keyboardType="number-pad"
                value={budget}
                placeholder="250000"
              />
            </View>
          </View>
          <View
            style={{
              height: HEIGHT / 13,
              flexDirection: "row",
              width: WIDTH * 0.9,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontFamily: "Andika" }}>
                Whatsapp Number:
              </Text>
            </View>
            <View>
              <TextInput
                value={number}
                keyboardType="number-pad"
                onChangeText={(value) => {
                  setVal(value);
                  setNumber(value);
                }}
                placeholder="8986754345"
              />
            </View>
          </View>
          <HelperText
            type="info"
            visible={val === "" ? false : true}
            style={{
              fontFamily: "Avenir",
              color: "red",
              textAlign: "center",
            }}
          >
            Enter valid Whatsapp number to reach you
          </HelperText>
          <View
            style={{
              height: HEIGHT / 13,

              width: WIDTH * 0.9,
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => submitData()}>
              <View
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 20,
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    padding: 10,
                  }}
                >
                  Submit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>
  );
};

export default Checkout;
