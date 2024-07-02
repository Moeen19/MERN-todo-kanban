"use server";
import registerUser from "@/components/RegisterUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Logout from "@/components/LogoutBtn";
import Todos from "@/components/Todos";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  const getTodos = async () => {
    if (token) {
      const res = await fetch("https://mern-todo-kanban-production.up.railway.app/todos", {
        method: "GET",
        headers: { Cookie: cookies().toString() },
        credentials: "include",
      });
      if (res.status !== 200) {
        redirect("/login");
      }
      const data = await res.json();
      console.log(data, "---asdf-");
      return data;
    } else {
      redirect("/login");
    }
  };

  let todos = [];
  todos = await getTodos();

  return (
    <main className="">
      <div className="flex items-center justify-between">
        <h1 className="text-white pl-[110px] font-semibold text-[62px] mx-auto w-fit">
          Todo Kanban
        </h1>
        <Logout />
      </div>
      <Todos todos={todos} token={token} />
    </main>
  );
}
