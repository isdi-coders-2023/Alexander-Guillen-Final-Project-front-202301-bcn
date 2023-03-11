import * as Font from "expo-font";
import {
  Inter_600SemiBold,
  Inter_800ExtraBold,
  Inter_700Bold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";

const useFonts = async () => {
  await Font.loadAsync({
    Inter_600SemiBold,
    Inter_800ExtraBold,
    Inter_700Bold,
    Inter_400Regular,
  });
};

export default useFonts;
