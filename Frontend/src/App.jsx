import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// USER PAGES
import Beranda from "./pages/Beranda";
import ProductList from "./pages/ProductList";
import About from "./pages/About";

// ADMIN PAGES
import AdminLogin from "./pages/AdminLogin";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminProductList from "./pages/AdminProductList";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminOrders from "./pages/AdminOrders";

// PRIVATE ROUTE
import PrivateRoute from "./components/PrivateRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<Beranda />} />
        <Route path="/produk" element={<ProductList />} />
        <Route path="/tentang" element={<About />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN ROUTES */}
        <Route 
          path="/admin/add" 
          element={
            <PrivateRoute>
              <AdminAddProduct />
            </PrivateRoute>
          }
        />

        <Route 
          path="/admin/products" 
          element={
            <PrivateRoute>
              <AdminProductList />
            </PrivateRoute>
          }
        />

        <Route 
          path="/admin/products/:id/edit"
          element={
            <PrivateRoute>
              <AdminEditProduct />
            </PrivateRoute>
          }
        />

        <Route 
          path="/admin/orders"
          element={
            <PrivateRoute>
              <AdminOrders />
            </PrivateRoute>
          }
        />

      </Routes>

      {/* WAJIB AGAR TOAST TAMPIL */}
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}
