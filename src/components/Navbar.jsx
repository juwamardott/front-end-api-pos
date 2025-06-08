import { User } from "lucide-react";

export default function Navbar({ toggleSidebar, user }) {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center md:ml-64 fixed top-0 left-0 right-0 z-40 poppins-bold">
      {/* Toggle button for mobile */}
      <button onClick={toggleSidebar} className="md:hidden text-gray-700">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* User info on the right */}
      <div className="flex items-center ml-auto space-x-2 text-indigo-600">
        <User className="w-6 h-6" />
        <span className="text-base font-medium">{user?.name || "User"}</span>
      </div>
    </nav>
  );
}
