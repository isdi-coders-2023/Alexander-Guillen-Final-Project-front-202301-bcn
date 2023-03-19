import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import Loader from "../components/Loader/Loader";
import { lingoDeckSelector } from "../store/hooks";
import FeedbackModal from "../components/FeedbackModal/FeedbackModal";

const Navigator = (): JSX.Element => {
  const Stack = createNativeStackNavigator();
  const isLoading = lingoDeckSelector(({ ui: { isLoading } }) => isLoading);

  return (
    <>
      {isLoading && <Loader />}
      <FeedbackModal />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { alignItems: "center" },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </>
  );
};

export default Navigator;
