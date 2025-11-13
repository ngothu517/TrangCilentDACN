import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Nếu có orderId → tìm đúng đơn đó
    // Nếu không có hoặc không tìm thấy → lấy đơn mới nhất
    let currentOrder =
      orders.find((o) => o.id && String(o.id) === String(orderId)) ||
      (orders.length > 0 ? orders[0] : null);

    setOrder(currentOrder);
  }, [orderId]);

  // Nếu chưa có đơn hàng nào trong localStorage
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8E7] p-6 gap-4">
        <p className="text-[#4b3b27] text-lg">Bạn chưa có đơn hàng nào.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-[#8b5a1e] text-white rounded-lg hover:bg-[#a76d2b] transition"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-[#4b3b27]">Chi tiết đơn hàng</h1>
        <p className="text-sm text-gray-600">Mã đơn hàng: {order.id}</p>
        <p className="text-sm text-gray-600">
          Ngày tạo: {new Date(order.createdAt).toLocaleString()}
        </p>
            <p className="text-sm text-[#4b3b27] font-medium">
          Trạng thái:{" "}
          <span
            className={`font-semibold px-3 py-1 rounded-full text-white text-sm
            ${
                  order.status === "Đang xử lý"
                  ? "bg-yellow-500"
                  :order.status === "Đã tiếp nhận"
                  ? "bg-blue-500"
                  : order.status === "Đang vận chuyển"
                  ? "bg-orange-500"
                  : order.status === "Giao thành công"
                  ? "bg-green-600"
                 : order.status === "Đã hủy"
                 ? "bg-red-600"
                 : "bg-gray-400"
              }`}
              >
            {order.status}
          </span>
    </p>


        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#f0d9a6]">
                <th className="py-2 px-3 text-sm text-[#4b3b27]">Sản phẩm</th>
                <th className="py-2 px-3 text-sm text-[#4b3b27]">Size</th>
                <th className="py-2 px-3 text-sm text-[#4b3b27]">Màu</th>
                <th className="py-2 px-3 text-sm text-[#4b3b27]">Số lượng</th>
                <th className="py-2 px-3 text-sm text-[#4b3b27]">Giá</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-b border-[#f0d9a6]">
                  <td className="py-2 px-3 text-sm text-[#4b3b27]">{item.name}</td>
                  <td className="py-2 px-3 text-sm text-[#4b3b27]">{item.size}</td>
                  <td className="py-2 px-3 text-sm">
                    <span
                      className="inline-block w-4 h-4 rounded-full border"
                      style={{ backgroundColor: item.color }}
                    ></span>
                  </td>
                  <td className="py-2 px-3 text-sm text-[#4b3b27]">{item.quantity}</td>
                  <td className="py-2 px-3 text-sm text-[#8b5a1e] font-semibold">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-right text-lg font-semibold text-[#8b5a1e]">
          Tổng cộng: {total.toLocaleString("vi-VN")}₫
        </p>

        <div className="flex justify-end">
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-[#8b5a1e] text-white rounded-lg hover:bg-[#a76d2b] transition"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
