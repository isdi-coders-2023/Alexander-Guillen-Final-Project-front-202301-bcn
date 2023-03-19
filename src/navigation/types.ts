import { type NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamsList = {
  Home: undefined;
  Login: undefined;
};

export type HomeScreenNavigation = NativeStackNavigationProp<
  RootStackParamsList,
  "Home"
>;
