import React from "react";
import Menu from "./Menu";

export default function Template({
  title = "My Title",
  description = "My description",
  className = "bg-white text-dark p-4",
  children,
}) {
  return (
    <div>
      <Menu></Menu>
      <div className='container-fluid mt-4'>
        <div className='text-black text-center'>
          <h4 className='display-6'>{title}</h4>
          <p className='lead display-6'>{description}</p>
        </div>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}
