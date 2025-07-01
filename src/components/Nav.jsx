import { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CartCounter from "./CartCounter";
import WishListCounter from "./WishListCounter";
export default function Nav() {
  const navigate = useNavigate();
  const placeholders = [
    "Search for groceries",
    "Find electronics",
    "Discover fashion deals",
    "Try 'mobile phone'",
    "Looking for headphones?",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const searchHandler = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid ms-3">
          <NavLink to="/" className="navbar-brand">
            <span className="text-success fs-3">Quick</span>
            <span className="text-warning fs-3">Mart</span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="d-flex flex-grow-1 mx-auto"
              style={{ maxWidth: "700px" }}
              onSubmit={searchHandler}
            >
              <div className="input-group mt-2">
                <input
                  type="search"
                  placeholder={placeholders[placeholderIndex]}
                  className="form-control"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="input-group-text" type="submit">
                  <MdSearch />
                </button>
              </div>
            </form>

            <ul className="navbar-nav ms-lg-auto d-flex gap-4 me-3">
              <li className="nav-item d-flex align-items-center">
                <NavLink to="/user">
                  <button
                    className={`btn btn-sm ${
                      isLoggedIn ? "btn-success" : "btn-secondary"
                    }`}
                    onClick={() => setIsLoggedIn(true)}
                  >
                    {isLoggedIn ? "Logged in" : "Login"}
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-danger" : ""}`
                  }
                >
                  <FaHeart /> <WishListCounter />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-success" : ""}`
                  }
                >
                  <FaShoppingCart /> <CartCounter />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
