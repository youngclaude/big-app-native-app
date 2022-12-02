/* global require */
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store } from "./src/config/store";
import { ToastProvider } from "react-native-toast-notifications";

// import store from "./src/config/store";
import HomeScreen from "./src/Screens/Home.screen";
import SettingsScreen from "./src/Screens/Settings.screen";
import PostAJobScreen from "./src/Screens/PostAJobs.screen";
import AuthScreen from "./src/Screens/Auth.screen";
import MyJobsScreen from "./src/Screens/Jobs/MyJobs.screen";
import SignInScreen from "./src/Screens/Auth/SignIn.screen";
import SignUpScreen from "./src/Screens/Auth/SignUp.screen";
import ForgotPasswordScreen from "./src/Screens/Auth/ForgotPassword.screen";
import SingleJobScreen from "./src/Screens/Jobs/SingleJob.screen";
import AllJobsScreen from "./src/Screens/Worker/AllJobs.screen";
import NotificationsScreen from "./src/Screens/Notifications.screen";
import JobManagerScreen from "./src/Screens/Clients/JobManager.screen";

// import { ViewPropTypes } from "react-native";
// var requirejs = require("requirejs");
// import MyJobsScreen from "./src/Screens/MyJobs.screen";

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const MyJobsStack = createNativeStackNavigator();

const ClientTab = createBottomTabNavigator();
const WorkerTab = createBottomTabNavigator();

const RenderMyJobsStack = () => (
  <MyJobsStack.Navigator screenOptions={{ headerShown: false }}>
    <MyJobsStack.Screen
      name="MyJobs"
      component={MyJobsScreen}
      options={{ title: "My Jobs" }}
    />
    <MyJobsStack.Screen name="SingleJobScreen" component={SingleJobScreen} />
    <MyJobsStack.Screen name="JobManagerScreen" component={JobManagerScreen} />
  </MyJobsStack.Navigator>
);

const AuthNavigator = (): React.ReactElement => {
  // ↓ effects ↓

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={"SignIn"} component={SignInScreen} />
      <AuthStack.Screen name={"SignUp"} component={SignUpScreen} />
      <AuthStack.Screen
        name={"ForgotPassword"}
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

const RenderHomeStack = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "Overview" }}
    />
    <HomeStack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{ title: "Notifications" }}
    />
  </HomeStack.Navigator>
);

const App = () => {
  const [showAuthScreen, setShowAuthScreen] = useState(true);
  const persistor = getPersistor();
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider offsetBottom={40} offsetTop={50} duration={3000}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ToastProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

const RootNavigator = (): React.ReactElement => {
  // const dispatch = useDispatch<Dispatch>();

  const { userData } = useSelector((state) => state.authModel);
  const { mode } = useSelector((state) => state.appData);

  let isAuthenticated = false;
  // const { authToken } = useSelector((state) => state.authModel);

  // useEffect(() => {
  //   // check auth on any app load
  //   // handle setting api auth header in user model since it is set there on each login
  //   dispatch.user.checkAuth(accessToken);
  // }, [accessToken, dispatch]);

  if (userData?.authToken !== undefined && userData?.authToken.length > 1) {
    isAuthenticated = userData?.authToken.length != "";
  }

  console.log({ isAuthenticated });

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        mode.clientOrWorker === "client" ? (
          <RootStack.Screen
            name={"ClientTabView"}
            component={RenderClientTabNav}
          />
        ) : (
          <RootStack.Screen
            name={"WorkerTabView"}
            component={RenderWorkerTabNav}
          />
        )
      ) : (
        <RootStack.Screen name={"AuthStack"} component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

const MyJobsScreen2 = () => {
  return (
    <View>
      <Text>MyJobsScreen</Text>
      <View style={{ alignItems: "center" }}>
        <SingleJobCard />
      </View>
    </View>
  );
};
const SingleJobCard = () => <View></View>;

const RenderClientTabNav = () => {
  return (
    <ClientTab.Navigator
      screenOptions={navTabSettings}
      // style={{ background: "red" }}
    >
      <ClientTab.Screen
        name="HomeStack"
        component={RenderHomeStack}
        options={{ tabBarLabel: "Home" }}
      />
      <ClientTab.Screen
        name="MyJobsNav"
        component={RenderMyJobsStack}
        options={{ tabBarLabel: "My Jobs" }}
      />
      <ClientTab.Screen
        name="PostAJobScreen"
        component={PostAJobScreen}
        options={{ tabBarLabel: "Post a Job" }}
      />
      <ClientTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: "Settings" }}
      />
    </ClientTab.Navigator>
  );
};
const RenderWorkerTabNav = () => {
  return (
    <WorkerTab.Navigator
      screenOptions={navTabSettings}
      // style={{ background: "red" }}
    >
      <WorkerTab.Screen
        name="AllJobs"
        component={AllJobsScreen}
        options={{ tabBarLabel: "All Jobs" }}
      />
      <WorkerTab.Screen
        name="MyBids"
        component={MyBidsScreen}
        options={{ tabBarLabel: "My Bids" }}
      />
      <WorkerTab.Screen
        name="PostAJobScreen"
        component={BuySellScreen}
        options={{ tabBarLabel: "Buy/ Sell" }}
      />
      <WorkerTab.Screen
        name="AccountScreen"
        component={SettingsScreen}
        options={{ tabBarLabel: "Account" }}
      />
    </WorkerTab.Navigator>
  );
};

// const AllWorkerJobs = ()=>

const MyBidsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>MyBidsScreen Screen</Text>
    </View>
  );
};

const BuySellScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>BuySellScreen Screen</Text>
    </View>
  );
};

const navTabSettings = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    switch (route.name) {
      case "HomeStack":
        iconName = focused ? "home" : "home-outline";
        break;
      case "MyJobsNav":
        iconName = focused ? "mail" : "mail-outline";
        break;
      case "PostAJobScreen":
        iconName = focused ? "add-circle" : "add-circle-outline";
        break;
      case "Settings":
        iconName = focused ? "person" : "person-outline";
        break;
      // WorkerTabs
      case "AllJobs":
        iconName = focused ? "construct" : "construct-outline";
        break;
      case "MyBids":
        iconName = focused ? "briefcase" : "briefcase-outline";
        break;
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "green",
  tabBarInactiveTintColor: "gray",
  headerShown: false,
});

export default App;

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
});
