import React, { SFC, useRef, useMemo, createContext, useState } from "react";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import { Transition } from "react-spring/renderprops";
import { useTransition, animated } from "react-spring";

//Visit react-spring.io/docs/hooks/basics for additional info:
//animated performs outside of React, for better performance reasons:
const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

export const ModalSizingContext = createContext(null);

export default function Modal(props) {
  const { isModalOpen, onModalClose, children, headerCaption } = props;
  const [showDialog, setShowDialog] = React.useState(false);

  const transitions = useTransition(isModalOpen, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });

  const animatModalSizing = useRef(true);
  const modalSizingPacket = useMemo(() => {
    return {
      disable() {
        animatModalSizing.current = false;
      },
      enable() {
        animatModalSizing.current = true;
      },
    };
  }, []);

  let modalStyle = {
    position: "fixed",
    background: "rgba(0,0,0,.33)",
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  let results = transitions.map(({ item, key, props: styles }) => {
    return (
      <ModalSizingContext.Provider value={modalSizingPacket}>
        {item && (
          <AnimatedDialogOverlay
            style={{ ...modalStyle, opacity: styles.opacity }}
          >
            <AnimatedDialogContent
              style={{
                position: "absolute",
                left: "50%",
                marginLeft: "-50px",
                background: "white",
                transform: styles.y.interpolate(
                  (value) => `translate3d(0px, ${value}px, 0px)`
                ),
                border: "4px solid hsla(0, 0%, 0%, 0.5)",
                borderRadius: 10,
              }}
            >
              <h3>{headerCaption}</h3>
              <button onClick={() => onModalClose()}>Close Dialog</button>

              {props.children({ onModalClose })}
            </AnimatedDialogContent>
          </AnimatedDialogOverlay>
        )}
      </ModalSizingContext.Provider>
    );
  });
  return results.find((item) => item) || null;
}
