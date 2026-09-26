"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { registerService } from '@/lib/services/authService';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerService(formData);
      toast.success(response.message || 'Account created successfully!');

      const destination = redirectTo ? decodeURIComponent(redirectTo) : '/';

      setTimeout(() => {
        router.push(destination);
      }, 1000);
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card border border-border/60 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome to the professional poster generation platform
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-input border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email or Phone</label>
              <input
                type="text"
                name="emailOrPhone"
                required
                placeholder="example@gmail.com or mobile number"
                value={formData.emailOrPhone}
                onChange={handleChange}
                className="w-full bg-input border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-input border border-border/80 rounded-xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-btn font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:opacity-95 transition-opacity disabled:opacity-50 text-center cursor-pointer border-0 text-white flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
                </>
              ) : (
                'Register'
              )}
            </button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              href={redirectTo ? `/login?redirect=${encodeURIComponent(redirectTo)}` : '/login'} 
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}