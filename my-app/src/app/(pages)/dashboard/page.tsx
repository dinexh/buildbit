"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/superbaseClient";
import { User } from "@supabase/supabase-js";
export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/auth/login";
      } else {
        setUser(user);
      }
    };

    getUser();
  }, []);

  return user ? (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={() => supabase.auth.signOut().then(() => window.location.href = "/auth/login")}>Logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
