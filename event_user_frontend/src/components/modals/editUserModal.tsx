import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditUserForm from "../Forms/editUserForm";

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

type userType = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
};

type EditUserModalOpen = {
  editUserModalOpen: boolean;
  setEditUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: userType;
};

export default function EditUserModal({
  user,
  editUserModalOpen,
  setEditUserModalOpen,
}: EditUserModalOpen) {
  return (
    <Modal
      open={editUserModalOpen}
      onClose={() => setEditUserModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <EditUserForm
          user={user}
          setEditUserModalOpen={setEditUserModalOpen}
          editUserModalOpen={editUserModalOpen}
        />
      </Box>
    </Modal>
  );
}
