// src/pages/About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#4b3b27] flex flex-col">
      {/* Header */}
      <section className="bg-[#fde68a] py-20 px-6 text-center relative">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Về FashionShop</h1>
        <p className="text-[#6b4e1c] text-base md:text-lg max-w-2xl mx-auto">
          Mang đến phong cách hiện đại và sự tự tin cho bạn mỗi ngày.
        </p>
      </section>

      {/* Sứ mệnh */}
      <section className="py-16 px-6 md:px-16 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Sứ mệnh của chúng tôi</h2>
        <p className="text-[#6b4e1c] text-base md:text-lg leading-relaxed">
          FashionShop cam kết cung cấp những bộ sưu tập thời trang hiện đại, chất lượng, giá cả hợp lý,
          phù hợp với mọi đối tượng khách hàng. Chúng tôi luôn cập nhật xu hướng mới nhất để bạn
          tự tin thể hiện phong cách riêng.
        </p>
      </section>

      {/* Tầm nhìn */}
      <section className="py-16 px-6 md:px-16 text-center max-w-4xl mx-auto bg-[#fff3c4] rounded-lg shadow-md my-8">
        <h2 className="text-3xl font-bold mb-6">Tầm nhìn</h2>
        <p className="text-[#6b4e1c] text-base md:text-lg leading-relaxed">
          Trở thành thương hiệu thời trang được yêu thích tại Việt Nam, mang đến trải nghiệm mua sắm
          trực tuyến và trực tiếp tiện lợi, nhanh chóng và thân thiện với khách hàng.
        </p>
      </section>

      {/* Button trở lại Home */}
      <div className="text-center py-12">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#8b5a1e] text-white rounded-lg hover:bg-[#a76d2b] font-medium transition"
        >
          Quay về Home
        </button>
      </div>
    </div>
  );
}
