import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <h2 className="mt-3 text-lg font-semibold text-gray-700">Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingPage;

