import React from "react";
import Modal from "../components/Common/Modal.jsx";
import EditTag from "./EditTag.jsx";

export default function TagEditModal(props) {
  const {
    colorPallet,
    isOpen,
    onClose,
    saveButton,
    deleteButton,
    onSave,
    current,
  } = props;
  //edit color of the tag
  //edit the content of the tag
  //save the changes
  //delete tag

  return (
    <Modal
      isModalOpen={isOpen}
      onModalClose={onClose}
      headerCaption="Edit Tags"
    >
      {/* <Stack> */}
      {({ onModalClose }) => (
        <EditTag
          onClose={onModalClose}
          curren={current}
          onSave={onSave}
          onCancelEdit={() => {}}
        />
      )}
      {/* </Stack> */}
    </Modal>
  );
}
