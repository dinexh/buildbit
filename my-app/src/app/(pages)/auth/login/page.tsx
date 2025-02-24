'use client';

import { useState } from 'react';
import Demo from '../../../assets/demokanban.png';
import Image from 'next/image';
import { FaGoogle, FaGithub, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import './page.css';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
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
              <button type="submit" className="signInButton">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
            <div className="divider">
              <span>Or</span>
            </div>
            <div className="socialButtons">
              <button className="googleButton">
                <FaGoogle /> Continue with Google
              </button>
              <button className="githubButton">
                <FaGithub /> Continue with GitHub
              </button>
            </div>
            <p className="signupPrompt">
              {isLogin ? "Don't have an account? " : "Already have one? "}
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