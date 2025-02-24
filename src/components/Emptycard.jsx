import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={imgSrc}
        alt="Empty state image"
        className="w-1/3" // Vous pouvez ajuster la taille ici
      />
      <p className="w-3/4 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;







  