"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    // Simulate sign-up
    setTimeout(() => {
      setLoading(false);
      setError("Sign-up is demo only. No account created.");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-dm-sans text-dark-brown">
          Name
        </label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="bg-white border-border-brown text-dark-brown font-dm-sans"
          disabled={loading}
        />
      </div>
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
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="bg-white border-border-brown text-dark-brown font-dm-sans"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block mb-1 text-sm font-dm-sans text-dark-brown">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="bg-white border-border-brown text-dark-brown font-dm-sans"
          disabled={loading}
        />
      </div>
      {error && <p className="text-red-500 text-sm font-dm-sans">{error}</p>}
      <Button type="submit" className="w-full mt-2" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
