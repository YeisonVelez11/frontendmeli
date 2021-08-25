import React from "react";
import "./index.scss";

export const Breadcrums = ({ categories }) => {
  return (
    <div className="container_breadcrumb">
      {categories.map((category, i) => (
        <a href="/" key={category.toString()} className="breadcrumbs" style={{ fontWeight: i !== categories.length - 1 ? 400 : 600 }}>
          {category}
          <span className="space_breadcrums">{i !== categories.length - 1 ? " > " : ""}</span>
        </a>
      ))}
    </div>
  );
};
