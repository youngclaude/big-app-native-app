import {
  StyleSheet,
  Text,
  View,
  Button,
  // Touchable,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextInput, Divider, Avatar, TextInputIcon } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

const SignInScreen = () => {
  const toast = useToast();
  const [text, onChangeText] = useState("Useless Text");
  const [number, onChangeNumber] = useState(null);
  const [userName, onChangeUserName] = useState("");
  const [passWord, onChangePassword] = useState("");

  const dispatch = useDispatch();

  const handleSignInPress = async () => {
    console.log("SignUp pressed");
    try {
      const signInDispatchResults = await dispatch.authModel.loginToWP({
        userName,
        passWord,
      });
      // let newVar = await dispatch.authModel.testFunc1(
      //   "hey heres some test text"
      // );

      if (signInDispatchResults) {
        toast.show(`Welcome!`, {
          type: "success",
          duration: 5000,
        });
      }

      // console.log({ signInDispatchResults });
    } catch (dispatchError) {
      console.log({ dispatchError });
      if (toast.show) {
        toast.show(`Error: ${dispatchError.errorMessage}`, {
          type: "danger",
          duration: 5000,
        });
      }
    }
  };

  const fireToast = () => {
    // if (toast.show) {
    //   // console.log("toast.show;", toast?.show);
    //   toast.show("Hello World");
    //   console.log({ toast });
    //   toast.show("Task finished successfully", {
    //     // type: "normal | success | warning | danger | custom",
    //     type: "danger",
    //     // placement: "top | bottom",
    //     placement: "top",
    //     duration: 4000,
    //     offset: 30,
    //     // animationType: "slide-in | zoom-in",
    //     animationType: "slide-in",
    //   });
    // }
  };

  useEffect(() => {
    fireToast();
    return () => {
      // second
    };
  }, [toast, useToast]);

  return (
    <View style={styles.page}>
      <View style={styles.wrapper}>
        <Text style={styles.appTitle}>FindBigWork</Text>
        <Text style={styles.signInText}>Sign In</Text>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            // style={styles.input}
            style={styles.input}
            onChangeText={onChangeUserName}
            value={userName}
            placeholder="User Name"
            left={<TextInput.Icon icon="account" />}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={passWord}
            placeholder="Password"
            secureTextEntry
            left={<TextInput.Icon icon="lock" />}
            // keyboardType="numeric"
          />
        </View>

        <Pressable style={styles.signInbtnWrapper} onPress={handleSignInPress}>
          <Text style={styles.signInbtnText}> Sign In </Text>
        </Pressable>
        {/* <Pressable style={styles.signUpbtnWrapper} >
          <Text style={styles.signUpbtnText}> Sign Up </Text>
        </Pressable> */}

        {/* Social Logins  */}
        {/* <Separator text="OR" multiplier={0} /> */}
        <View style={{ alignItems: "center" }}>
          <Text>
            Don't have an account?
            <TouchableOpacity>
              <Text style={styles.signUpSmallText}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>

        {/* <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
        ></View> */}
        <Divider
          style={{
            marginVertical: 20,
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={styles.thirdPartySignIn}>
            <Image
              source={require("./../../../assets/pngs/fb_icon.png")}
              style={styles.thirdPartySignInIcon}
            />
            <Text style={styles.thirdPartySignInText}>
              Sign in with Facebook
            </Text>
          </View>
          <View style={styles.thirdPartySignIn}>
            <Image
              source={require("./../../../assets/pngs/google-icon.png")}
              style={styles.thirdPartySignInIcon}
            />
            <Text style={styles.thirdPartySignInText}>Sign in with Google</Text>
          </View>
        </View>
        <View style={{ marginTop: 200 }}>
          <Text>Coppywrite 2022</Text>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  wrapper: {
    // alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  appTitleWrapper: {},
  appTitle: {
    color: "silver",
    fontSize: 50,
    fontWeight: "bold",
  },
  signInbtnWrapper: {
    width: "100%",
    backgroundColor: "green",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 5,
    shadowColor: "#52006A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 25,
  },
  signInbtnText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  signInText: {
    color: "black",
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 40,
  },
  signUpbtnWrapper: {
    width: "100%",
    backgroundColor: "lightgreen",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 15,
  },
  signUpbtnText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  signUpSmallText: {
    textDecorationLine: "underline",
    color: "green",
    marginLeft: 5,
  },
  thirdPartySignIn: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  thirdPartySignInText: {
    fontSize: 10,
    marginLeft: 5,
  },
  thirdPartySignInIcon: { width: 20, height: 20 },
  input: {
    backgroundColor: "white",
    marginVertical: 5,
  },
});
