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
//importing the tags from database

const mockTags = [
  {
    label: "Breafjdksjflsjdkljkjljkjkfjslkfast",
    color: "#03619c",
  },
  {
    label: "Lunch",
    color: "#8c8f03",
  },
  {
    label: "Dinner",
    color: "#03619c",
  },
];

export default function RecipeTags(props) {
  const [tags, setTags] = useState(mockTags);
  let tagList = tags.map((tag) => <Tag category={tag.label} />);
  return (
    <div>
      {/* <div className={s.container}> */}
      <ul>{tagList}</ul>
    </div>
  );
}
