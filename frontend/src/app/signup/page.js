"use client"
import Link from "next/link";
import RegisterUser from "@/components/RegisterUser";
// import { cookies } from "next/headers";
// import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";

export default function signup() {
  // const cookieStore = cookies();
  // const token = cookieStore.get("jwt");
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = localStorage?.getItem("jwt")
    setToken(token)

  }, [token]);

  return (
    <div>
      <RegisterUser token={token} />
    </div>
  );
}
