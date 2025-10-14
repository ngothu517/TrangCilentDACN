import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

// import ảnh
import aoThun from "../assets/Aothun.png";
import aoSomi from "../assets/aosomi.png";
import aoNu from "../assets/aonu.png";

const products = [
  {
    id: 1,
    name: "Áo thun nam basic",
    price: "199.000₫",
    image: aoThun,
    subImages: [aoSomi, aoNu, aoThun, aoSomi],
  },
  {
    id: 2,
    name: "Áo sơ mi nữ trắng",
    price: "259.000₫",
    image: aoSomi,
    subImages: [aoThun, aoNu, aoSomi, aoThun],
  },
  {
    id: 3,
    name: "Quần jean xanh",
    price: "349.000₫",
    image: aoNu,
    subImages: [aoThun, aoSomi, aoNu, aoThun],
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["#FF0000", "#0000FF", "#FFFFFF", "#000000", "#FFD600"];

  const product = products.find((p) => p.id === parseInt(id)) || products[0];

  // Ảnh chính mặc định là ảnh gốc
  const displayImage = mainImage || product.image;

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-5xl gap-6 p-6">
        {/* Ảnh sản phẩm */}
        <div className="flex-1">
          <div className="w-full h-96 rounded-xl overflow-hidden border border-[#f0d9a6] shadow-sm">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Ảnh phụ */}
          <div className="flex gap-3 mt-4 justify-center flex-wrap">
            {product.subImages.slice(0, 4).map((img, i) => (
              <div
                key={i}
                onClick={() => setMainImage(img)}
                className={`w-24 h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                  displayImage === img
                    ? "border-[#d4a017] scale-105 shadow-md"
                    : "border-[#f0d9a6] hover:border-[#d4a017]"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name}-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#4b3b27]">{product.name}</h2>
            <p className="text-[#8b5a1e] font-semibold text-xl mt-1">{product.price}</p>
            <p className="text-[#4b3b27] text-sm md:text-base mt-3 leading-relaxed">
              Đây là mô tả sản phẩm ngắn gọn. Thêm thông tin chi tiết về chất liệu, hướng dẫn sử dụng
              và bảo quản sản phẩm để khách hàng hiểu rõ hơn.
            </p>

            {/* Chọn size */}
            <div className="mt-5">
              <h4 className="font-semibold text-[#4b3b27] mb-2">Kích thước</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-[#d4a017] text-white border-[#b58a14] ring-2 ring-[#fcd34d]"
                        : "bg-yellow-100 text-yellow-900 border-yellow-300 hover:bg-yellow-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Chọn màu */}
            <div className="mt-5">
              <h4 className="font-semibold text-[#4b3b27] mb-2">Màu sắc</h4>
              <div className="flex gap-3 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? "border-[#d4a017] ring-2 ring-[#d4a017] scale-110"
                        : "border-gray-300 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 px-4 py-3 bg-[#8b5a1e] text-white rounded-lg hover:bg-[#a76d2b] text-sm font-medium shadow">
              Thêm vào giỏ
            </button>
            <button className="flex-1 px-4 py-3 bg-[#fde68a] text-[#4b3b27] rounded-lg hover:bg-[#fcd34d] text-sm font-medium shadow">
              Mua ngay
            </button>
            <button className="p-3 rounded-full border border-[#8b5a1e] hover:bg-[#fde68a] shadow">
              <Heart size={18} className="text-[#8b5a1e]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
