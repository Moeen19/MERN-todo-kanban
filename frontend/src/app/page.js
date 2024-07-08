"use client";
import registerUser from "@/components/RegisterUser";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import Logout from "@/components/LogoutBtn";
import Todos from "@/components/Todos";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  // const cookieStore = cookies();
  // const token = cookieStore.get("jwt");
  // console.log(token, "kwlejafld;");
  const router = useRouter();
  const [token, setToken] = useState('')
  const [todos, setTodos] = useState([]);
  // let token;
  useEffect(() => {
    let tok = typeof window !== undefined ? localStorage.getItem("jwt") : null
    setToken(tok)
    console.log(token, "actual token");

    const getTodos = async () => {
      if (token) {
        const res = await fetch(
          "http://localhost:5000/todos/getTodos",
          {
            method: "POST",
            body: JSON.stringify({ token: token }),
            headers: { Cookie: token, "Content-type": "application/json" },
            credentials: "include",
          }
        );
        if (res.status !== 200) {
          router.push('/login')
        }
        const data = await res.json();
        setTodos(data);
        console.log(todos, data);
        return data;
      } else {
        // redirect("/login");
        // router.push("/login");
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
        <Logout todos={todos} token={token}/>
      </div>
      <Todos todos={todos} token={token} />
    </main>
  );
}
