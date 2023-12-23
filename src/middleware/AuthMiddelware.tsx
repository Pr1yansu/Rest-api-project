import React, { useEffect } from "react";
import { redirect } from "react-router-dom";

const AuthMiddelware = (wrappedComponent: React.ReactNode) => {
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      redirect("/login");
    }
  }, []);

  return wrappedComponent;
};

export default AuthMiddelware;
