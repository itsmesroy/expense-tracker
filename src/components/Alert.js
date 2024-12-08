import React from "react";
import { useSnackbar } from "notistack";

function Alert() {
  const { enqueueSnackbar } = useSnackbar;

  const successMessage = (message) => {
    enqueueSnackbar(message, { variant: "success" });
  };
  const errorMessage = (message) => {
    enqueueSnackbar(message, { variant: "error" });
  };
  return(
    <div>
      <button onClick={() => successMessage("This is a success message")}>
        Success
      </button>
      <button onClick={() => errorMessage("This is an error message")}>
        Error
      </button>
    </div>
  );
}
export default Alert;
