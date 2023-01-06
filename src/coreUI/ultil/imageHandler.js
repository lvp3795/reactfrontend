import React from "react";

export default function ImageHandler({ product }) {
  const imageUrl = product
    ? product.image
    : "../../asset/No-Image-Placeholder.svg.png";
  return (
    <div className='rounded p-2'>
      <img
        src={imageUrl}
        alt=''
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className='mb-2 rounded'
      />
    </div>
  );
}
