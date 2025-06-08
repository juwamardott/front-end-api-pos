import { useState } from "react";
import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const dummyUser = {
    name: "Sasa",
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} user={dummyUser} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden transition ease-in duration-1000"
          onClick={closeSidebar}
        ></div>
      )}

      <main className="pt-16 md:ml-64 p-6 bg-gray-50 min-h-screen transition-all">
        {children}
      </main>
    </div>
  );
}
