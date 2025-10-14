import React, { useState } from "react";
import { Menu, ShoppingBag, User, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const menuItems = [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "shop", label: "Sản phẩm", path: "/shop" },
    { key: "about", label: "Giới thiệu", path: "/about" },
    { key: "contact", label: "Liên hệ", path: "/contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  return (
    <header className="bg-[#f8e6c1] border-b-2 border-[#8b5a1e] px-4 py-2 flex justify-between items-center shadow-sm sticky top-0 z-50 text-sm">
      {/* Logo & Menu Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-[#8b5a1e] text-white p-1.5 rounded hover:bg-[#a76d2b] md:hidden"
        >
          {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        <h1
          onClick={() => navigate("/")}
          className="text-xs font-bold text-[#4b3b27] cursor-pointer tracking-tight"
        >
          Fashion<span className="text-[#8b5a1e]">Shop</span>
        </h1>
      </div>

      {/* Thanh tìm kiếm (ẩn trên mobile nhỏ) */}
      <form
        onSubmit={handleSearch}
        className="hidden sm:flex items-center bg-white border border-[#e6c97b] rounded-full px-3 py-1 w-64 lg:w-80"
      >
        <Search size={14} className="text-[#8b5a1e]" />
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-2 text-xs outline-none bg-transparent text-[#4b3b27]"
        />
        <button
          type="submit"
          className="bg-[#8b5a1e] text-white px-3 py-1 text-xs rounded-full hover:bg-[#a76d2b]"
        >
          Tìm
        </button>
      </form>

      {/* Menu chính (desktop) */}
      <nav className="hidden md:flex items-center gap-5">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            to={item.path}
            className="text-[#4b3b27] hover:text-[#8b5a1e] transition font-medium"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Nút hành động */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-1 bg-[#8b5a1e] text-white px-2.5 py-1 rounded hover:bg-[#a76d2b]"
        >
          <ShoppingBag size={14} />
          <span className="hidden sm:inline text-xs">Giỏ</span>
        </button>

        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-1 border border-[#8b5a1e] px-2.5 py-1 rounded text-[#4b3b27] hover:bg-[#fde68a]"
        >
          <User size={14} />
          <span className="hidden sm:inline text-xs">Đăng nhập</span>
        </button>
      </div>

      {/* Menu mobile */}
      {sidebarOpen && (
        <div className="absolute top-full left-0 w-full bg-[#fff8dc] border-t border-[#e6c97b] flex flex-col items-start px-4 py-3 md:hidden shadow-md animate-slideDown text-sm">
          {/* Search trên mobile */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white border border-[#e6c97b] rounded-full px-3 py-1 mb-3 w-full"
          >
            <Search size={14} className="text-[#8b5a1e]" />
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-2 text-xs outline-none bg-transparent text-[#4b3b27]"
            />
            <button
              type="submit"
              className="bg-[#8b5a1e] text-white px-3 py-1 text-xs rounded-full hover:bg-[#a76d2b]"
            >
              Tìm
            </button>
          </form>

          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className="block w-full py-2 text-[#4b3b27] border-b border-[#f0d9a6] hover:bg-[#fde68a]"
            >
              {item.label}
            </Link>
          ))}

          <div className="flex gap-3 w-full justify-start mt-3">
            <button
              onClick={() => {
                setSidebarOpen(false);
                navigate("/cart");
              }}
              className="flex items-center gap-1 bg-[#8b5a1e] text-white px-3 py-1 rounded hover:bg-[#a76d2b]"
            >
              <ShoppingBag size={14} /> Giỏ hàng
            </button>
            <button
              onClick={() => {
                setSidebarOpen(false);
                navigate("/login");
              }}
              className="flex items-center gap-1 border border-[#8b5a1e] px-3 py-1 rounded text-[#4b3b27] hover:bg-[#fde68a]"
            >
              <User size={14} /> Đăng nhập
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
