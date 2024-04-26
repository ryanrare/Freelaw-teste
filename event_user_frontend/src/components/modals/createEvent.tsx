import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CreateEventForm from "../Forms/createEventForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "90%",
  Height: "auto",
  bgcolor: "background.paper",
  borderRadius: 8,
  boxShadow: 24,
};

type createEventModalOpen = {
  createEventModalOpen: boolean;
  setCreateEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateEventModal({
  createEventModalOpen,
  setCreateEventModalOpen,
}: createEventModalOpen) {
  return (
    <Modal
      open={createEventModalOpen}
      onClose={() => setCreateEventModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CreateEventForm setCreateEventModalOpen={setCreateEventModalOpen} />
      </Box>
    </Modal>
  );
}
