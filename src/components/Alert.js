import React from "react";
import { useSnackbar } from "notistack";

function Alert() {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccess = (message) => {
    enqueueSnackbar(message, { variant: "success" });
  };

  const showError = (message) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  const showInfo = (message) => {
    enqueueSnackbar(message, { variant: "info" });
  };

  const showWarning = (message) => {
    enqueueSnackbar(message, { variant: "warning" });
  };

  return (
    <div>
      {/* Buttons to trigger different types of alerts */}
      <button onClick={() => showSuccess("This is a success message!")}>
        Show Success
      </button>
      <button onClick={() => showError("This is an error message!")}>
        Show Error
      </button>
      <button onClick={() => showInfo("This is an info message!")}>
        Show Info
      </button>
      <button onClick={() => showWarning("This is a warning message!")}>
        Show Warning
      </button>
    </div>
  );
}

export default Alert;
