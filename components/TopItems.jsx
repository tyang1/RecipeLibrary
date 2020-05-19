import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

function numberToPaper({ number, title, classes, selectHandler }) {
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
        <Paper elevation={i + 1} />
      </div>
    );
  }
  return list;
}

export default function TopItems(props) {
  const classes = useStyles(value);
  const { title, number, selectHandler, value } = props;
  const paper = numberToPaper({ number, title, classes, selectHandler });

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
