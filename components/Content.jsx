import React from "react";

const styles = {
  width: "100%",
  height: "100%",
  boxSizing: "content-box",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  margin: "10px",
  boxShadow: "1px 1px 2px #444",
};

export default function Content(props) {
  //   const classes = useStyles();
  const { content, ...others } = props;

  return <div style={styles}>{content}</div>;
}
