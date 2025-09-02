import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GroceryContext } from "../context/GroceryContext";
import assets from "../assets/assets";

function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/products" },
  ];

  const ref = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    cartCount,
    setSearchQuery,
    searchQuery,
  } = useContext(GroceryContext);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(ref.current.scrollTop > 10);
    };
    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Auto navigate when search query is typed
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <div ref={ref} className="h-20 overflow-y-scroll">
      <p className="w-full h-[1200px]"></p>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/90 text-gray-800 shadow-md backdrop-blur-md border-b border-gray-200 py-3"
            : "bg-white py-4"
        }`}
      >
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-orange-800">QuiBA</h1>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="group flex flex-col items-center text-base text-gray-700 hover:text-indigo-600 transition"
            >
              {link.name}
              <div className="h-0.5 w-0 group-hover:w-full bg-indigo-500 transition-all duration-300 mt-1 rounded-full"></div>
            </Link>
          ))}
        </div>

        {/* Right: Search, Cart, Profile/Login */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search */}
          <div className="hidden lg:flex items-center border border-gray-300 px-3 rounded-full text-sm">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search products"
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                clipRule="evenodd"
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#c0c0c0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute -top-2 -right-3 bg-gray-600  text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
              {cartCount()}
            </span>
          </div>

          {/* Profile or Login */}
          {user ? (
            <div className="relative group">
              <img src={assets.profile_icon} alt="" className="w-10" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-32 rounded-md z-40 text-sm">
                <li
                  onClick={() => navigate("/my-orders")}
                  className="p-1.5 cursor-pointer hover:bg-gray-100"
                >
                  My Orders
                </li>
                <li
                  className="cursor-pointer p-1.5 hover:bg-gray-100"
                  onClick={() => setUser(false)}
                >
                  Logout
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-8 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-full"
            >
              Login
            </button>
            
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          <svg
            className={`h-6 w-6 ${isScrolled ? "text-gray-800" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden font-medium text-gray-800 transition-transform duration-500 z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Nav Links at Top */}
        <div className="mt-16 flex flex-col items-center gap-4">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Rest of Menu (search, cart, login/logout) */}
        <div className="mt-8 flex flex-col items-center gap-6">
          {/* Mobile Search */}
          <div className="w-3/4 flex items-center border border-gray-300 px-3 rounded-full text-sm">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search products"
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            />
          </div>

          {/* Mobile Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => {
              navigate("/cart");
              setIsMenuOpen(false);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 14 14" fill="none">
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#615fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute -top-2 -right-3 bg-indigo-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
              {cartCount()}
            </span>
          </div>

          {/* Login/Logout */}
          {user ? (
            <button
              onClick={() => {
                setUser(false);
                setIsMenuOpen(false);
              }}
              className="bg-indigo-500 text-white px-8 py-2 rounded-full"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setShowUserLogin(true);
                setIsMenuOpen(false);
              }}
              className="bg-indigo-500 text-white px-8 py-2 rounded-full"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
