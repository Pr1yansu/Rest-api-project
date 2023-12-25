import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";

const Header = () => {
  const [token, setToken] = useState<string | null>(null);

  const Links = [
    {
      to: "/",
      name: "Home",
    },
    {
      to: token ? "/logout" : "/login",
      name: token ? "Logout" : "Login",
      onClick: () => {
        if (!token) return;
        localStorage.removeItem("auth-token");
        setToken(null);
        window.location.href = "/";
      },
    },
    {
      to: "/dashboard",
      name: "Dashboard",
    },
    {
      to: "/cart",
      name: "Cart",
    },
  ];
  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    setToken(authToken);
  }, []);
  return (
    <div className="header">
      <Link to="/" className="logo">
        LOGO
      </Link>
      <ul className="nav-links">
        {Links.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.to}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              onClick={link.onClick}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
