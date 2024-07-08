"use client";
import registerUser from "@/components/RegisterUser";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import Logout from "@/components/LogoutBtn";
import Todos from "@/components/Todos";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  // const cookieStore = cookies();
  // const token = cookieStore.get("jwt");
  // console.log(token, "kwlejafld;");
  const router = useRouter();
  const [token, setToken] = useState("");
  const [todos, setTodos] = useState([]);
  // let token;
  // useEffect(() => {
  //   const fetchTok = () => {
  //     let tok = typeof window !== undefined ? localStorage.getItem("jwt") : null;
  //     setToken(tok);
  //   }
  //   fetchTok()
  //   if(!token) {
  //     router.push("/login");
  //   }
  // }, [router, token])
  useEffect(() => {
    router.refresh();
    console.log(token, "actual token");

    const getTodos = async () => {
      if (token === null) {
        router.push("/login");
      } else {
        const fetchTok = () => {
          let tok =
            typeof window !== undefined ? localStorage.getItem("jwt") : null;
          setToken(tok);
        };
        fetchTok();

        if (token) {
          const res = await fetch(
            "https://mern-todo-kanban-production.up.railway.app/todos/getTodos",
            {
              method: "POST",
              body: JSON.stringify({ token: token }),
              headers: { Cookie: token, "Content-type": "application/json" },
              credentials: "include",
            }
          );

          const data = await res.json();
          setTodos(data);
          console.log(todos, data);
          return data;
        } else if (!token) {
        }
      }
    };
    getTodos();
  }, [token]);

  useEffect(() => {
    console.log("Updated todos state:", todos);
  }, [todos]);

  return (
    <main className="">
      <div className="flex items-center justify-between">
        <h1 className="text-white pl-[110px] font-semibold text-[62px] mx-auto w-fit">
          Todo Kanban
        </h1>
        <Logout todos={todos} token={token} />
      </div>
      <Todos todos={todos} token={token} />
    </main>
  );
}
