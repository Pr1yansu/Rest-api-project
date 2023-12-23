import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//components
import Header from "./components/Headers/Header";
import Footer from "./components/Footers/Footer";
import Home from "./pages/user/Home";
import LoginForm from "./components/Forms/LoginForm";

//css
import "./App.css";
import Dashboard from "./pages/admin/Dashboard";
import AuthMiddelware from "./middleware/AuthMiddelware";
import Cart from "./pages/user/cart/cart";
import ProductDetails from "./pages/user/Shop/ProductDetails";
import { CartProvider } from "./hooks/useCart";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Router>
        <CartProvider initialCart={[]}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={AuthMiddelware(<Dashboard />)} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/cart" element={AuthMiddelware(<Cart />)} />
            <Route path="/product/detail/:id" element={<ProductDetails />} />
          </Routes>
          <Footer />
          <Toaster />
        </CartProvider>
      </Router>
    </>
  );
};

export default App;
