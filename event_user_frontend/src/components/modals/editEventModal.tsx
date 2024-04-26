import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditEventForm from "../Forms/editEventForm";
import { eventType } from "../../types/eventType";

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

type EditEventModalOpen = {
  editEventModalOpen: boolean;
  toggleModal: () => void;
  event: eventType;
};

export default function EditEventModal({
  event,
  editEventModalOpen,
  toggleModal,
}: EditEventModalOpen) {
  return (
    <Modal open={editEventModalOpen}>
      <Box sx={style}>
        <EditEventForm
          eventEntity={event}
          togleModal={toggleModal}
          editEventModalOpen={editEventModalOpen}
        />
      </Box>
    </Modal>
  );
}
