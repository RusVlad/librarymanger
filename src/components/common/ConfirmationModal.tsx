import { Box, Button, Divider, IconButton, Modal, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  isIconButton?: boolean;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onConfirm: () => Promise<void>;
  message: string;
  title: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const ConfirmationModal: React.VFC<Props> = ({
  isIconButton = false,
  buttonText,
  buttonIcon,
  onConfirm,
  message,
  title,
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleConfirm = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    onConfirm().then(() => {
      setOpen(false);
      setIsSubmitting(false);
    });
  }
  return (
    <>
    {
      isIconButton ? <IconButton color="primary" onClick={() => setOpen(true)}>{buttonIcon}</IconButton> :
      <Button startIcon={buttonIcon ? buttonIcon : null} onClick={() => setOpen(true)}>{buttonText}</Button>
    }
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => setOpen(false)} sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm} disabled={isSubmitting}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
    </>
  );
};

export default ConfirmationModal;
