import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Import toast

import Layout from "./Layout";
import Home from "./pages/POS/Home";
import WarehouseDashboard from "./pages/Warehouse/WarehouseDashboard";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Product from "./pages/POS/Product";
import Transaction from "./pages/POS/Transaction";
import Reports from "./pages/POS/Reports";
import ProductDetail from "./components/POS/ProductDetail";
import PurchaseOrder from "./pages/Warehouse/PurchaseOrder";
import NotificationTester from "./Notification";

function App() {
  return (
    <Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "poppins-medium text-md",
        }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/notification" element={<NotificationTester />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route path="/pos/home" element={<Home />} />
                  <Route path="/pos/products" element={<Product />} />
                  <Route path="/pos/product/:id" element={<ProductDetail />} />
                  <Route path="/pos/transaction" element={<Transaction />} />
                  <Route path="/pos/reports" element={<Reports />} />

                  <Route
                    path="/warehouse/home"
                    element={<WarehouseDashboard />}
                  />
                  <Route path="/warehouse/po" element={<PurchaseOrder />} />
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
