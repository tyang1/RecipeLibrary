import React, {
  createContext,
  useContext,
  useState,
  FunctionComponent,
  useEffect,
  Suspense,
} from "react";
import Tag from "./Tag.jsx";
import s from "./Tag.scss";
import Modal from "../components/Common/Modal.jsx";
import TagEditModal from "./TagEditModal.jsx";
//TODO: importing the tags from database

const mockTags = [
  {
    name: "Breafjdksjflsjdkljkjljkjkfjslkfast",
    _id: "dkfjksl76868",
    color: "#03619c",
  },
  {
    name: "Lunch",
    _id: "xjkcfjkl2343",
    color: "#8c8f03",
  },
  {
    name: "Dinner",
    _id: "jkdjfkj9998",
    color: "#03619c",
  },
];

export default function RecipeTags(props) {
  const [tags, setTags] = useState(mockTags);
  const [currentTagIndex, setcurrentTagIndex] = useState(null);
  const [isOpen, setModal] = useState(false);
  const onEdit = (currId) => {
    let matchedIndex = tags.findIndex((tag) => {
      return tag._id == currId;
    });
    setcurrentTagIndex(matchedIndex);
    setModal(true);
  };
  let tagList = tags.map((tag) => (
    <Tag key={tag._id} onEdit={onEdit} category={tag} />
  ));

  const updateSubject = (subjectChange) => {
    setTags(tagUpdate({ tags, subjectChange }));
  };

  function tagUpdate({ tags, subjectChange }) {
    return tags.map((tag, index) => {
      if (index === currentTagIndex) {
        return subjectChange;
      } else {
        return tag;
      }
    });
  }

  return (
    <div>
      <TagEditModal
        isOpen={isOpen}
        onClose={setModal}
        onSave={updateSubject}
        current={tags[currentTagIndex]}
      />
      <ul>{tagList}</ul>
    </div>
  );
}
