import React from "react";

export default function FlexRow({
  style = {
    display: "flex",
    flexDirection: "column",
    paddingButtom: "5px",
    paddingTop: "5px",
  },
  children,
}) {
  return <div style={style}>{children}</div>;
}
