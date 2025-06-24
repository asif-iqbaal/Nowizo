import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-white border-t-transparent" />
    </div>
  );
};

export default Spinner;
