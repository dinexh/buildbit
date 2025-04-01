'use client';

import { useState, FormEvent } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/superbaseClient';
import './page.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/resetpassword`,
      });

      if (error) throw error;

      toast.success('Password reset instructions sent to your email!');
      router.push('/auth/login');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-component">
      <div className="auth-component-right">
        <div className="auth-component-right-in">
          <div className="formContainer">
            <div className="logo">
              <h1>BitBuild</h1>
              <button onClick={() => router.push('/')}>
                <FaArrowLeft /> Back to Home
              </button>
            </div>
            <h2>Reset Password</h2>
            <p>Enter your email address and we'll send you instructions to reset your password.</p>
            
            {error && <p className="error">{error}</p>}
            
            <form onSubmit={handleSubmit}>
              <div className="inputGroup">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <button type="submit" className="signInButton" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </form>
            
            <p className="signupPrompt">
              Remember your password?{' '}
              <button className="switchAuthMode" onClick={() => router.push('/auth/login')}>
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
