import React from "react";
import Modal from "../components/Common/Modal.jsx";
import EditTag from "./EditTag.jsx";

export default function TagEditModal(props) {
  const { colorPallet, isOpen, onClose, saveButton, deleteButton } = props;
  //edit color of the tag
  //edit the content of the tag
  //save the changes
  //delete tag

  return (
    <Modal isOpen={isOpen} onClose={onClose} headerCaption="Edit Tags">
      {/* <Stack> */}
      <EditTag />
      {/* </Stack> */}
    </Modal>
  );
}
