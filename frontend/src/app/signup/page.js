// "use client"
import Link from "next/link";
import RegisterUser from "@/components/RegisterUser";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";
import { useEffect } from "react";

export default function signup() {
  // const cookieStore = cookies();
  // const token = cookieStore.get("jwt");
  const token = localStorage?.getItem("jwt")
  useEffect(() => {
  }, [token]);

  return (
    <div>
      <RegisterUser token={token} />
    </div>
  );
}
