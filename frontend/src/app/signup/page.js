// "use client"
import Link from "next/link";
import RegisterUser from "@/components/RegisterUser";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";

export default function signup() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  return (
    <div>
      <RegisterUser token={token} />
    </div>
  );
}
