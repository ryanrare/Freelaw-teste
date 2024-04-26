import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CreateUserForm from "../Forms/createUserForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 8,
  boxShadow: 24,
};

type createUserModalOpen = {
  createUserModalOpen: boolean;
  setCreateUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateUserModal({
  createUserModalOpen,
  setCreateUserModalOpen,
  setEditUserModalOpen,
}: createUserModalOpen) {
  return (
    <Modal
      open={createUserModalOpen}
      onClose={() => setCreateUserModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CreateUserForm
          setCreateUserModalOpen={setCreateUserModalOpen}
          setEditUserModalOpen={setEditUserModalOpen}
        />
      </Box>
    </Modal>
  );
}
