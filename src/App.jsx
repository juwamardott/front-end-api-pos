import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Import toast

import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Product from "./pages/Product";
import Transaction from "./pages/Transaction";
import Reports from "./pages/Reports";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <Router>
      {/* ✅ Global Toast Component */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: "poppins-medium text-sm", // ✅ Poppins
        }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/transaction" element={<Transaction />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
