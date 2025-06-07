import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div>
        <h1 className="">Haloo</h1>
        <h2 className="bg-red-400">I Gede Juwa Mardood</h2>
      </div>
    </>
  );
}

export default App;
