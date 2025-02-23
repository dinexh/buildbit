'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import '../forgotpassword/page.css';

export default function ResetPassword() {
  const [step, setStep] = useState('otp'); // 'otp' or 'reset'
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (otp === '123456') { // Demo OTP
      setStep('reset');
      setMessage('');
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setMessage('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessage('Password successfully reset!');
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);

    setIsLoading(false);
  };

  if (!token) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h1>Invalid Reset Link</h1>
          <p className="error-message">This password reset link is invalid or has expired.</p>
          <div className="auth-links">
            <a href="/auth/forgotpassword">Request a new reset link</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Reset Password</h1>
        {step === 'otp' ? (
          <form onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                placeholder="Enter 6-digit OTP"
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
            {message && <p className="error-message">{message}</p>}
          </form>
        ) : (
          <form onSubmit={handlePasswordReset}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Enter new password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Confirm new password"
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
            {message && <p className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</p>}
          </form>
        )}
        <div className="auth-links">
          <a href="/auth/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
} 