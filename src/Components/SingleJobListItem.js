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
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleJobListItem = ({
  jobTitle,
  jobDescription,
  jobImageUri,
  handlePress,
  isAdminView = false,
}) => (
  <TouchableOpacity onPress={handlePress}>
    <Card style={styles.jobCardStyles}>
      <Card.Content style={{ padding: 0 }}>
        <View style={styles.jobBodyContent}>
          <View style={styles.jobBodySectionOne}>
            <Image
              // size={24}
              source={{ uri: jobImageUri }}
              style={styles.avatarImage}
            />
            <View style={{ marginLeft: 15, flexWrap: "wrap", width: 200 }}>
              <Text>{jobTitle}</Text>
              {/* <Text>{jobDescription}</Text> */}
            </View>
          </View>
          {isAdminView && (
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
          )}
        </View>
      </Card.Content>

      {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
      {isAdminView && (
        <Card.Actions>
          <Button>View Bids</Button>
          <Button>Edit Job</Button>
        </Card.Actions>
      )}
    </Card>
  </TouchableOpacity>
);

export default SingleJobListItem;

const styles = StyleSheet.create({
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
    paddingVertical: 10,
    paddingLeft: 10,
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
    alignItems: "center",
  },
  jobBodyStatsView: {
    alignItems: "center",
    marginHorizontal: 5,
  },
});
