import React,{useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function DeleteConfirmationDialog({
  open,
  handleClose,
  onDelete,
  confirmMessage,
  confirmKeyword,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleDelete = () => {
    if (inputValue === confirmKeyword) {
      onDelete();
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
      <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
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
        <Button onClick={handleDelete} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
