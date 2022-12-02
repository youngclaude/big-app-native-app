import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SingleJobListItem from "../../Components/SingleJobListItem";
import { useNavigation } from "@react-navigation/core";
import myJobDataArray from "../../../assets/mock-data/my-jobs-data";

import axios from "axios";

const AllJobsScreen = () => {
  const [jobData, setJobData] = useState([]);
  const navigation = useNavigation();

  const handleSingleJobPress = (givenIndex) => {
    console.log({ givenIndex });
    navigation.navigate("SingleJobScreen", {
      jobData: myJobDataArray[givenIndex],
    });
  };

  useEffect(() => {
    axios
      .get("https://www.bigapp.work/wp-json/wp/v2/job-listings")
      .then((res) => {
        console.log("request results", { res });
        setJobData(res.data);
      })
      .catch((error) => {
        console.warn({ error });
      });

    return () => {};
  }, []);

  //
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>AllJobsScreen</Text>
      {/* {jobData.map((jobObj, index) => {
        return <View>{jobObj.title.rendered}</View>;
      })} */}
      <FlatList
        data={jobData}
        renderItem={({ item, index }) => {
          // console.log("raw item:", item);
          // console.log("raw index:", index);

          // const cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
          // console.log("cleaned content", item.content.rendered);
          return (
            <SingleJobListItem
              jobTitle={item.title.rendered}
              jobDescription={"short description"}
              jobImageUri={item.featured_image_urls.medium}
              handlePress={() => handleSingleJobPress(index)}
            />
          );
        }}
      />
    </View>
  );
};

export default AllJobsScreen;

const styles = StyleSheet.create({});
