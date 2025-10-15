import React from "react";
import Image from "next/image";

const MainLayout = async ({ children }) => {
  return (
    <div className="container mx-auto mt-24 mb-20">
      {children}
    </div>
  );
};

export default MainLayout;
