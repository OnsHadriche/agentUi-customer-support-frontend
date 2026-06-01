import { useNavigate } from "react-router-dom";
import client from "../api/client";

export default function Navbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name");
  const tier = localStorage.getItem("tier");

  const handleLogout = async () => {
    try {
      await client.post("/auth/logout", {
        email: localStorage.getItem("email")
      });
    } finally {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-blue-600 font-bold text-lg">ShopAI</span>
        <span className="text-gray-400 text-sm">Support</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{userName}</span>
        {tier === "premium" && (
          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
            Premium
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}