import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LoginForm = () => {
  return (
    <View>
      <Text>LoginForm</Text>
      {/* <Formik
        initialValues={{
          email: "",
          title: "",
          phone: "555-867-5512",
          content: "",
          featured_media: "",
          "job-categories": "",
        }}
      ></Formik> */}
    </View>
  );
};

const LoginFormikWrapper = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "sdsdf",
        name: "james",
        title: "",
        phone: "555-867-5512",
        content: "",
        featured_media: "",
        "job-categories": "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (values.password.length < 5) {
          errors.password = "Password length too short";
        }

        return errors;
      }}
      onSubmit={async (values) => {
        setIsPostSubmitting(true);
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          console.log(JSON.stringify(values, null, 2));
          setIsPostSubmitting(false);
        }, 400);
        // handleCreateJobPost();
      }}
    >
        <LoginForm props={...props}/>
    </Formik>
  );
};

export default LoginFormikWrapper;

const styles = StyleSheet.create({});
