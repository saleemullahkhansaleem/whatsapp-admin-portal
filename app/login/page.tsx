'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background dark:from-background dark:to-background flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary to-primary/80 rounded-full opacity-10 dark:opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-primary rounded-full opacity-10 dark:opacity-5 blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center font-bold text-primary-foreground text-lg">
                WA
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">WhatsApp</h1>
            <p className="text-muted-foreground">Broadcasting & Chatbot Portal</p>
          </div>

          {/* Login Form */}
          <form className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email or Username
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 pl-11 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-11 pr-11 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-muted-foreground">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary"
                />
                <span>Remember me</span>
              </label>
              <Link href="#" className="text-primary hover:text-primary/80 font-medium">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
            >
              Login
            </button>
          </form>

          {/* Footer Text */}
          <div className="text-center text-sm text-muted-foreground mt-6 pt-6 border-t border-border">
            Don&apos;t have an account? <span className="text-muted-foreground">Contact Admin</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>© 2024 WhatsApp Broadcasting Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
