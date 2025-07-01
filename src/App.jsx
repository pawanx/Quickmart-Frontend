import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { WishlistProvider } from "./contexts/WishListContext";
import { CartProvider } from "./contexts/CartContext";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import AddressBook from "./pages/AddressBook";
import UserProfile from "./pages/UserProfile";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import { AddressProvider } from "./contexts/AddressContext";
import OrderPlaced from "./pages/OrderPlaced";

function App() {
  return (
    <AddressProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/products/:category" element={<AllProducts />} />
              <Route path="/productDetails/:id" element={<ProductDetails />} />
              <Route path="/addresses" element={<AddressBook />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/order/:id" element={<OrderPlaced />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AddressProvider>
  );
}

export default App;
