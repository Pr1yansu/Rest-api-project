import React from "react";
import "./toast.css";

interface ToastProps {
  message?: string;
  type: "success" | "error";
  title: string;
  hide?: "hide" | "show";
}

const Toast: React.FC<ToastProps> = ({ message, type, title, hide }) => {
  return (
    <div className={`alert-${type} ${hide}`}>
      <div className="alert-title">{title.toUpperCase()}</div>
      {message && <div className="alert-description">{message}</div>}
    </div>
  );
};

export default Toast;
