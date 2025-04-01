"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/superbaseClient";
import { User } from "@supabase/supabase-js";
import Header from "@/app/components/dashboard/Header";
import "./dashboard.css";

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
    <div className="dashboard-container">
      <Header 
        user={{ 
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          image: user.user_metadata?.avatar_url
        }} 
      />
      <main className="dashboard-main">
        {/* Dashboard content will go here */}
      </main>
    </div>
  ) : null;
}
