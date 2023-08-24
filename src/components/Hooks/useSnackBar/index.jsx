import React, { createContext, useCallback, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

const Context = createContext();

function RenderSnack({ id, message, open, handleClose, severity }) {
  const messageId = `message-${id}`;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      ContentProps={{
        "aria-describedby": messageId,
      }}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={handleClose}
          size="small"
        >
          <CloseIcon size="small" />
        </IconButton>,
      ]}
    >
      <Alert onClose={handleClose} severity={severity || "info"}>
        <span id={messageId}>{message}</span>
      </Alert>
    </Snackbar>
  );
}

let uniqueId = 2;

export const SnackProvider = ({ children }) => {
  const [{ current, queue }, setState] = useState({
    current: null,
    queue: [],
  });

  const createSnack = useCallback(
    (
      message,
      options = {
        severity: "info",
      }
    ) => {
      const id = uniqueId++;
      const snack = { id, message, open: true, options };

      setState(({ current: prevCurrent, queue: prevQueue }) => {
        if (prevCurrent) {
          return {
            current: prevCurrent,
            queue: prevQueue.concat(snack),
          };
        }

        return {
          current: snack,
          queue: prevQueue,
        };
      });
      return id;
    },
    []
  );

  function handleClose() {
    setState((currentState) => ({
      ...currentState,
      current: { ...currentState.current, open: false },
    }));
    // time to snack close animation
    setTimeout(openNext, 1000);
  }

  function openNext() {
    if (queue.length) {
      setState({ current: queue[0], queue: queue.slice(1) });
    } else {
      setState({ current: null, queue: [] });
    }
  }

  return (
    <Context.Provider value={{ createSnack }}>
      {current && (
        <RenderSnack
          key={current.id}
          {...current}
          severity={current.options.severity}
          handleClose={handleClose}
        />
      )}
      {children}
    </Context.Provider>
  );
};

export const useSnackbar = () => useContext(Context);
