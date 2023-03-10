import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import CredentialsForm from "./src/components/CredentialsForm/CredentialsForm";
import useFonts from "./src/styles/useFonts";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [isAppReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await useFonts();
      } finally {
        setAppIsReady(true);
      }
    })();
  }, [isAppReady, useFonts]);

  const showLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={showLayoutRootView}>
        <CredentialsForm />
      </View>
    </Provider>
  );
}
