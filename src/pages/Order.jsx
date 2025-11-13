import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const shippingFee = 20000;

  useEffect(() => {
    // Lấy giỏ hàng và thông tin profile
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const profile = JSON.parse(localStorage.getItem("profile")) || {};
    setForm({
      name: profile.name || "",
      phone: profile.phone || "",
      address: profile.address || "",
    });
  }, []);

  // Tính tổng đơn
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "GIAM10") {
      setDiscount(10);
    } else {
      setDiscount(0);
      alert("Mã khuyến mãi không hợp lệ.");
    }
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    // Tạo đơn hàng mới
    const newOrder = {
      id: Date.now().toString(), // dùng string cho an toàn khi so sánh
      items: cart,
      total: subtotal,
      name: form.name,
      phone: form.phone,
      address: form.address,
      status: "Đang xử lý",
      createdAt: new Date().toISOString(),
    };

    // Lưu vào localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

    // Thông báo
    alert(`✅ Đặt hàng thành công!\nMã đơn hàng: ${newOrder.id}`);

    // Xóa giỏ hàng
    localStorage.removeItem("cart");

    // 👉 Chuyển thẳng tới trang chi tiết đơn hàng
    navigate(`/order/${newOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col items-center p-6">
      <div className="flex items-center justify-between w-full max-w-5xl mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[#8b5a1e] hover:text-[#a76d2b] transition"
        >
          <ArrowLeft size={18} /> Quay lại
        </button>
        <h1 className="font-bold text-[#4b3b27]">Xác nhận đơn hàng</h1>
        <div className="w-24"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl p-6 flex flex-col md:flex-row gap-8">
        {/* Danh sách sản phẩm */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-[#4b3b27] mb-4">Sản phẩm của bạn</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Giỏ hàng trống.</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div
                  key={item.id + item.size + item.color}
                  className="flex items-center justify-between border-b border-[#f0d9a6] pb-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div>
                      <h3 className="font-medium text-[#4b3b27]">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} |{" "}
                        <span
                          className="inline-block w-3 h-3 rounded-full border ml-1"
                          style={{ backgroundColor: item.color }}
                        ></span>
                      </p>
                      <p className="text-sm text-[#8b5a1e] font-medium">SL: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#4b3b27] font-semibold">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thông tin và tổng tiền */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#4b3b27] mb-4">Thông tin giao hàng</h2>
              <button
                onClick={() => navigate("/profile")}
                className="text-sm text-[#8b5a1e] hover:text-[#a76d2b]"
              >
                Chỉnh sửa
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[#4b3b27]">Họ và tên: {form.name}</p>
              <p className="text-[#4b3b27]">SĐT: {form.phone}</p>
              <p className="text-[#4b3b27]">Địa chỉ: {form.address}</p>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-[#4b3b27]">Mã khuyến mãi</label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Nhập mã"
                  className="flex-1 border border-[#e6c97b] rounded-lg p-2 text-sm"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-[#f8e6c1] text-[#4b3b27] rounded-lg hover:bg-[#fde68a] text-sm font-medium"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-[#f0d9a6] pt-4 space-y-2">
            <p className="flex justify-between text-sm text-[#4b3b27]">
              <span>Tạm tính:</span>
              <span>{subtotal.toLocaleString("vi-VN")}₫</span>
            </p>
            {discount > 0 && (
              <p className="flex justify-between text-sm text-green-600">
                <span>Giảm giá ({discount}%):</span>
                <span>-{discountAmount.toLocaleString("vi-VN")}₫</span>
              </p>
            )}
            <p className="flex justify-between text-sm text-[#4b3b27]">
              <span>Phí vận chuyển:</span>
              <span>{shippingFee.toLocaleString("vi-VN")}₫</span>
            </p>
            <p className="flex justify-between font-semibold text-[#8b5a1e] text-base">
              <span>Tổng cộng:</span>
              <span>{total.toLocaleString("vi-VN")}₫</span>
            </p>

            <button
              onClick={handleOrder}
              className="w-full mt-4 bg-[#8b5a1e] text-white py-3 rounded-lg hover:bg-[#a76d2b] transition text-sm font-medium"
            >
              Xác nhận đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
