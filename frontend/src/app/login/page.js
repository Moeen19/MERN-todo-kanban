"use client"
import Link from "next/link";
import { useEffect } from "react";
import Login from "@/components/Login";
// import { cookies } from "next/headers";

export default function login() {
  let token;
  useEffect(() => {
    token = localStorage.getItem("jwt")
  }, [])
  // const cookieStore = cookies();
  // const token = cookieStore.get('jwt');

  return (
    <Login token={token} />
  );
}
