"use client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

function RegisterUser({ token }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [passMatch, setpassMatch] = useState(false);
  const router = useRouter();
  console.log(name);
  
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // redirect.push("/kekw")
    // console.log("user");
    if (password === ConfirmPassword) {
      const user = {
        name: name,
        email: email,
        password: password,
      };
      console.log(user);
      const res = await fetch("https://mern-todo-kanban.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.status === 201) {
        console.log("User Created");
        router.push("/login");
      }
    } else {
      setpassMatch(true);
    }
  };

  return (
    <div>
      <h1 className="text-white font-semibold text-[62px] mx-auto w-fit">
        Todo Kanban
      </h1>
      <div className="max-w-[450px] mx-auto mt-[8px] rounded-[8px] shadow-2xl shadow-gray-900 p-4 bg-white w-full">
        <h1 className="w-fit mx-auto font-bold  text-[32px]">Signup</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" flex gap-[18px] flex-col"
        >
          <div className="flex flex-col">
            <label className="font-semibold">Username:</label>
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setName(e.target.value)}
              className="p-1 rounded-[6px] border-solid border-[2px] border-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Email:</label>
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="p-1 rounded-[6px] border-solid border-[2px] border-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 rounded-[6px] border-solid border-[2px] border-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Confirm Password:</label>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-1 rounded-[6px] border-solid border-[2px] border-black"
            />
          </div>
          {passMatch && (
            <span className="text-[red]">Passwords don't match.</span>
          )}
          <div className="flex justify-between">
            <Link href="/login">
              <div className="py-2 px-10 border-[1px] text-white rounded-[6px] border-solid border-black bg-[#2B187D]">
                Cancel
              </div>
            </Link>
            <button className="py-2 px-10 border-[1px] text-white rounded-[6px] border-solid border-black bg-[#2B187D]">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
