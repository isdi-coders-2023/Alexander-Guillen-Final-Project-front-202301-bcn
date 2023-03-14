import React from "react";
import { Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";
import { closeModalActionCreator } from "../../store/features/uiSlice/uiSlice";
import { lingoDeckDispatch, lingoDeckSelector } from "../../store/hooks";
import FeedbackModalStyles from "./FeedbackModalStyles";
import ModalDelete from "../../../assets/modal-delete.svg";

const FeedbackModal = (): JSX.Element => {
  const dispatch = lingoDeckDispatch();
  const { isError, isOpened, message, title } = lingoDeckSelector(
    ({ ui: { modal } }) => modal
  );

  const handleOnClick = () => {
    dispatch(closeModalActionCreator());
  };

  return (
    <Modal
      isVisible={isOpened}
      swipeDirection={["left", "right"]}
      onSwipeComplete={handleOnClick}
    >
      <View style={FeedbackModalStyles.opacityView}>
        <View
          style={
            isError
              ? FeedbackModalStyles.onError
              : FeedbackModalStyles.onSuccess
          }
          accessibilityRole="alert"
        >
          <Pressable
            onPress={handleOnClick}
            style={FeedbackModalStyles.close}
            accessibilityLabel="delete"
          >
            <ModalDelete />
          </Pressable>
          <Text style={FeedbackModalStyles.title}>{title}</Text>
          <Text style={FeedbackModalStyles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackModal;
