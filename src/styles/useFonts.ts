import * as Font from "expo-font";
import {
  Inter_600SemiBold,
  Inter_800ExtraBold,
  Inter_700Bold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { Jost_400Regular } from "@expo-google-fonts/jost";

const useFonts = async () => {
  await Font.loadAsync({
    Inter_600SemiBold,
    Inter_800ExtraBold,
    Inter_700Bold,
    Inter_400Regular,
    Jost_400Regular,
  });
};

export default useFonts;
