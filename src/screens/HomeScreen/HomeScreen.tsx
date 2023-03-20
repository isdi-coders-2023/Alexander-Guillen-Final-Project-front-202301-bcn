import React, { useRef, useState, useEffect } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FlashcardsList from "../../components/FlashcardsList/FlashcardsList";
import HomeScreenStyles from "./HomeScreenStyles";
import languages from "../../../assets/languages.json";
import { lingoDeckSelector } from "../../store/hooks";
import useFlashcards from "../../hooks/useFlashcards/useFlashcards";

const HomeScreen = (): JSX.Element => {
  const { loadFlashcards } = useFlashcards();

  useEffect(() => {
    (async () => {
      await loadFlashcards();
    })();
  }, [loadFlashcards]);

  const flashcards = lingoDeckSelector(({ flashcards }) => flashcards);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const pickerRef = useRef<Picker<string>>(null);

  const onLanguageChange = (item: string) => {
    setSelectedLanguage(item);
  };

  return (
    <View style={HomeScreenStyles.mainContainer}>
      <View style={HomeScreenStyles.pickerContainer}>
        <Picker
          ref={pickerRef}
          selectedValue={selectedLanguage}
          onValueChange={onLanguageChange}
          testID="languages"
        >
          {languages.map(({ name, id }) => (
            <Picker.Item label={name} value={name} key={id} />
          ))}
        </Picker>
      </View>
      <FlashcardsList flashcards={flashcards} />
    </View>
  );
};

export default HomeScreen;
