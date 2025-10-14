import React, { useState } from "react";
import { Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  // 🧾 Giỏ hàng mẫu (sau này bạn có thể thay bằng localStorage hoặc API)
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Áo thun nam basic",
      price: 199000,
      image: "https://via.placeholder.com/100x100?text=Áo+thun",
      quantity: 2,
    },
    {
      id: 2,
      name: "Quần jean xanh",
      price: 349000,
      image: "https://via.placeholder.com/100x100?text=Quần+jean",
      quantity: 1,
    },
  ]);

  // 🧮 Tổng tiền
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, value) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Number(value)) }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-[#8b5a1e] hover:text-[#a76d2b]"
        >
          <ArrowLeft size={18} /> Quay lại mua sắm
        </button>
        <h1 className="text-2xl font-bold text-[#4b3b27]">Giỏ hàng của bạn</h1>
        <div className="w-28"></div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          🛒 Giỏ hàng của bạn đang trống
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-[#f0d9a6]">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b last:border-none p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-[#4b3b27]">{item.name}</h3>
                    <p className="text-[#8b5a1e] font-medium">
                      {item.price.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className="w-14 border border-[#e6c97b] rounded px-1 text-center"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tổng kết */}
          <div className="mt-6 flex flex-col items-end gap-3">
            <p className="text-lg font-semibold text-[#4b3b27]">
              Tổng cộng:{" "}
              <span className="text-[#8b5a1e]">
                {total.toLocaleString("vi-VN")}₫
              </span>
            </p>
            <button className="px-6 py-3 bg-[#8b5a1e] text-white rounded-lg hover:bg-[#a76d2b]">
              Tiến hành thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}
