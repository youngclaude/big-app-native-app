import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/core";

const BackButton = () => {
  const navHook = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backBtnStyle}
      onPress={() => navHook.goBack()}
    >
      <BlurView style={{ borderRadius: 20, padding: 10 }} intensity={2}>
        <Icon name="keyboard-backspace" size={40} color="white" />
      </BlurView>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backBtnStyle: {
    // backgroundColor: "grey",
    position: "absolute",
    top: 20,
    left: 10,
  },
});
