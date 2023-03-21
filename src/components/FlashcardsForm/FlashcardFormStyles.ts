import { StyleSheet } from "react-native";
import buttonFormStyles from "../ButtonForm/ButtonFormStyles";
import CredentialsFormStyles from "../CredentialsForm/CredentialsFormStyles";
import formStyles from "../CredentialsForm/CredentialsFormStyles";

const FlashcardFormStyles = StyleSheet.create({
  form: {
    ...formStyles.form,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 27,
    elevation: 2,
  },
  label: {
    ...formStyles.label,
    textAlign: "left",
    paddingLeft: 20,
  },
  pickerContainer: {
    justifyContent: "center",
    ...CredentialsFormStyles.input,
    paddingLeft: 0,
    maxHeight: 60,
    width: 239,
  },
  cancel: {
    ...buttonFormStyles.button,
    backgroundColor: "#E01C58",
    textAlign: "center",
  },
  options: {
    marginTop: 20,
    width: 239,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FlashcardFormStyles;
