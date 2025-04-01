'use client';

import { useState, FormEvent, useEffect } from 'react';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/superbaseClient';
import '../forgotpassword/page.css';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if we have a valid session
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        router.push('/auth/login');
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      toast.success('Password updated successfully!');
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
            <p>Please enter your new password below.</p>
            
            {error && <p className="error">{error}</p>}
            
            <form onSubmit={handleSubmit}>
              <div className="inputGroup">
                <label htmlFor="password">New Password</label>
                <div className="passwordInput">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    className="showPassword"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="inputGroup">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <div className="passwordInput">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    className="showPassword"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <button type="submit" className="signInButton" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
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