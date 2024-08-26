import React from "react";

export function Container({ className, children }) {
  return (
    <div
      className={`container p-8 mx-auto xl:px-0 ${className ? className : ""}`}
    >
      {children}
    </div>
  );
}
