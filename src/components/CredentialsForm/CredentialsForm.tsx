import React, { useState } from "react";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import {
  closeEyesActionCreator,
  openEyesActionCreator,
} from "../../store/features/uiSlice/uiSlice";
import { lingoDeckDispatch } from "../../store/hooks";
import { type UserCredentials } from "../../types";
import ButtonForm from "../ButtonForm/ButtonForm";
import credentialsFormStyles from "./CredentialsFormStyles";
interface CredentialsFormProps {
  text: string;
  onSubmit: (userCredentials: UserCredentials) => Promise<void>;
}

const CredentialsForm = ({
  text,
  onSubmit,
}: CredentialsFormProps): JSX.Element => {
  const dispatch = lingoDeckDispatch();

  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
  });

  const [areValid, setAreValid] = useState(true);

  const handleOnSubmit = async () => {
    const areValidCredentials = Object.values(userCredentials).every(
      (credential: string) =>
        credential.length >= 8 && /^[a-z0-9]+$/i.test(credential)
    );

    if (areValidCredentials) {
      await onSubmit(userCredentials);
      return;
    }

    setAreValid(false);
  };

  const handleCredentialChange = (inputValue: string, propertyName: string) => {
    if (propertyName === "password") {
      if (inputValue.length > 0) {
        dispatch(closeEyesActionCreator());
      } else {
        dispatch(openEyesActionCreator());
      }
    }

    setAreValid(true);
    setUserCredentials({ ...userCredentials, [propertyName]: inputValue });
  };

  return (
    <SafeAreaView style={credentialsFormStyles.form}>
      <View style={credentialsFormStyles.inputContainer}>
        <Text
          nativeID="username"
          style={{
            ...credentialsFormStyles.label,
          }}
        >
          Username
        </Text>
        <TextInput
          autoComplete="username"
          placeholder="Enter your username"
          maxLength={24}
          accessibilityLabelledBy="username"
          value={userCredentials.username}
          onChangeText={(inputValue) => {
            handleCredentialChange(inputValue, "username");
          }}
          style={[credentialsFormStyles.input, credentialsFormStyles.shadow]}
        />
      </View>
      <View style={credentialsFormStyles.inputContainer}>
        <Text nativeID="password" style={credentialsFormStyles.label}>
          Password
        </Text>
        <TextInput
          autoComplete="password"
          placeholder="Enter your password"
          maxLength={24}
          secureTextEntry={true}
          accessibilityLabelledBy="password"
          value={userCredentials.password}
          onChangeText={(inputValue) => {
            handleCredentialChange(inputValue, "password");
          }}
          style={[credentialsFormStyles.input, credentialsFormStyles.shadow]}
        />
      </View>
      {!areValid && (
        <Text style={credentialsFormStyles.alert} accessibilityRole="alert">
          username or password should be at least 8 characters long and only
          contain alphanumeric
        </Text>
      )}
      <ButtonForm text={text} action={handleOnSubmit} />
    </SafeAreaView>
  );
};

export default CredentialsForm;
