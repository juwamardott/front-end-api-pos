import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./components/ProductDetail";
import Transaction from "./pages/Transaction";
import { Toaster } from "react-hot-toast"; // ✅ import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* ✅ Toaster di sini, agar global */}
      <Toaster position="top-right" reverseOrder={false} />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
