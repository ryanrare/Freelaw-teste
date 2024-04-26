import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./router/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./GlobalStyle";

import { addNotification } from "./actions/notificationActions";
import { useDispatch } from "react-redux";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const SOCKET_ENDPOINT = "ws://localhost:8000/ws/socket-server/";

  useEffect(() => {
    const socket = new WebSocket(SOCKET_ENDPOINT);

    socket.onopen = () => {};

    socket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      console.log("====================================");
      console.log(event.data);
      console.log("====================================");
      dispatch(
        addNotification({
          id: jsonData.notification_id,
          description: jsonData.description || "Evento Atualizado",
          type: jsonData.type || "update",
          notificationExtraData: {
            sentBy: jsonData.title,
            sentAt: new Date().toISOString(),
            eventId: jsonData.event,
            eventTitle: jsonData.title,
          },
        })
      );
      console.log("====================================");
      console.log(jsonData);
      console.log("====================================");
    };

    socket.onclose = () => {};

    return () => {
      socket.close();
    };
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes />
    </BrowserRouter>
  );
};

export default App;
