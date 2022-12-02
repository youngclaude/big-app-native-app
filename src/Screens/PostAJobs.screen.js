import Config from "react-native-config";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Date,
  TouchableOpacity,
  ScrollView,
  Image,
  Load,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, Divider, Avatar, TextInputIcon } from "react-native-paper";

import axios from "axios";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import Ionicon
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import JobPaymentTypes from "../../assets/mock-data/job-payment-types";
import ServiceCategories from "../../assets/mock-data/service-categories";
// const MyImage = "../../assets/pngs/earthtone-construction-site.png";

// import MyImage from "../../assets/pngs/pngegg.png";
// \

const items = [
  // this is the parent or 'item'
  {
    name: "Fruits",
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: "Apple",
        id: 10,
      },
      {
        name: "Strawberry",
        id: 17,
      },
      {
        name: "Pineapple",
        id: 13,
      },
      {
        name: "Banana",
        id: 14,
      },
      {
        name: "Watermelon",
        id: 15,
      },
      {
        name: "Kiwi fruit",
        id: 16,
      },
    ],
  },
];

const PostAJobScreen = () => {
  const [text, onChangeText] = useState("Test Text");
  const [number, onChangeNumber] = useState(null);
  const [isPostSubmitting, setIsPostSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState([]);

  onSelectedCategoriesChange = (givenSelectedItems) => {
    setSelectedCategories(givenSelectedItems);
  };

  onPaymentTypeChange = (givenPaymentTypes) => {
    setSelectedPaymentTypes(givenPaymentTypes);
  };

  const handleOnFirePress = () => {};

  const handleChange = (field) => {
    setFieldValue(field, value, true);
  };

  const handleCreateJobPost = async (values) => {
    try {
      await dispatch.authModel.postAJob(values);
    } catch (error) {
      console.log({ error });
    }
  };
  const { userData } = useSelector((state) => state.authModel);

  useEffect(() => {
    console.log({ selectedCategories });
    console.log("Config", Config);
    // console.log("Config", Config.GPC_API_KEY);

    return () => {};
  });

  return (
    <>
      <View
        style={{
          flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          paddingHorizontal: 15,
          // backgroundColor: "lightgreen",
          backgroundColor: "white",
        }}
      >
        {/* <GooglePlacesAutocomplete
        requestUrl={{ useOnPlatform: "all" }}
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log("Google Data:", data, details);
        }}
        query={{
          key: "",
          language: "en",
        }}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: "row",
              marginRight: 8,
              backgroundColor: "white",
              borderRadius: 30,
              padding: 9,
            }}
          >
            <AntDesign name="clockcircle" size={11} />
            <Text>Search</Text>
          </View>
        )}
        renderLeftButton={() => {}}
      /> */}

        <Text
          style={{
            padding: 10,
            color: "green",
            fontSize: 50,
            fontWeight: "bold",
          }}
        >
          Post your job
        </Text>
        {/* <Divider bold /> */}
        <ScrollView
          style={{
            // backgroundColor: "white",
            padding: 10,
            height: 500,
          }}
        >
          <Formik
            initialValues={{
              email: "",
              name: "james",
              title: "",
              phone: "",
              content: "",
              featured_media: "",
              address: "",
              "job-categories": [],
              "job-types": [], // payment types
            }}
            validate={(values) => {
              const errors = {};
              // if (!values.email) {
              //   errors.email = "Required";
              // } else if (
              //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              // ) {
              //   errors.email = "Invalid email address";
              // }
              if (values.title.length < 3) {
                errors.title = "Title length too short";
              }
              if (values.content.length < 5) {
                errors.content = "Description length too short";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              const finalValues = {
                ...values,
                "job-types": selectedPaymentTypes,
                "job-categories": selectedCategories,
                name: userData?.user_display_name,
                meta: {
                  _job_location: values.address,
                  _application: userData?.user_email,
                },
              };
              delete finalValues.address;
              delete finalValues.featured_media;

              // simulates awaiting a response from the server..
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                setIsPostSubmitting(false);
                handleCreateJobPost(finalValues);
                console.log("onSubmit: ", JSON.stringify(finalValues, null, 2));
              }, 3000);
              // actually send request to the server
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
              isValid,
              isValidating,
              dirty,
            }) => (
              <View>
                <View style={styles.fieldSection}>
                  <TextInput
                    mode="outlined"
                    name="title"
                    onChange={handleChange("title")}
                    onBlur={handleBlur}
                    value={values.title}
                    label="Job Summary"
                    tou
                  />
                  <Text>{errors.title && errors.title}</Text>
                  <TextInput
                    mode="outlined"
                    label="Job Details"
                    name="content"
                    onChange={handleChange("content")}
                    onBlur={handleBlur}
                    value={values.content}
                    multiline
                    numberOfLines={5}
                  />
                  <Text>{errors.content && errors.content}</Text>
                </View>

                <View style={styles.fieldSection}>
                  <Text>Work Categories</Text>
                  <SectionedMultiSelect
                    // style={{}}
                    items={ServiceCategories}
                    IconRenderer={Icon}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Choose catagories..."
                    readOnlyHeadings={false}
                    onSelectedItemsChange={onSelectedCategoriesChange}
                    selectedItems={selectedCategories}
                    showCancelButton
                    showDropDowns={false}
                    cancelIconComponent={() => (
                      <View
                        style={{
                          height: "100%",
                          width: "100%",
                          // backgroundColor: "red",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginRight: 10,
                            fontSize: 20,
                          }}
                        >
                          X
                        </Text>
                      </View>
                    )}
                    // confirmText={}
                    confirmText={"DONE"}
                    // renderSelectText={({ name, id, slug }) => {
                    //   return <Text>{name}</Text>;
                    // }}

                    // customChipsRenderer={(props) => {
                    //   // console.log("selectedItems2", selectedCategories);
                    //   // console.log("props", props);
                    //   const result = items
                    //     .filter((filterItems) => selectedCategories.includes(filterItems.id))
                    //     .map((mapItems) => <Text>{mapItems.name}</Text>);
                    //   return result;
                    // }}
                  />

                  <Text>Payment Type</Text>
                  <SectionedMultiSelect
                    items={JobPaymentTypes}
                    IconRenderer={Icon}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Choose payment type..."
                    // readOnlyHeadings={true}
                    onSelectedItemsChange={onPaymentTypeChange}
                    selectedItems={selectedPaymentTypes}
                    showCancelButton
                    showDropDowns={false}
                    cancelIconComponent={() => (
                      <View
                        style={{
                          height: "100%",
                          width: "100%",
                          // backgroundColor: "red",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginRight: 10,
                            fontSize: 20,
                          }}
                        >
                          X
                        </Text>
                      </View>
                    )}
                    // confirmText={}
                    confirmText={"DONE"}

                    // customChipsRenderer={(props) => {
                    //   // console.log("selectedItems2", selectedItems);
                    //   // console.log("props", props);
                    //   const result = items
                    //     .filter((filterItems) => selectedItems.includes(filterItems.id))
                    //     .map((mapItems) => <Text>{mapItems.name}</Text>);
                    //   return result;
                    // }}
                  />
                </View>

                <View style={styles.fieldSection}>
                  <TextInput
                    mode="outlined"
                    label="Job Address"
                    name="address"
                    onChange={handleChange("address")}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                  <Text>{errors.address && errors.address}</Text>
                </View>
                <View style={styles.fieldSection}>
                  <TouchableOpacity
                    // disabled={!isValid}
                    disabled={!dirty || !isValid || isSubmitting}
                    onPress={() => {
                      setIsPostSubmitting(true);
                      handleSubmit();
                    }}
                    style={{
                      backgroundColor: !isValid ? "grey" : "green",
                      alignItems: "center",
                      padding: 20,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "white" }}>Submit Job</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>

          {/* <TextInput
        mode="outlined"
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
        label="Job Description & Notes"
        multiline
        numberOfLines={4}
      />
      <TextInput
        mode="flat"
        style={styles.input}
        // onChangeText={onChangeText}
        // value={text}
        label="Estimated Completion Date"
      />
      <Text>Optional</Text>
      <TextInput
        mode="flat"
        style={styles.input}
        // onChangeText={onChangeText}
        // value={text}
        label="
Client Name
"
      />
      <TextInput
        mode="flat"
        style={styles.input}
        // onChangeText={onChangeText}
        // value={text}
        label="
Phone
"
      />
      <TextInput
        mode="flat"
        style={styles.input}
        // onChangeText={onChangeText}
        // value={text}
        label="
        Job Category (select all that apply)
"
      />
      <TextInput
        mode="flat"
        style={styles.input}
        // onChangeText={onChangeText}
        // value={text}
        label="
        Payment and Job Type (select all that apply)
"
      /> */}
          {/* <Text>Add pictures of the job. </Text> */}
          {/* <Text>Other Files </Text> */}

          {/* <Button title="Fire!" onPress={handleOnFirePress} /> */}
        </ScrollView>
        {/* <Text>.</Text> */}
      </View>
      {isPostSubmitting ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Image
            source={require("../../assets/pngs/earthtone-construction-site.png")}
            style={{ height: 200, width: 200 }}
          />
          <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  fieldSection: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    // shadowColor: "black",
  },
});

export default PostAJobScreen;
