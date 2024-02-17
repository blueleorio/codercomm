import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function ConfirmationDialog({
  open,
  handleClose,
  onConfirm,
  confirmMessage,
  confirmKeyword,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    if (inputValue === confirmKeyword) {
      onConfirm();
      handleClose();
    } else {
      alert(`Please type ${confirmKeyword} to confirm`);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Operation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {confirmMessage}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Confirmation"
          type="text"
          fullWidth
          variant="standard"
          value={inputValue}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
