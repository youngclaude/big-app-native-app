import {
  StyleSheet,
  Text,
  View,
  Button,
  Switch,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, DevSettings } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

const SettingRow = ({ item }) => {
  return (
    <TouchableOpacity style={styles.settingsRow} onPress={item.givenRoute}>
      <View style={styles.sectionOne}>
        <Ionicons
          name={item.iconName}
          color="black"
          size={20}
          style={{ padding: 5 }}
        />
        <Text style={styles.settingTextLabel}>{item.settingTitle}</Text>
      </View>
      <Ionicons name="arrow-forward" color="black" size={35} />
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const [appModeBool, setAppModeBool] = useState(false);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authModel);
  const { mode } = useSelector((state) => state.appData);

  useEffect(() => {
    // userInfo?.avatar_url["48"];
    // console.log("userInfo?.avatar_url", userInfo.avatar_urls[24]);
    console.log("mode", mode);
    return () => {};
  });

  const handleLogOutClick = () => {
    console.log("logout press");

    dispatch.authModel.logout();
  };
  const handlePress = () => {
    console.log("handlePress");
    dispatch.authModel.testFunc1();
  };
  const handleSwitchModes = () => {
    console.log("handleSwitchModes");
    // dispatch.authModel.testFunc1();
    setAppModeBool((previousState) => !previousState);
    dispatch.appData.toggleClientOrWorkerModes();
  };

  const generalSettings = [
    {
      iconName: "person",
      settingTitle: "Account Details",
      givenRoute: () => {},
    },
    {
      iconName: "person",
      settingTitle: "Language",
      givenRoute: () => {},
    },
    {
      iconName: "person",
      settingTitle: "Data",
      givenRoute: () => {},
    },
    {
      iconName: "person",
      settingTitle: "Security",
      givenRoute: () => {},
    },
  ];

  const helpSettings = [
    {
      iconName: "person",
      settingTitle: "Privacy Policy",
      givenRoute: () => {},
    },
    {
      iconName: "person",
      settingTitle: "Help",
      givenRoute: () => {},
    },
    {
      iconName: "person",
      settingTitle: "FAQs",
      givenRoute: () => {},
    },
    {
      iconName: "person",
      settingTitle: "Give Us Your Feedback",
      givenRoute: () => {},
    },
  ];
  const preferenceSettings = [
    {
      iconName: "person",
      settingTitle: "App Appearance",
      givenRoute: () => {},
    },
    {
      iconName: "person",
      settingTitle: "Notifications",
      givenRoute: () => {},
    },
  ];

  return (
    <ScrollView>
      {/* Top Settings Bar */}

      <View
        style={{
          paddingVertical: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Image
            source={{ uri: userInfo.avatar_urls[96] }}
            style={{ width: 100, height: 100, borderRadius: 20 }}
          />
        </View>
        <Text style={styles.screenTitle}>Settings</Text>
      </View>

      {/* Quick Buttons */}
      {/* <Button title="Reload" onPress={handlePress} /> */}
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Text>Client</Text>
          <Switch
            onValueChange={handleSwitchModes}
            value={mode.clientOrWorker !== "client"}
            onTouchStart={handleSwitchModes}
          ></Switch>
          <Text>Worker</Text>
        </View>
      </View>

      {/* Display setting option screens */}
      {/* Settings Group  */}

      <Text style={styles.settingsGroupHeading}>General</Text>
      <View style={styles.settingsGroup}>
        <FlatList
          data={generalSettings}
          renderItem={({ item }) => <SettingRow item={item} />}
        />
      </View>
      {/* Settings Group  */}
      <Text style={styles.settingsGroupHeading}>Help</Text>
      <View style={styles.settingsGroup}>
        <FlatList
          data={helpSettings}
          renderItem={({ item }) => <SettingRow item={item} />}
        />
      </View>

      <Text style={styles.settingsGroupHeading}>Preferences</Text>
      <View style={styles.settingsGroup}>
        <FlatList
          data={preferenceSettings}
          renderItem={({ item }) => <SettingRow item={item} />}
        />
      </View>
      {/* Logout  */}
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 20,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={handleLogOutClick}
          style={styles.logoutBtnWrapper}
        >
          <Ionicons
            name="exit-outline"
            color="red"
            size={20}
            style={{ marginHorizontal: 5 }}
          />
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  screenTitle: {
    fontSize: 30,
    paddingLeft: 10,
    marginTop: 10,
    fontWeight: "600",
  },
  settingsGroup: {
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 20,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  sectionOne: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingTextLabel: {
    fontSize: 10,
  },
  logoutBtnWrapper: {
    width: "100%",
    marginHorizontal: 20,
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    borderColor: "red",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutBtnText: {
    color: "red",
  },
  settingsGroupHeading: {
    marginLeft: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default SettingsScreen;
