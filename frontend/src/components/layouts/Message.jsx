import bus from "../../utils/bus";
import { useState, useEffect } from "react";
import styles from "./Message.module.css";
const Message = () => {
  const [message, setMessages] = useState("");
  const [type, setType] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    bus.on("flash", ({ message, type }) => {
      setType(type);
      setMessages(message);
      setVisible(true);

      
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    });
  }, []);
  return (
    visible && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  );
};

export default Message;
