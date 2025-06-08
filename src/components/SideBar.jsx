// src/components/Sidebar.jsx
import { useLocation, Link } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItemClass = (path) =>
    `block px-4 py-2 rounded transition ${
      currentPath === path
        ? "bg-indigo-100 text-indigo-600 font-semibold"
        : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
    }`;

  return (
    <aside
      className={`poppins-medium fixed top-0 left-0 h-full w-64 bg-white shadow-md transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="p-4 text-xl font-bold text-indigo-600 border-b poppins-bold">
        POS System
      </div>
      <ul className="p-4 space-y-2">
        <li>
          <Link to="/" className={menuItemClass("/")}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/chasier" className={menuItemClass("/chasier")}>
            Chasier
          </Link>
        </li>
        <li>
          <Link to="/product" className={menuItemClass("/product")}>
            Product
          </Link>
        </li>
        <li>
          <Link to="/settings" className={menuItemClass("/settings")}>
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}
