import React, { useState, useEffect } from "react";
import { Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id, size, color) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size && item.color === color)
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, size, color, value) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.size === size && item.color === color
        ? { ...item, quantity: Math.max(1, Number(value)) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/order");
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-[#8b5a1e] hover:text-[#a76d2b] transition"
        >
          <ArrowLeft size={18} /> Quay lại mua sắm
        </button>
        <h1 className="text-xl font-bold text-[#4b3b27]">Giỏ hàng của bạn</h1>
        <div className="w-28"></div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">🛒 Giỏ hàng của bạn đang trống</div>
      ) : (
        <div className="min-h-screen bg-[#FFF8E7] flex  justify-center md:p-8">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 border border-[#f0d9a6]">
            {cart.map((item) => (
              <div
                key={item.id + item.size + item.color}
                className="flex items-center justify-between border-b border-[#f0d9a6] last:border-none py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border border-[#f0d9a6]"
                  />
                  <div>
                    <h3 className="font-semibold text-[#4b3b27]">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} |{" "}
                      <span
                        className="inline-block w-3 h-3 rounded-full border ml-1"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </p>
                    <p className="text-sm text-[#8b5a1e] font-medium">
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
                      handleQuantityChange(item.id, item.size, item.color, e.target.value)
                    }
                    className="w-14 border border-[#e6c97b] rounded px-1 text-center"
                  />
                  <button
                    onClick={() => handleRemove(item.id, item.size, item.color)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {/* Tổng tiền */}
            <div className="mt-6 flex flex-col items-end gap-3">
              <p className="text-lg font-semibold text-[#4b3b27]">
                Tổng cộng: <span className="text-[#8b5a1e]">{total.toLocaleString("vi-VN")}</span>
              </p>
              <button
                onClick={handleCheckout}
                className="px-6 py-3 bg-[#8b5a1e] text-white rounded-lg hover:bg-[#a76d2b] transition"
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
