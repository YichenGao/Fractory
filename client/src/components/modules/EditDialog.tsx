import React, { useState, SetStateAction } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type EditDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  oldTitle: string;
  setNewTitle: (newTitle: string) => void;
};

const EditDialog = (props: EditDialogProps) => {
  const [value, setValue] = useState<string>(props.oldTitle);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleClose = () => {
    props.setOpen(false);
  };
  const handleSubmit = () => {
    props.setNewTitle(value);
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Edit Title</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            defaultValue={props.oldTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Rename</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditDialog;
