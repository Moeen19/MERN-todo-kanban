"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "@/components/Login";
// import { cookies } from "next/headers";

export default function login() {
  // let token;
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = localStorage?.getItem("jwt")
    setToken(token)
  }, [token])
  // console.log(token, 'actual token')
  // const cookieStore = cookies();
  // const token = cookieStore.get('jwt');

  return (
    <Login token={token} />
  );
}
