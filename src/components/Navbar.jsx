// src/components/Navbar.jsx
function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-indigo-600">MyApp</div>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <a href="#" className="hover:text-indigo-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-indigo-600">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-indigo-600">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
