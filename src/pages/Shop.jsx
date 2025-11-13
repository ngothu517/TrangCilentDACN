import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

import aoNu from "../assets/aonu.png";
import aoThun from "../assets/Aothun.png";
import aoSomi from "../assets/aosomi.png";
import aoSominam from "../assets/sominam.png";
import jeannam from "../assets/jeannam.png";
import damnu from "../assets/damnu.png";

export default function Shop() {
  const navigate = useNavigate();

  // 🧩 Danh mục cha / con
  const [categories] = useState([
    {
      id: 1,
      name: "Thời trang Nam",
      children: [
        { id: 11, name: "Áo thun" },
        { id: 12, name: "Quần jean" },
        { id: 13, name: "Áo khoác" },
      ],
    },
    {
      id: 2,
      name: "Thời trang Nữ",
      children: [
        { id: 21, name: "Đầm" },
        { id: 22, name: "Chân váy" },
      ],
    },
  ]);

  // 🧩 Dữ liệu sản phẩm thật (dùng ảnh local)
  const allProducts = [
    {
      id: 1,
      name: "Áo thun nam basic",
      price: 199000,
      image: aoThun,
      parent: "Thời trang Nam",
      category: "Áo thun",
      size: "M",
      color: "red",
    },
    {
      id: 2,
      name: "Áo sơ mi nữ trắng",
      price: 259000,
      image: aoSomi,
      parent: "Thời trang Nữ",
      category: "Đầm",
      size: "L",
      color: "white",
    },
    {
      id: 3,
      name: "Quần jean xanh",
      price: 349000,
      image: jeannam,
      parent: "Thời trang Nam",
      category: "Quần jean",
      size: "L",
      color: "blue",
    },
    {
      id: 4,
      name: "Áo khoác nam thời trang",
      price: 399000,
      image: aoSominam,
      parent: "Thời trang Nam",
      category: "Áo khoác",
      size: "XL",
      color: "black",
    },
    {
      id: 5,
      name: "Đầm nữ xòe xinh",
      price: 459000,
      image: damnu,
      parent: "Thời trang Nữ",
      category: "Đầm",
      size: "M",
      color: "pink",
    },
    {
      id: 6,
      name: "Áo kiểu nữ thanh lịch",
      price: 329000,
      image: aoNu,
      parent: "Thời trang Nữ",
      category: "Chân váy",
      size: "S",
      color: "green",
    },
  ];

  // 🧩 Trạng thái lọc
  const [filters, setFilters] = useState({
    parentCategory: "",
    childCategory: "",
    sizes: [],
    colors: [],
  });

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const availableSizes = ["S", "M", "L", "XL"];
  const availableColors = [
    { name: "red", class: "bg-red-500" },
    { name: "blue", class: "bg-blue-500" },
    { name: "green", class: "bg-green-500" },
    { name: "pink", class: "bg-pink-400" },
    { name: "black", class: "bg-black" },
    { name: "white", class: "bg-white border" },
  ];

  // 🧩 Toggle size / màu
  const toggleSize = (size) =>
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));

  const toggleColor = (color) =>
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));

  // 🧩 Áp dụng lọc
  const applyFilters = () => {
    let result = allProducts;
    if (filters.parentCategory)
      result = result.filter((p) => p.parent === filters.parentCategory);
    if (filters.childCategory)
      result = result.filter((p) => p.category === filters.childCategory);
    if (filters.sizes.length > 0)
      result = result.filter((p) => filters.sizes.includes(p.size));
    if (filters.colors.length > 0)
      result = result.filter((p) => filters.colors.includes(p.color));

    setFilteredProducts(result);
  };

  const resetFilters = () => {
    setFilters({ parentCategory: "", childCategory: "", sizes: [], colors: [] });
    setFilteredProducts(allProducts);
  };

  // Thêm sản phâmstorage)
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = currentCart.find((item) => item.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("🛒 Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-[#fff8dc] min-h-screen">
      {/*thanh lọc */}
      <aside className="md:w-1/5 w-full bg-white border border-[#f0d9a6] rounded-xl shadow-sm p-4 space-y-6">
        <h2 className="text-lg font-bold text-[#4b3b27] mb-2">Bộ lọc</h2>

        {/* Danh mục cha/con */}
        <div className="space-y-3">
          <div>
            <label className="font-medium text-sm mb-1 block">
              Danh mục cha
            </label>
            <select
              value={filters.parentCategory}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  parentCategory: e.target.value,
                  childCategory: "",
                })
              }
              className="w-full border rounded-md p-2 text-sm bg-white"
            >
              <option value="">-- Chọn danh mục cha --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium text-sm mb-1 block">
              Danh mục con
            </label>
            <select
              value={filters.childCategory}
              onChange={(e) =>
                setFilters({ ...filters, childCategory: e.target.value })
              }
              disabled={!filters.parentCategory}
              className="w-full border rounded-md p-2 text-sm bg-white disabled:bg-gray-100"
            >
              <option value="">-- Chọn danh mục con --</option>
              {filters.parentCategory &&
                categories
                  .find((cat) => cat.name === filters.parentCategory)
                  ?.children.map((child) => (
                    <option key={child.id} value={child.name}>
                      {child.name}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        {/* Size */}
        <div>
          <h3 className="font-semibold text-[#4b3b27] mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const selected = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-2 py-1 text-xs border rounded-md transition ${
                    selected
                      ? "bg-[#f8e6c1] border-[#8b5a1e] ring-2 ring-[#8b5a1e]"
                      : "hover:bg-yellow-50"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Màu sắc */}
        <div>
          <h3 className="font-semibold text-[#4b3b27] mb-2">Màu sắc</h3>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => {
              const selected = filters.colors.includes(color.name);
              return (
                <span
                  key={color.name}
                  onClick={() => toggleColor(color.name)}
                  className={`w-6 h-6 rounded-full border cursor-pointer transition-all transform ${color.class} ${
                    selected
                      ? "ring-2 ring-[#8b5a1e] scale-110"
                      : "hover:scale-105"
                  }`}
                ></span>
              );
            })}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex flex-col gap-2">
          <button
            onClick={applyFilters}
            className="w-full bg-[#f8e6c1] text-[#4b3b27] py-2 rounded-md hover:bg-[#fde68a] font-medium text-sm transition"
          >
            Áp dụng lọc
          </button>
          <button
            onClick={resetFilters}
            className="w-full bg-gray-100 text-gray-600 py-2 rounded-md hover:bg-gray-200 text-sm transition"
          >
            Đặt lại
          </button>
        </div>
      </aside>

      {/* dah sách sảnphẩm */}
<main className="flex-1">
  {filteredProducts.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {filteredProducts.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg border border-[#f0d9a6] overflow-hidden hover:shadow-md transition-all cursor-pointer"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-3">
            <h4 className="font-semibold text-[#4b3b27] text-sm truncate">
              {item.name}
            </h4>
            <p className="text-[#8b5a1e] font-bold text-xs mt-1">
              {item.price.toLocaleString("vi-VN")}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-center mt-10">
      Không có sản phẩm phù hợp
    </p>
  )}
</main>


    </div>
  );
}
