import React from "react";
import "./index.scss";
import Logo from "../../../assets/img/logo.png";

export const Loading = () => {
  return (
    <div className="container_preload">
      <div className="avatar_logo">
        <img alt="logo mercadolibre" src={Logo} />
      </div>
    </div>
  );
};
