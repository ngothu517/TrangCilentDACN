import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // thêm useNavigate

export default function Profile() {
  const navigate = useNavigate(); // thêm navigate
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    address: "",
  });
  const [editing, setEditing] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(savedUser);

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!user.fullName || !user.email || !user.address) {
      alert("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }
    localStorage.setItem("user", JSON.stringify(user));
    alert("✅ Cập nhật thông tin thành công!");
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl p-6 flex flex-col gap-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#4b3b27] mb-2">
          Xin chào, {user.fullName || user.username || "Khách hàng"}
        </h1>

        {/* Thông tin user */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-medium text-[#4b3b27]">Tên đăng nhập:</label>
            <p className="text-[#4b3b27]">{user.username}</p>

            <label className="text-sm font-medium text-[#4b3b27]">Họ và tên:</label>
            {editing ? (
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                className="border border-[#e6c97b] rounded-lg p-2 text-sm"
              />
            ) : (
              <p className="text-[#4b3b27]">{user.fullName}</p>
            )}

            <label className="text-sm font-medium text-[#4b3b27]">Email:</label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="border border-[#e6c97b] rounded-lg p-2 text-sm"
              />
            ) : (
              <p className="text-[#4b3b27]">{user.email}</p>
            )}

            <label className="text-sm font-medium text-[#4b3b27]">Địa chỉ:</label>
            {editing ? (
              <textarea
                name="address"
                value={user.address}
                onChange={handleChange}
                rows="3"
                className="border border-[#e6c97b] rounded-lg p-2 text-sm"
              />
            ) : (
              <p className="text-[#4b3b27]">{user.address}</p>
            )}

            <button
              onClick={() => {
                if (editing) handleSave();
                else setEditing(true);
              }}
              className="mt-4 bg-[#8b5a1e] text-white py-2 rounded-lg hover:bg-[#a76d2b] transition text-sm font-medium"
            >
              {editing ? "Lưu thông tin" : "Chỉnh sửa thông tin"}
            </button>
          </div>
        </div>

        {/* Danh sách đơn hàng */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#4b3b27] mb-3">Các đơn hàng của tôi</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="border border-[#f0d9a6] rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow hover:shadow-md transition"
                >
                  <div className="flex-1">
                    <p className="text-[#4b3b27] font-medium">Mã đơn: {order.id || index + 1}</p>
                    <p className="text-[#4b3b27] text-sm">
                      Số sản phẩm: {order.items.length} | Tổng: {order.total.toLocaleString("vi-VN")}₫
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/order/${order.id}`)}
                      className="px-3 py-1 bg-[#fde68a] text-[#4b3b27] rounded-lg hover:bg-[#fcd34d] text-sm font-medium transition"
                    >
                      Xem trạng thái
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
