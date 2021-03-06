import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import s from "./TopItems.scss";
import cx from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
      transition: "0.5s",
      "&:hover": {
        width: theme.spacing(18),
        height: theme.spacing(18),
      },
    },
  },
}));

function paperContent(value) {
  let content = (value && value.title) || null;
  return <div className={cx(s.recipeContainer)}>{content}</div>;
}
function numberToPaper({ number, title, classes, selectHandler, value }) {
  const list = [];
  for (let i = 0; i < number; i++) {
    list.push(
      <div
        key={`elevation${title}${i}`}
        onClick={(e) => {
          selectHandler(e, `${title}-${i}`);
        }}
        className={classes.root}
      >
        <Paper elevation={i + 1}>{paperContent(value[i])}</Paper>
      </div>
    );
  }
  return list;
}

export default function TopItems(props) {
  const { title, number, selectHandler, value } = props;
  const classes = useStyles(value);
  const paper = numberToPaper({ number, title, classes, selectHandler, value });

  return (
    <div>
      <h2>{title}</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", boxSizing: "content-box" }}
      >
        {paper}
      </div>
    </div>
  );
}
