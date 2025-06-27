import { useState } from "react";
import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";
import useAuth from "./store/auth";

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);


  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
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
