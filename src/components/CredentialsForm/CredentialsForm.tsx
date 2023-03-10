import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { type UserCredentials } from "../../types";
import CredentialsFormStyles from "./CredentialsFormStyles";

const CredentialsForm = (): JSX.Element => {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
  });

  const handleCredentialChange = (inputValue: string, propertyName: string) => {
    setUserCredentials({ ...userCredentials, [propertyName]: inputValue });
  };

  return (
    <View style={CredentialsFormStyles.formContainer}>
      <View style={CredentialsFormStyles.inputContainer}>
        <Text
          nativeID="username"
          style={{
            ...CredentialsFormStyles.inputLabel,
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
          style={[
            CredentialsFormStyles.input,
            CredentialsFormStyles.shadowProps,
          ]}
        />
      </View>
      <View style={CredentialsFormStyles.inputContainer}>
        <Text nativeID="password" style={CredentialsFormStyles.inputLabel}>
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
          style={[
            CredentialsFormStyles.input,
            CredentialsFormStyles.shadowProps,
          ]}
        />
      </View>
    </View>
  );
};

export default CredentialsForm;
