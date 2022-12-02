import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Home,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "../Components/BackButton";
const NotificationsScreen = () => {
  return (
    <>
      <View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#1C9D22", "#3BC485", "#26D92F"]}
          style={styles.screenTitleView}
        >
          {/* <View>
          <Text>FindBigWork</Text>
        </View> */}
          <View>
            <Text style={styles.screenTitle}>
              My Notifications
              {/* Hi, {userData.user_display_name} */}
            </Text>
            {/* <Text>{getCurrentDate()}</Text> */}
          </View>
          {/* <TouchableOpacity onPress={() => navHook.navigate("Notifications")}>
            <Icon name="bell" size={30} color="white" />
            {/* <Icon name="bell-cancel-outline" size={30} /> */}
          {/* <Icon name="bell-badge-outline" size={30} /> */}
          {/* <Icon name="bell-badge" size={30} color="white" /> */}
          {/* </TouchableOpacity>  */}
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <View
            style={{
              padding: 10,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text>No Notifications Yet</Text>
          </View>
        </View>
      </View>
      <BackButton />
    </>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  screenTitleView: {
    paddingVertical: 30,
    // backgroundColor: "lightgreen",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 20,
    color: "white",
  },
});
