'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token') || localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; githubId: number };
      localStorage.setItem('token', token);
      // Fetch user data or proceed
    } catch (err) {
      router.push('/auth/login');
    }
  }, [router, searchParams]);

  return <div>Welcome to the Dashboard!</div>;
}