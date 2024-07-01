"use client";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch("https://mern-todo-kanban.vercel.app/users/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data.msg);
        router.push("/login");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  
  const logFunc = () => {
    toast.loading("Logging Out");
    setTimeout(handleLogout, 2000)
  }
  return (
    <div>
      <button
        onClick={logFunc}
        className="py-2 px-10 hover:bg-opacity-80 transition duration-500 ease-out cursor-pointer font-bold border-[1px] text-[#2B187D] rounded-[6px] border-solid border-black bg-[white]"
      >
        Logout
      </button>
    </div>
  );
}
