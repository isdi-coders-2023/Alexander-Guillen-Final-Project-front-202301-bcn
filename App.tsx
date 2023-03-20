import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import useFonts from "./src/styles/useFonts";
import * as SplashScreen from "expo-splash-screen";
import Navigator from "./src/navigation/Navigator";

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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
        onLayout={showLayoutRootView}
      >
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: { ...DefaultTheme.colors, background: "white" },
          }}
        >
          <Navigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}
