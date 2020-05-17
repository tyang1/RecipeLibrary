import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));
//style={{ position: "relative", zIndex: 1000 }} key={`elevation${i}`}

function numberToPaper(number, classes) {
  const list = [];
  for (let i = 0; i < number; i++) {
    list.push(
      <div key={`elevation${i}`} className={classes.root}>
        <Paper elevation={i + 1} />
      </div>
    );
  }
  return list;
}

export default function TopItems(props) {
  const classes = useStyles(value);
  const { title, number, hoverChange, value } = props;
  const paper = numberToPaper(number, classes);

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
