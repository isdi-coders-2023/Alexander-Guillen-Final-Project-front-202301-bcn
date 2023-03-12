import React from "react";
import { View, Text } from "react-native";
import CredentialsForm from "../../components/CredentialsForm/CredentialsForm";
import useUser from "../../hooks/useUser/useUser";
import LoginScreenStyles from "./LoginScreenStyles";
import { LinearGradient } from "expo-linear-gradient";
import Eyes from "../../components/Eyes/Eyes";
import Logo from "../../assets/logo.svg";

const LoginScreen = (): JSX.Element => {
  const { loginUser } = useUser();

  return (
    <LinearGradient
      colors={["#0080FF", "#010C806D", "#010C80"]}
      style={LoginScreenStyles.container}
    >
      <Eyes />
      <View style={LoginScreenStyles.formContainer}>
        <Logo style={LoginScreenStyles.logo} accessibilityLabel="Logo" />
        <Text style={LoginScreenStyles.title}>Log in To Continue</Text>
        <CredentialsForm onSubmit={loginUser} text="Log in" />
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
