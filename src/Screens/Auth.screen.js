import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AuthScreen = () => {
  const [text, onChangeText] = useState("Useless Text");
  const [number, onChangeNumber] = useState(null);
  const [userName, onChangeUserName] = useState("");
  const [passWord, onChangePassword] = useState("");

  const dispatch = useDispatch();

  const handleOnFirePress = () => {
    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));

    dispatch.authModel.loginToWP({ userName, passWord });
    // dispatch.authModel.testAuthFunc();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>AuthScreen</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUserName}
        value={userName}
        placeholder="UserName"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={passWord}
        placeholder="password"
        secureTextEntry
        // keyboardType="numeric"
      />
      <Button title="Fire!" onPress={handleOnFirePress} />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
