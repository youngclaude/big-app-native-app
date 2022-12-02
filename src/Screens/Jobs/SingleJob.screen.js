import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import RenderHtml from "react-native-render-html";
import BackButton from "../../Components/BackButton";
import { BlurView } from "expo-blur";

const SingleJobScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { content, date, featured_image_urls, title, status } =
    route.params.jobData;
  // route.params.jobData["job-categories"]
  const { width: deviceWidth } = useWindowDimensions();

  useEffect(() => {
    //   first
    console.log({ route });
    console.log({ featured_image_urls });

    return () => {
      // second
    };
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <Text>SingleJobScreen</Text> */}
      <Image
        //   source={require("../../assets/jpegs/restaurant-tables.jpg")}
        source={{ uri: featured_image_urls.medium_large }}
        style={styles.rImage}
      />
      <BlurView style={{}}>
        <Text>{title.rendered}</Text>
        <Text>Date: {date}</Text>
        <Text>Status: {status}</Text>
        {/* <Text>Job Catagory:</Text> */}
      </BlurView>
      {route.params.jobData["job-categories"].map((item, index) => (
        <Text> {item}</Text>
      ))}
      <Text>Description: </Text>

      <RenderHtml
        // styl
        contentWidth={deviceWidth}
        source={{ html: content.rendered }}
        defaultTextProps
      />

      <TouchableOpacity style={styles.ApplyBtn}>
        <Text style={styles.ApplyBtnText}>Submit My Bid</Text>
      </TouchableOpacity>

      <BackButton />
    </ScrollView>
  );
};

export default SingleJobScreen;

const styles = StyleSheet.create({
  rImage: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
  ApplyBtn: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  ApplyBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
