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
//importing the tags from database

const mockTags = [
  {
    label: "Breafjdksjflsjdkljkjljkjkfjslkfast",
    _id: "dkfjksl76868",
    color: "#03619c",
  },
  {
    label: "Lunch",
    _id: "xjkcfjkl2343",
    color: "#8c8f03",
  },
  {
    label: "Dinner",
    _id: "jkdjfkj9998",
    color: "#03619c",
  },
];

export default function RecipeTags(props) {
  const [tags, setTags] = useState(mockTags);
  const [current, setCurrent] = useState(null);
  const [isOpen, setModal] = useState(false);
  const onEdit = (newValue) => {
    setCurrent(newValue);
    setModal(true);
  };
  let tagList = tags.map((tag) => <Tag onEdit={onEdit} category={tag} />);

  return (
    <div>
      <div style={{ position: "absolute" }}>
        {<Modal isOpen={isOpen} onClose={setModal} />}
      </div>
      <p>The current tag is : {isOpen}</p>
      {/* <div className={s.container}> */}
      <ul>{tagList}</ul>
    </div>
  );
}
