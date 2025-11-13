import React from "react";
import { Facebook, Instagram, Phone, Mail, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import ảnh
import aoNu from "../assets/aonu.png";
import aoThun from "../assets/Aothun.png";
import aoSomi from "../assets/aosomi.png";
import aoSominam from "../assets/sominam.png";
import jeannam from "../assets/jeannam.png";
import damnu from "../assets/damnu.png";

const products = [
  { id: 1, name: "Áo thun nam basic", price: "199.000₫", image: aoThun },
  { id: 2, name: "Áo sơ mi nữ trắng", price: "259.000₫", image: aoSomi },
  { id: 3, name: "Quần jean xanh", price: "349.000₫", image: aoNu },
  { id: 4, name: "Áo hoodie nam", price: "399.000₫", image: aoSominam },
  { id: 5, name: "Váy nữ xinh", price: "459.000₫", image: jeannam },
  { id: 6, name: "Quần short nữ", price: "199.000₫", image: damnu },
];

export default function Footer() {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <footer className="bg-[#f8e6c1] border-t-2 border-[#8b5a1e] text-[#4b3b27]">
      {/* = SẢN PHẨM NỔI BẬT */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <h3 className="text-2xl font-bold text-center mb-5">
          Sản phẩm nổi bật
        </h3>

        <Slider {...settings}>
          {products.map((item) => (
            <div key={item.id} className="px-2">
              <div className="bg-white border border-[#f0d9a6] rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="w-full rounded-lg aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* 📄 Thông tin */}
                <div className="p-2 flex flex-col gap-1">
                  <h4 className="font-semibold text-[#4b3b27] text-sm truncate">
                    {item.name}
                  </h4>
                  <p className="text-[#8b5a1e] font-bold text-xs">{item.price}</p>

                  {/* 🔘 Nút hành động */}
                  <div className="flex justify-between items-center mt-1">
                    <button
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="bg-[#f8e6c1] text-[#4b3b27] px-2 py-[3px] rounded-md hover:bg-[#fde68a] text-[10px] transition"
                    >
                      Xem
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* FOOTE */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột 1 */}
        <div>
          <h2 className="text-lg font-bold mb-3">FashionShop</h2>
          <p className="text-sm text-[#6b4e1c]">
            Shop thời trang hiện đại – mang đến phong cách và sự tự tin cho bạn
            mỗi ngày.
          </p>
        </div>

        {/* Cột 2 */}
        <div>
          <h2 className="text-lg font-bold mb-3">Liên hệ</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> 0123 456 789
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> contact@fashionshop.vn
            </li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h2 className="text-lg font-bold mb-3">Theo dõi chúng tôi</h2>
          <div className="flex gap-3">
            <a
              href="#"
              className="p-2 rounded-full bg-white border border-[#e6c97b] hover:bg-[#fde68a] transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white border border-[#e6c97b] hover:bg-[#fde68a] transition"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e6c97b] text-center text-sm py-3 bg-[#fff8dc]">
        © 2025 FashionShop. All rights reserved.
      </div>
    </footer>
  );
}
