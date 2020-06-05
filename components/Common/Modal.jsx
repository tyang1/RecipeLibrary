import React, { SFC } from "react";

import { DialogOverlay, DialogContent } from "@reach/dialog";
import { Transition } from "react-spring/renderprops";
import { useTransition, animated, config } from "react-spring";

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

export default function Modal(props) {
  const { isOpen, onClose } = props;
  //   const [showDialog, setShowDialog] = React.useState(false);

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });
  let results = transitions.map(({ item, key, props: styles }) => {
    return (
      item && (
        <AnimatedDialogOverlay style={{ opacity: styles.opacity }}>
          <AnimatedDialogContent
            style={{
              transform: styles.y.interpolate(
                (value) => `translate3d(0px, ${value}px, 0px)`
              ),
              border: "4px solid hsla(0, 0%, 0%, 0.5)",
              borderRadius: 10,
            }}
          >
            <button onClick={() => onClose()}>Close Dialog</button>
            <p>React Spring makes it too easy!</p>
            <input type="text" />
            <br />
            <input type="text" />
            <button>Ayyyyyy</button>
          </AnimatedDialogContent>
        </AnimatedDialogOverlay>
      )
    );
  });
  return results.find((item) => item) || null;
}
