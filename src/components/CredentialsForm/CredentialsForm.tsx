import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { type UserCredentials } from "../../types";
import credentialsFormStyles from "./CredentialsFormStyles";

const CredentialsForm = (): JSX.Element => {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    username: "",
    password: "",
  });

  const handleCredentialChange = (inputValue: string, propertyName: string) => {
    setUserCredentials({ ...userCredentials, [propertyName]: inputValue });
  };

  return (
    <View style={credentialsFormStyles.form}>
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
    </View>
  );
};

export default CredentialsForm;
