import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="flex justify-between items-center bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold">Task Manager</h1>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}