import React from "react";
import { useNavigate } from "react-router-dom";
import bannerImage from "../assets/women.png"; 

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col">
      {/* Banner */}
      <section className="relative bg-gradient-to-r from-[#fde68a] via-[#fce7a0] h-[400px] overflow-hidden">
        

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto h-full px-6 gap-6">
          {/* Text */}
          <div className="text-center md:text-left flex-1 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#4b3b27] mb-4 leading-snug">
              Thời Trang Mới Nhất 2025
            </h1>
            <p className="text-[#6b4e1c] text-sm md:text-base mb-6 max-w-lg">
              Phong cách hiện đại – Giá hợp lý – Mặc đẹp mỗi ngày
            </p>
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-3">
              <button
                onClick={() => navigate("/shop")}
                className="px-6 py-3 bg-[#8b5a1e] text-white rounded-lg font-semibold hover:bg-[#a76d2b] transition-all shadow-md text-sm md:text-base"
              >
                Mua ngay
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-6 py-3 bg-[#fde68a] text-[#4b3b27] rounded-lg font-semibold hover:bg-[#fcd34d] transition-all shadow-md text-sm md:text-base"
              >
                Tìm hiểu thêm
              </button>
            </div>
            <p className="mt-6 text-xs md:text-sm text-[#8b5a1e] italic">
              “Phong cách của bạn, sự tự tin của bạn”
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center md:justify-end h-full">
            <img
              src={bannerImage}
              alt="Fashion Banner"
              className="h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Giới thiệu ngắn về shop */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#4b3b27] mb-4 md:mb-6">Về FashionShop</h2>
        <p className="text-[#6b4e1c] max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
          FashionShop mang đến cho bạn những bộ sưu tập thời trang hiện đại, phù hợp với mọi hoàn cảnh – từ đi học, đi chơi đến công sở. Chúng tôi cam kết chất lượng, kiểu dáng trẻ trung và giá cả hợp lý.
        </p>
      </section>
    </div>
  );
}
