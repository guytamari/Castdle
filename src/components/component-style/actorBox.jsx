import React from "react";
import "./box.css";

const Box = ({ children }) => {
  return (
    <div className="box">
      <div>
        {children}
      </div>
    </div>
  );
};

export default Box;