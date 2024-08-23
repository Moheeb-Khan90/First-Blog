// import React from "react";

const Loader = ({loadingText}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-45 z-50 flex items-center justify-center">
      <div className="loader"></div>
      <span className="text-white text-2xl capitalize">{loadingText}</span>
    </div>
  );
};

export default Loader;
