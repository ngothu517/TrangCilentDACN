import React, { useState, useEffect } from "react";
import { Menu, ShoppingBag, User, X, Search, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import quan1 from "../assets/quan1.png";
import quan2 from "../assets/quan2.png";
import quan3 from "../assets/quan3.png";
import quan4 from "../assets/quan4.png";
import quan5 from "../assets/quan5.png";
import quan6 from "../assets/quan6.png";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [showCamera, setShowCamera] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
    alert("Bạn đã đăng xuất!");
    navigate("/login");
    setDropdownOpen(false);
    setUser(null);
  };

  const handleChooseFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setShowCamera(true);
    setShowResults(false);
  };

  const handleConfirm = () => {
    if (!preview) {
      alert("Bạn chưa chọn ảnh!");
      return;
    }
    setShowResults(true);
  };

  const productList = [
    { id: 1, name: "Quần 1", price: 150000, image: quan1 },
    { id: 2, name: "Quần 2", price: 200000, image: quan2 },
    { id: 3, name: "Quần 3", price: 180000, image: quan3 },
    { id: 4, name: "Quần 4", price: 220000, image: quan4 },
    { id: 5, name: "Quần 5", price: 250000, image: quan5 },
    { id: 6, name: "Quần 6", price: 300000, image: quan6 },
  ];

  return (
    <header className="bg-[#f8e6c1] border-b-2 border-[#8b5a1e] px-4 py-2 flex flex-col sm:flex-row justify-between items-start shadow-sm sticky top-0 z-50 text-sm">
      {/* Logo + Menu + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
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
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="cameraFileInput"
            onChange={handleChooseFile}
          />
          <div className="flex gap-2 items-center">
            <label
              htmlFor="cameraFileInput"
              className="cursor-pointer text-[#8b5a1e] hover:text-[#a76d2b] flex items-center gap-1"
            >
              <Camera size={20} />
            </label>
            <button
              type="submit"
              className="bg-[#8b5a1e] text-white px-3 py-1 text-xs rounded-full hover:bg-[#a76d2b]"
            >
              Tìm
            </button>
          </div>
        </form>

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
      </div>

      {/* Cart + User */}
      <div className="flex items-center gap-2 relative mt-2 sm:mt-0">
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
              <User size={14} />{" "}
              <span className="hidden sm:inline">{user.username}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                <div className="p-4 border-b">
                  <p className="font-semibold">{user.username}</p>
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
            <User size={14} /> <span className="hidden sm:inline">Đăng nhập</span>
          </button>
        )}
      </div>

    {showCamera && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col sm:flex-row shadow-lg">
      
      {/* Sidebar preview ảnh */}
      <div className="flex flex-col items-center gap-3 p-4 border-b sm:border-b-0 sm:border-r border-gray-200 sm:w-1/3">
        <h2 className="text-lg font-bold mb-2 text-center w-full">Tìm kiếm bằng hình ảnh</h2>
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-64 object-contain border rounded mb-2"
          />
        )}
        <div className="flex gap-2">
          {!showResults && (
            <button
              onClick={handleConfirm}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Xác nhận
            </button>
          )}
          <button
            onClick={() => setShowCamera(false)}
            className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </div>

      {/* Danh sách gợi ý sản phẩm */}
      {showResults && (
        <div className="p-4 flex-1 overflow-auto">
          <h3 className="font-semibold text-[#4b3b27] text-lg mb-3">Sản phẩm gợi ý</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-[#f0d9a6] overflow-hidden hover:shadow-md transition-all cursor-pointer"
                onClick={() => {
                  setShowCamera(false); // đóng modal khi click sản phẩm
                  navigate(`/product/${item.id}`);
                }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2">
                  <h4 className="font-semibold text-[#4b3b27] text-sm truncate">{item.name}</h4>
                  <p className="text-[#8b5a1e] font-bold text-xs mt-1">
                    {item.price.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  </div>
)}


    </header>
  );
}
