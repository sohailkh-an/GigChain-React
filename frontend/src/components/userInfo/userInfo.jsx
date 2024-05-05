"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome {session?.user?.name}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
