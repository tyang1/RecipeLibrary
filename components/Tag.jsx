import React from "react";
import cx from "classnames";
import s from "./Tag.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function Tag(props) {
  const { category, onEdit } = props;
  const { _id } = category;
  return (
    <li style={{ display: "list-item" }}>
      <div>
        <span className={s.item}>
          <span>{category.label}</span>
          <a
            onClick={() => onEdit(_id)}
            style={{ cursor: "pointer", marginLeft: "7px" }}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </a>
        </span>
      </div>
    </li>
  );
}
