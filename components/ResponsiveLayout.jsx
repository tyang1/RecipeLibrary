import { useState, useEffect } from "react";

export default function ResponsiveLayout(props) {
  const { renderDesktop, breakpoint, renderMobile } = props;
  //   return <div>{renderDesktop()}</div>;
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return width > breakpoint ? renderDesktop() : renderMobile();
}
