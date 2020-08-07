import React from "react";
import Modal from "../components/Common/Modal.jsx";

export default function TagEditModal(props) {
  const { colorPallet, isOpen, onClose, saveButton, deleteButton } = props;
  //edit color of the tag
  //edit the content of the tag
  //save the changes
  //delete tag

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Just a test</h2>
      <input value="input test" />
    </Modal>
  );
}
