'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { FaGoogle, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Demo from '../../../assets/demokanban.png';
import './page.css';
import { supabase } from '@/lib/superbaseClient';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast.success('Successfully logged in!');
        router.push('/dashboard');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            },
            emailRedirectTo: `${window.location.origin}/auth/login`,
          },
        });

        if (error) throw error;

        toast.success('Account created successfully! Please check your email for confirmation.');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="auth-component">
      <div className="auth-component-left">
        <div className="logo">
          <h1>BitBuild</h1>
          <button onClick={() => router.push('/')}>
            <FaArrowLeft /> Back to Home
          </button>
        </div>
        <h2>Build better, bit by bit.</h2>
        <p>An AI-powered companion for devs to ship faster.</p>
        <div className="demoImage">
          <Image src={Demo} alt="Dashboard Demo" width={600} height={400} />
        </div>
      </div>
      <div className="auth-component-right">
        <div className="auth-component-right-in">
          <div className="formContainer">
            <h2>{isLogin ? 'Log in' : 'Sign up'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="inputGroup">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              <div className="inputGroup">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <div className="passwordInput">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
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
              {!isLogin && (
                <div className="inputGroup">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="passwordInput">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
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
              )}
              {isLogin && (
                <div className="rememberMe">
                  <label onClick={() => router.push('/auth/forgotpassword')}>
                    Forgot password?
                  </label>
                </div>
              )}
              <button type="submit" className="signInButton" disabled={loading}>
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>
            <div className="divider">
              <span>Or</span>
            </div>
            <p className="signupPrompt">
              {isLogin ? "Don't have an account? " : 'Already have one? '}
              <button className="switchAuthMode" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}