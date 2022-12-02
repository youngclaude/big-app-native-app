import React, { useMemo } from "react";

// 3rd party utils
import * as yup from "yup";
import _ from "lodash";

// 3rd party react component
import { View } from "react-native";
import {
  // components
  Input,
  Button,
  useTheme,
  makeStyles,
  Divider,
  // hooks
  // makeStyles,
  // useTheme,
  // withTheme,
} from "react-native-elements";
import {
  Formik,
  FormikHelpers,
  // FormikHelpers,
  FormikProps,
  // Form,
  // Field,
  // FieldProps,
  // FormikErrors,
  // withFormik,
} from "formik";

const DEBOUNCE = 2500;

const formValidationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string(),
  // password: "sdsdf",
  title: yup.string(),
  phone: yup.string(),
  content: yup.string(),
  // featured_media: "",
  // "job-categories": "",
});

const PostAJobForm = (props) => {
  const {
    handleSubmit,
    values,
    errors,
    touched,
    validateField,
    setFieldValue,
    setFieldTouched,
    isValid,
    dirty,
    isSubmitting,
    onCloseModal,
  } = props;

  const validateFieldDebounced = useMemo(() => {
    return _.debounce(validateField, DEBOUNCE);
  }, [validateField]);

  const setFieldTouchedDebounced = useMemo(() => {
    return _.debounce(setFieldTouched, DEBOUNCE);
  }, [setFieldTouched]);

  const handleBlur = useMemo(() => {
    return (field) => {
      return () => {
        setFieldTouched(field, true);
        validateField(field);
        setFieldTouchedDebounced.cancel();
        validateFieldDebounced.cancel();
      };
    };
  }, [
    setFieldTouched,
    validateField,
    setFieldTouchedDebounced,
    validateFieldDebounced,
  ]);

  const handleChange = useMemo(() => {
    return (field) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (value) => {
        const isFieldTouched = touched[field];
        const isFieldError = !!errors[field];
        const isFieldValid = yup
          .reach(formValidationSchema, field)
          .isValidSync(value);

        if (isFieldTouched || isFieldValid) {
          setFieldTouched(field, true, false);
          setFieldValue(field, value, true);
          setFieldTouchedDebounced.cancel();
          validateFieldDebounced.cancel();
        } else {
          setFieldTouchedDebounced(field, true, !!errors[field]);
          setFieldValue(field, value, !!errors[field]);
          if (!isFieldError) {
            validateFieldDebounced(field);
          }
        }
      };
    };
  }, [
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    setFieldTouchedDebounced,
    validateFieldDebounced,
  ]);

  return (
    <View style={styles.formContainer}>
      <View>
        <Input
          testID="VehicleNameForDeviceInput"
          label="Vehicle Name"
          returnKeyType="done"
          value={values.name}
          onChangeText={handleChange("name")}
          onBlur={() => handleBlur("name")}
          autoCapitalize="words"
          placeholder="Vehicle Name"
          keyboardType="default"
          errorMessage={
            touched.name && errors.name
              ? errors.name
              : "e.g. “John’s Truck” or “White Sprinter Van”"
          }
          errorStyle={{
            ...styles.inputMessage,
            ...(touched.name && errors.name
              ? styles.errorMessage
              : styles.helperMessage),
          }}
          rightIcon={
            // eslint-disable-next-line no-nested-ternary
            !!touched.name && !errors.name
              ? { name: "check", color: theme?.colors?.success }
              : !!touched.name && errors.name
              ? { name: "close", color: theme?.colors?.error }
              : undefined
          }
          inputContainerStyle={{
            // eslint-disable-next-line no-nested-ternary
            ...(!!touched.name && !errors.name
              ? { borderBottomColor: theme?.colors?.success }
              : !!touched.name && errors.name
              ? { borderBottomColor: theme?.colors?.error }
              : {}),
          }}
        />
      </View>
      <Divider
        orientation="horizontal"
        width={theme?.spacing?.(3)}
        color="transparent"
      />
      <Button
        testID="VehicleNameVehicleInfoDoneButton"
        title="Save"
        disabled={!dirty || !isValid || isSubmitting}
        onPress={handleSubmit}
        loading={isSubmitting}
      />
      <Divider
        orientation="horizontal"
        width={theme?.spacing?.(1)}
        color="transparent"
      />
      <Button
        testID="VehicleNameVehicleInfoDoneButton"
        title="Back to Scan"
        onPress={onCloseModal}
        type="clear"
        titleStyle={styles.buttonTitleStyle}
      />
    </View>
  );
};

const PostAJobFormWrapper = ({ onSubmit, onCloseModal }) => {
  return (
    <Formik
      validationSchema={formValidationSchema}
      initialValues={{
        name: "james",
        email: "",
        password: "sdsdf",
        title: "",
        phone: "555-867-5512",
        content: "",
        featured_media: "",
        "job-categories": "",
      }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values, resetForm);
      }}
    >
      {(props) => (
        <PostAJobForm
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          onCloseModal={onCloseModal}
        />
      )}
    </Formik>
  );
};

export default PostAJobFormWrapper;
