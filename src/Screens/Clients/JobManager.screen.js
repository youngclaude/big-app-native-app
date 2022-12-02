import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../../Components/BackButton";

const JobManagerScreen = ({
  jobTitle,
  jobDescription,
  jobImageUri,
  handlePress,
  isAdminView = false,
}) => {
  return (
    <View>
      <Text>JobManagerScreen</Text>
      <Text>JobManagerScreen</Text>

      <View style={styles.jobBodyTextContainer}>
        <View style={styles.jobBodyStatsRow}>
          <View style={styles.jobBodyStatsView}>
            <Text>0</Text>
            <Text>Views</Text>
          </View>
          <View style={styles.jobBodyStatsView}>
            <Text>0</Text>
            <Text>Bids</Text>
          </View>
        </View>
      </View>

      {/* Bid/ Applicants Section  */}
      <View>
        <Text>Bids</Text>
      </View>

      <BackButton />
    </View>
  );
};

export default JobManagerScreen;

const styles = StyleSheet.create({
  jobBodyTextContainer: {
    marginLeft: 10,
    flexDirection: "row",
    width: "100%",
  },
  jobBodyStatsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  jobBodySectionOne: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
