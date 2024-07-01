import Link from "next/link";
import Login from "@/components/Login";
import { cookies } from "next/headers";

export default function login() {
  const cookieStore = cookies();
  const token = cookieStore.get('jwt');

  return (
    <Login token={token} />
  );
}
