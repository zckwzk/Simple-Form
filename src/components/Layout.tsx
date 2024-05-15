import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen  mx-auto p-0 md:p-2 flex flex-col">
      {/* Main Content Area */}
      <main className="flex m-auto   sm:p-0 md:p-4">{children}</main>
    </div>
  );
};

export default Layout;
