import { Backdrop, Box, Modal, Fade } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%",
    sm: "95%",
  },
  height: {
    xs: "100%",
    sm: "auto",
  },
  maxHeight: "90vh",
  maxWidth: 800,
  bgcolor: "#fff",
  borderRadius: 1,
  boxShadow: 20,
  p: 4,
  overflowY: "auto",
};

export default function ModalGeneric({ open, onClose, children }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="modal-generico"
      aria-describedby="modal-generico-descripcion"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          style: {
            backgroundColor: "rgba(0, 10, 77, 0.2)",
          },
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}
