import React from "react";

type GlobalLayoutProps = {
  children: React.ReactNode;
};

export const GlobalLayout = ({ children }: GlobalLayoutProps) => (
  <div className="flex h-screen w-screen items-center justify-center bg-cover bg-[#efefef]">
    <div className="w-full md:w-7/12 mx-auto h-fit drop-shadow-sm">
      {children}
    </div>
  </div>
);
