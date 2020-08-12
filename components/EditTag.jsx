import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useLayoutEffect,
} from "react";
// import { useSubjectsState, getEligibleParents, computeSubjectParentId, useChildMapSelector } from "app/state/subjectsState";;

// import { useColors } from "app/state/colorsState";
import ColorsPalette from "../components/Common/ColorsPalette.jsx";

import cn from "classnames";
import FlexRow from "./layout/FlexRow.jsx";
// import FlowItems from "../../layout/FlowItems";
// import Stack from "../../layout/Stack";
// import { Button } from "../../ui/Button";

const EditTag = (props) => {
  const [deleteShowing, setDeleteShowing] = useState(false);
  const { subject, onCancelEdit } = props;

  const test = { name: "happy", backgroundColor: "pink", textColor: "white" };

  const [editingSubject, setEditingSubject] = useState(test);
  return (
    <EditSubjectFields
      {...{ editingSubject, setEditingSubject, onCancelEdit, setDeleteShowing }}
    />
  );
};

const EditSubjectFields = (props) => {
  const {
    editingSubject,
    setEditingSubject,
    onCancelEdit,
    setDeleteShowing,
  } = props;

  //   const { subjectHash } = useSubjectsState();
  //   const { colors } = useColors();

  const { _id = 0, name = "test1" } = editingSubject || {
    _id: 0,
    name: "test1",
    parentId: 1,
    backgroundColor: "pink",
    textColor: "black",
  };

  //   const { runMutation: updateSubject, running: isSubjectSaving } = useMutation<MutationOf<Mutations["updateSubject"]>>(UpdateSubjectMutation);

  const textColors = ["#ffffff", "#000000"];

  const [missingName, setMissingName] = useState(false);
  const setEditingSubjectField = (prop, value) => {
    if (prop == "name" && value.trim()) {
      setMissingName(false);
    }
    setEditingSubject((sub) => ({ ...sub, [prop]: value }));
  };

  const runSave = () => {
    if (!editingSubject.name.trim()) {
      return setMissingName(true);
    }

    let {
      _id,
      name,
      parentId,
      backgroundColor,
      textColor,
    } = editingSubject || {
      _id: 0,
      name: "test1",
      parentId: 1,
      backgroundColor: "pink",
      textColor: "black",
    };
    let request = { _id, name, parentId, backgroundColor, textColor };

    // Promise.resolve(updateSubject(request)).then(onCancelEdit);
  };

  const subjectEditingKeyDown = (evt) => {
    let key = evt.keyCode || evt.which;
    if (key == 13) {
      if (!evt.target.value.trim()) {
        setMissingName(true);
      } else {
        runSave();
      }
    }
  };

  return (
    <>
      <FlexRow>
        <label>Name</label>
        <input
          onKeyDown={subjectEditingKeyDown}
          onChange={(evt) => setEditingSubjectField("name", evt.target.value)}
          value={editingSubject.name}
          className={cn("form-control", { error: missingName })}
        />
      </FlexRow>
      <FlexRow>
        <label>Label Color</label>
        <ColorsPalette
          currentColor={
            (editingSubject && editingSubject.backgroundColor) || "pink"
          }
          colors={["blue", "green"]}
          onColorChosen={(color) =>
            setEditingSubjectField("backgroundColor", color)
          }
        />
      </FlexRow>
      <FlexRow>
        <label>Text Color</label>
        <ColorsPalette
          colors={textColors}
          onColorChosen={(color) => setEditingSubjectField("textColor", color)}
        />
      </FlexRow>
    </>
  );
};

export default EditTag;
