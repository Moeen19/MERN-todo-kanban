"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "@/components/Login";
// import { cookies } from "next/headers";

export default function login() {
  let token;
  
  useEffect(() => {
    token = typeof window ? localStorage.getItem('jwt') : null;
    console.log('pagejsToken,', token)
  }, [])

  return (
    <Login token={token} />
  );
}
