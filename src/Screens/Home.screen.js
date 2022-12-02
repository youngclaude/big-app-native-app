// import { useEffect } from "react";
import React, { useState, useEffect, useRef } from "react";

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
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import Carousel from "react-native-snap-carousel";
import { CarouselData1 } from "../../assets/mock-data/slideshow-data";
import MainBlogCarousel from "../Components/MainBlogCarousel";
import { Avatar } from "react-native-paper";
// import { myImage } from "@assets/pngs/pngegg.png";
import { myImage } from "./../../assets/pngs/earthtone-construction-site.png";
import STYLE_CONSTANTS from "../utils/style-constants";
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return month + "-" + date + "-" + year; //format: d-m-y;
};

const HomeScreen = ({ navigation }) => {
  const newCount = useSelector((state) => state.countModel);
  // const { authToken } = useSelector((state) => state.authModel);
  const { userData } = useSelector((state) => state.authModel);
  const bgImageRef = useRef(null);
  const bgImageGradientRef = useRef(null);

  const navHook = useNavigation();

  const dispatch = useDispatch();

  const tempImageUri = CarouselData1[0].illustration;
  // console.log("CarouselData1[0].illustration", CarouselData1[0].illustration);

  console.log({ newCount });

  useEffect(() => {
    return () => {};
  }, [useSelector, useDispatch]);

  const featuredServiceList = [
    {
      id: 458,
      serviceName: "Permits",
      imagePath: require("../../assets/pngs/people/general-image-1.png"),
    },
    {
      id: 644,
      serviceName: "Painting",
      imagePath: require("../../assets/pngs/people/general-image-2.png"),
    },
    {
      id: 146,
      serviceName: "Construction",
      imagePath: require("../../assets/pngs/people/general-image-3.png"),
    },
    {
      id: 260,
      serviceName: "Electrical",
      imagePath: require("../../assets/pngs/people/general-image-4.png"),
    },
    // {
    //   id: 4,

    //   serviceName: "Drywall",
    // },
    // {
    //   id: 5,

    //   serviceName: "Manual Labor",
    // },
    // {
    //   id: 6,

    //   serviceName: "Demolition",
    // },
    // {
    //   id: 7,

    //   serviceName: "Siding",
    // },
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* Image with Gradient + Test Overlay  */}
      {/* <View>
        <Image
          ref={(r) => (bgImageRef.current = r)}
          style={{ width: "100%", height: 200 }}
          // source={require("@assets/pngs/pngegg.png")}
          // source={myImage}
          source={require("./../../assets/pngs/pngegg.png")}
        />
        <LinearGradient
          ref={(r) => (bgImageGradientRef.current = r)}
          locations={[0, 1.0]}
          colors={["rgba(0,0,0,0.00)", "rgba(0,0,0,0.80)"]}
          style={styles.linearGradient}
        >
          <Text>FindBigWOrk</Text>
        </LinearGradient>
      </View> */}
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
            FindBigWork
            {/* Hi, {userData.user_display_name} */}
          </Text>
          {/* <Text>{getCurrentDate()}</Text> */}
        </View>
        <TouchableOpacity onPress={() => navHook.navigate("Notifications")}>
          <Icon name="bell" size={30} color="white" />
          {/* <Icon name="bell-cancel-outline" size={30} /> */}
          {/* <Icon name="bell-badge-outline" size={30} /> */}
          {/* <Icon name="bell-badge" size={30} color="white" /> */}
        </TouchableOpacity>
      </LinearGradient>
      {/* UIImage(named:"")? */}
      {/* Carousel Section  */}
      <View style={{ marginTop: -10 }}>{/* <MainBlogCarousel /> */}</View>

      {/* Service Catagories List  */}
      <Text
        style={{
          marginLeft: 10,
          fontSize: 20,
          color: "black",
          marginVertical: 20,
        }}
      >
        Featured Services
      </Text>
      <View
        style={{
          flexDirection: "row",
          // flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 100,
        }}
      >
        <FlatList
          data={featuredServiceList}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderColor: "lightgrey",
                  borderRadius: 20,
                  margin: 5,
                  width: STYLE_CONSTANTS.windowWidth / 2.3,
                  height: 200,
                  borderWidth: 2,
                }}
                onPress={() => {
                  navHook.navigate("PostAJobScreen", {
                    givenCategory: item.id,
                  });
                }}
              >
                <View>
                  <Image
                    source={item.imagePath}
                    style={{ width: 100, height: 200 }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    paddingLeft: 10,
                    // width: "80%",
                    // flexDirection: "row",
                    // flex: 1,
                  }}
                >
                  <Text style={{ color: "black", fontSize: 15 }}>
                    {item.serviceName ?? "Service"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{ height: 250, backgroundColor: "black", padding: 10 }}>
        <Text style={{ color: "white", fontSize: 20, paddingVertical: 10 }}>
          Next Steps
        </Text>
        <ScrollView horizontal centerContent scollm>
          {[
            {
              title: "Post Your First Job",
              icon: "account",
              details:
                "Notice any aresas on your property that need work? Post you first job with Big!",
              // btnLink: () => {}
              btnLink: () => {
                navHook.navigate("PostAJobScreen");
                console.log("billing press");
              },
            },
            {
              title: "Review your postings",
              icon: "account",
              details:
                "Visit the 'My Jobs' screen to view the progress on the jobs you've posted contact any applicants of interest",

              btnLink: () => {
                navHook.navigate("MyJobsNav");
                console.log("billing press");
              },
              // btnLink: () => {}
            },
            {
              title: "Add Billing",
              icon: "account",
              details: "Add you billing data to the app for easy billing",
              // btnLink: () => {navHook.navigate("Settings")}
              btnLink: () => {
                navHook.navigate("Settings");
                console.log("billing press");
              },
            },
          ].map((item, index) => (
            <View style={styles.nextStepsCard} key={index}>
              <Text style={styles.nextStepsCardTitle}>{item.title}</Text>
              <Text style={styles.nextStepsCardDesc}>{item.details}</Text>
              <TouchableOpacity
                onPress={item.btnLink}
                style={styles.nextStepsCardBtnWrapper}
              >
                <Text style={styles.nextStepsCardBtnText}>Go</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/*

      <Button
        title="Go to 'MyAccount'?"
        onPress={() => {
          console.log("btn pressed");
          navigation.navigate("AccountScreen");
        }}
      ></Button>
      <Text>{newCount}</Text>
      <Button
        testID="FaceIdSkipButton"
        title="Increment"
        // type="clear"
        onPress={() => {
          dispatch.countModel.increment(2);
        }}
      />
      <Button
        // testID="FaceIdSkipButton"
        title="Decrement"
        // type="clear"
        onPress={() => {
          dispatch.countModel.decrement(1);
        }}
      />
      <Button
        // testID="FaceIdSkipButton"
        title="Slow-Mo Increment"
        // type="clear"
        onPress={() => {
          dispatch.countModel.incrementAsync(5);
        }}
      />
    */}
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
    color: "#fff",
  },
  screenTitleView: {
    paddingVertical: 30,
    backgroundColor: "lightgreen",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  nextStepsCard: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    width: STYLE_CONSTANTS.windowWidth * 0.5,
    padding: 10,
    marginRight: 15,
  },
  nextStepsCardTitle: {
    color: "#fff",
    marginBottom: 10,
  },
  nextStepsCardDesc: {
    color: "grey",
  },
  nextStepsCardBtnWrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    width: 75,
    marginVertical: 10,
  },
  nextStepsCardBtnText: {},
});
export default HomeScreen;
