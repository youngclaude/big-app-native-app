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
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TitleProps,
  ToggleButtonGroupProps,
  ToggleButtonRowProps,
} from "react-native-paper";
// import {  } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import RenderHtml from "react-native-render-html";
import { LinearGradient } from "expo-linear-gradient";
// import jobData
import { useNavigation } from "@react-navigation/core";
import myJobDataArray from "../../../assets/mock-data/my-jobs-data";
import SingleJobListItem from "../../Components/SingleJobListItem";
import JobManagerScreen from "../Clients/JobManager.screen";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MyJobsScreen = () => {
  const [myJobData, setMyJobData] = useState(myJobDataArray);

  const { userInfo, userData } = useSelector((state) => state.authModel);
  const { width: deviceWidth } = useWindowDimensions();

  const navigation = useNavigation();

  const handleGetSelfPostedJobs = async () => {
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${userData.authToken}`,
      },
    };

    axios
      .get(
        `https://www.bigapp.work/wp-json/wp/v2/job-listings?author=${userInfo.id}`,
        axiosConfig
      )
      .then(function (response) {
        console.log({ response });
        console.log("user JobsData retrieved successfully");
        setMyJobData(response.data);
        // storeInfo(response.data);
      })
      .catch(function (error) {
        console.log({ error });
      });
  };

  useEffect(() => {
    // first
    console.log("test text");
    handleGetSelfPostedJobs();
    console.log({ htmlString });

    const regex = /(<([^>]+)>)/gi;
    const result1 = htmlString.replace(regex, "");

    const result2 = htmlString.replace(/<\/?[^>]+(>|$)/g, "");
    console.log({ result1 });
    console.log({ result2 });

    return () => {
      // second
    };
  }, []);

  const handleSingleJobPress = (givenIndex) => {
    console.log({ givenIndex });
    navigation.navigate("SingleJobScreen", { jobData: myJobData[givenIndex] });
    // navigation.navigate("JobManagerScreen", { jobData: myJobData[givenIndex] });
  };

  const htmlString =
    "<ul>\n<li>\n<h2><strong>Need Estimates.</strong></h2>\n</li>\n<li>\n<h2><strong> Looking To Tear Down Retaining Wall, Redo The Countertops, Create An Island In The Kitchen, Etc&#8230;</strong></h2>\n</li>\n<li>\n<h2><strong>Call To Schedule Appointment</strong></h2>\n</li>\n</ul>\n";
  const source = {
    html: `
      <p style='text-align:center;'>
        Hello World!
      </p>`,
  };

  return (
    <ScrollView>
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
            My Jobs
            {/* Hi, {userData.user_display_name} */}
          </Text>
          <Text style={styles.screenTitleDescription}>
            View all jobs that you posted
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

      {/* <View style={{ alignItems: "center", padding: 20 }}></View> */}
      {/* 
      <RenderHtml
        contentWidth={width}
        source={{ html: htmlString }}
        defaultTextProps
      />
      <RenderHtml contentWidth={width} source={source} /> */}

      <View style={{ alignItems: "center" }}>
        {/* <SingleJobCard /> */}
        <FlatList
          data={myJobData}
          // refreshings
          // onRefresh
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
                isAdminView={true}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

const LeftContent = (props) => (
  <Avatar.Image
    size={24}
    source={{ uri: "https://picsum.photos/100" }}
    style={styles.avatarImage}
  />
);
// {   <Avatar.Icon {...props} icon="folder" /> }

export default MyJobsScreen;

const styles = StyleSheet.create({
  screenTitleView: {
    paddingVertical: 30,
    // backgroundColor: "lightgreen",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  screenTitleDescription: {
    fontSize: 15,
    color: "white",
  },
  avatarImage: {
    width: 66,
    height: 58,
    borderRadius: 0,
    backgroundColor: "#fff",
  },
  jobCardStyles: {
    width: windowWidth - 20,
    marginBottom: 20,
  },
  jobBodyContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jobBodyTextContainer: {
    marginLeft: 10,
    flexDirection: "row",
  },
  jobBodyStatsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  jobBodySectionOne: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  jobBodyStatsView: {
    alignItems: "center",
    marginHorizontal: 5,
  },
});
