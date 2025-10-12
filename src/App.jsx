import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import About from "./pages/About";
import Beranda from "./pages/Beranda";
import Footer from "./components/Footer";

function Home() {
  return (
    <main className="container">
      <ProductList />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Beranda/>} />
        <Route path="/produk" element={<ProductList />} />
        <Route path="/tentang" element={<About/>} />
      </Routes>

      <Footer />
    </Router>
  );
}
