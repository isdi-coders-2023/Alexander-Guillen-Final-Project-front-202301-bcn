import React, { useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Link } from "@react-navigation/native";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import { type Flashcard } from "../../types";
import ButtonForm from "../ButtonForm/ButtonForm";
import formStyles from "../CredentialsForm/CredentialsFormStyles";
import FlashcardFormStyles from "./FlashcardFormStyles";
import languages from "../../../assets/languages.json";
import buttonFormStyles from "../ButtonForm/ButtonFormStyles";

interface FlashcardsFormProps {
  onSubmit: (flashcard: Flashcard) => Promise<void>;
  onSubmitText: string;
}

const FlashcardsForm = ({ onSubmit, onSubmitText }: FlashcardsFormProps) => {
  const [flashcard, setFlashcard] = useState<Flashcard>({
    front: "",
    back: "",
    image: "",
    language: "",
  });
  const pickerRef = useRef<Picker<string>>(null);

  const handleFlashcardChange = (inputValue: string, propertyName: string) => {
    setFlashcard({
      ...flashcard,
      [propertyName]: inputValue,
    });
  };

  const handleOnSubmit = async () => {
    await onSubmit(flashcard);
  };

  return (
    <SafeAreaView style={FlashcardFormStyles.form}>
      <View style={formStyles.inputContainer}>
        <Text nativeID="front" style={FlashcardFormStyles.label}>
          Front
        </Text>
        <TextInput
          placeholder="Add a word"
          maxLength={24}
          value={flashcard.front}
          accessibilityLabelledBy="front"
          style={[formStyles.input, formStyles.shadow]}
          onChangeText={(value) => {
            handleFlashcardChange(value, "front");
          }}
        />
      </View>

      <View style={formStyles.inputContainer}>
        <Text nativeID="back" style={FlashcardFormStyles.label}>
          Back
        </Text>
        <TextInput
          placeholder="Add a translation"
          maxLength={24}
          value={flashcard.back}
          accessibilityLabelledBy="back"
          style={[formStyles.input, formStyles.shadow]}
          onChangeText={(value) => {
            handleFlashcardChange(value, "back");
          }}
        />
      </View>

      <View style={formStyles.inputContainer}>
        <Text nativeID="language" style={FlashcardFormStyles.label}>
          Language
        </Text>
        <View
          style={FlashcardFormStyles.pickerContainer}
          accessibilityLabelledBy="language"
        >
          <Picker
            ref={pickerRef}
            selectedValue={flashcard.language}
            onValueChange={(value) => {
              handleFlashcardChange(value, "language");
            }}
            testID="languages"
          >
            {languages.slice(1).map(({ name, id }) => (
              <Picker.Item
                label={name}
                value={name}
                key={id}
                style={{ fontSize: 20 }}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={formStyles.inputContainer}>
        <Text nativeID="image" style={FlashcardFormStyles.label}>
          Image
        </Text>
        <TextInput
          placeholder="Enter an image link"
          maxLength={24}
          value={flashcard.image}
          accessibilityLabelledBy="image"
          style={[formStyles.input, formStyles.shadow]}
          onChangeText={(value) => {
            handleFlashcardChange(value, "image");
          }}
        />
      </View>

      <View style={FlashcardFormStyles.options}>
        <ButtonForm text={onSubmitText} action={handleOnSubmit} />
        <Link
          to={{ screen: "Home" }}
          style={FlashcardFormStyles.cancel}
          accessibilityRole="link"
        >
          <Text style={buttonFormStyles.text}>Cancel</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default FlashcardsForm;
