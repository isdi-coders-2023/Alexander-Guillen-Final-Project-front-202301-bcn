import React from "react";
import { Pressable } from "react-native";
import FlashcardDelete from "../../../assets/flashcardDelete.svg";
import DeleteOrCreateActionStyles from "./DeleteOrCreateActionStyles";

interface DeleteOrCreateActionProps {
  isDelete: boolean;
  action?: () => Promise<void>;
}

const DeleteOrCreateAction = ({
  isDelete,
  action,
}: DeleteOrCreateActionProps): JSX.Element =>
  isDelete ? (
    <Pressable
      style={DeleteOrCreateActionStyles.delete}
      onPress={action}
      accessibilityLabel="delete"
    >
      <FlashcardDelete />
    </Pressable>
  ) : (
    <></>
  );

export default DeleteOrCreateAction;
