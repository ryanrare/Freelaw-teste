import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

type CustomChipProps = {
  type: "cancel" | "update" | "active";
};

export default function CustomChip(props: CustomChipProps) {
  const { type } = props;
  const messsages = {
    cancel: "Cancelado",
    update: "Atualizado",
    active: "Ativo",
  };

  const color = () => {
    if (type === "cancel") {
      return "error";
    } else if (type === "update") {
      return "warning";
    } else {
      return "info";
    }
  };

  const label = () => {
    if (type === "cancel") {
      return messsages.cancel;
    } else if (type === "update") {
      return messsages.update;
    } else {
      return messsages.active;
    }
  };

  return <Chip label={label()} color={color()} />;
}
