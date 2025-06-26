"use client"

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      setError("Invalid credentials (demo only)");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-dm-sans text-dark-brown">
          Email
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-white border-border-brown text-dark-brown font-dm-sans"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 text-sm font-dm-sans text-dark-brown">
          Password
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="bg-white border-border-brown text-dark-brown font-dm-sans"
          disabled={loading}
        />
      </div>
      <Button type="submit" className="w-full mt-2" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
        <div>
          <p className="text-red-500 text-sm font-dm-sans">{error}</p>
          <p className="text-sm mt-2">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-grey-600 underline hover:text-blue-800"
            >
              Sign up
            </a>
          </p>
        </div>
    </form>
  );
}