import React, { useState, useEffect } from "react";
import { Menu, ShoppingBag, User, X, Search, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const menuItems = [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "shop", label: "Sản phẩm", path: "/shop" },
    { key: "about", label: "Giới thiệu", path: "/about" },
    { key: "contact", label: "Thông tin tài khoản", path: "/profile" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("✅ Bạn đã đăng xuất!");
    navigate("/login");
    setDropdownOpen(false);
    setUser(null);
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
          className="text-xs font-bold text-[#4b3b27] cursor-pointer tracking-tight flex items-center gap-1"
        >
          Fashion<span className="text-[#8b5a1e]">Shop</span>
        </h1>
      </div>

      {/* Search */}
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
        <div className="flex gap-2 items-center">
          <div 
            className="cursor-pointer text-[#8b5a1e] hover:text-[#a76d2b]"
            onClick={() => navigate("/camera-search")}>
            <Camera size={20} className="text-[#8b5a1e]" />
          </div> 
          <button
            type="submit"
            className="bg-[#8b5a1e] text-white px-3 py-1 text-xs rounded-full hover:bg-[#a76d2b]"
          >
            Tìm
          </button>
        </div>
      </form>

      {/* Menu desktop */}
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

      {/* Hành động */}
      <div className="flex items-center gap-2 relative">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-1 bg-[#8b5a1e] text-white px-2.5 py-1 rounded hover:bg-[#a76d2b]"
        >
          <ShoppingBag size={14} />
          <span className="hidden sm:inline text-xs">Giỏ</span>
        </button>

        {user ? (
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 border border-[#8b5a1e] px-2.5 py-1 rounded text-[#4b3b27] hover:bg-[#fde68a]">
              <User size={14} />
              <span className="hidden sm:inline text-xs">{user.username}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-1 border border-[#8b5a1e] px-2.5 py-1 rounded text-[#4b3b27] hover:bg-[#fde68a]"
          >
            <User size={14} />
            <span className="hidden sm:inline text-xs">Đăng nhập</span>
          </button>
        )}
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
              className="flex items-center gap-1 bg-[#8b5a1e] text-white rounded hover:bg-[#a76d2b]"
            >
              <ShoppingBag size={14} />Giỏ hàng
            </button>

            {user ? (
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  navigate("/profile");
                }}
                className="flex items-center gap-1 border border-[#8b5a1e] px-3 py-1 rounded text-[#4b3b27] hover:bg-[#fde68a]"
              >
                <User size={14} /> {user.username}
              </button>
            ) : (
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  navigate("/login");
                }}
                className="flex items-center gap-1 border border-[#8b5a1e] px-3 py-1 rounded text-[#4b3b27] hover:bg-[#fde68a]"
              >
                <User size={14} /> Đăng nhập
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
