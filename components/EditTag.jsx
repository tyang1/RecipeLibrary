import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useLayoutEffect,
} from "react";
// import { useSubjectsState, getEligibleParents, computeSubjectParentId, useChildMapSelector } from "app/state/subjectsState";;

// import { useColors } from "app/state/colorsState";
// import CustomColorPicker from "../../ui/CustomColorPicker";
import ColorsPalette from "../components/Common/ColorsPalette.jsx";

import cn from "classnames";
// import FlexRow from "../../layout/FlexRow";
// import FlowItems from "../../layout/FlowItems";
// import Stack from "../../layout/Stack";
// import { Button } from "../../ui/Button";

const EditTag = (props) => {
  const [deleteShowing, setDeleteShowing] = useState(false);

  //   const childSubjectsMap = useChildMapSelector();

  const { subject, onCancelEdit } = props;
  //   const childSubjects = childSubjectsMap[subject._id] || [];

  const [editingSubject, setEditingSubject] = useState(null);

  //   useLayoutEffect(() => {
  //     setEditingSubject({ ...subject, parentId: computeSubjectParentId(subject.path) });
  //     setDeleteShowing(false);
  //   }, [subject]);

  //   if (!editingSubject) {
  //     return <div></div>;
  //   }

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

  console.log("editingSubject", editingSubject);

  const { _id = 0, name = "test1" } = editingSubject || {
    _id: 0,
    name: "test1",
    parentId: 1,
    backgroundColor: "pink",
    textColor: "black",
  };

  // const inputEl = useRef(null);
  // useEffect(() => inputEl.current.focus({ preventScroll: true }), []);

  //   const { runMutation: updateSubject, running: isSubjectSaving } = useMutation<MutationOf<Mutations["updateSubject"]>>(UpdateSubjectMutation);

  const textColors = ["#ffffff", "#000000"];

  //   const eligibleParents = useMemo(() => getEligibleParents(subjectHash, _id) || [], [_id, subjectHash]);

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
      {/* <CustomColorPicker
        labelStyle={{ marginLeft: "3px" }}
        onColorChosen={(color) =>
          setEditingSubjectField("backgroundColor", color)
        }
        currentColor={editingSubject.backgroundColor}
      /> */}

      <label>Text Color</label>
      <ColorsPalette
        colors={textColors}
        onColorChosen={(color) => setEditingSubjectField("textColor", color)}
      />
      {/* <CustomColorPicker
        labelStyle={{ marginLeft: "3px" }}
        onColorChosen={(color) => setEditingSubjectField("textColor", color)}
        currentColor={editingSubject.backgroundColor}
      /> */}
    </>
  );
};

export default EditTag;
