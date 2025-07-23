"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Key, Mail, User, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState("");
  const [className, setClassName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const password = `${className}-${rollNumber}`;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-navy">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg-dark">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-navy">
            School Bus Tracker
            </h1>
            <p className="text-gray-500">Welcome back, parent!</p>
        </div>

        {error && <p className="p-3 text-red-700 bg-red-100 rounded-lg">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <Mail className="absolute text-gray-400 left-3 top-3" size={20} />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Student's Gmail"
              className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-yellow-dark focus:border-yellow-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <User className="absolute text-gray-400 left-3 top-3" size={20} />
            <input
              id="className"
              name="className"
              type="text"
              required
              placeholder="Class Name (e.g., 5A)"
              className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-yellow-dark focus:border-yellow-dark"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
          <div className="relative">
            <Key className="absolute text-gray-400 left-3 top-3" size={20} />
            <input
              id="rollNumber"
              name="rollNumber"
              type="text"
              required
              placeholder="Roll Number (e.g., 21)"
              className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-yellow-dark focus:border-yellow-dark"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition-colors rounded-lg bg-navy hover:bg-navy-light"
            >
              <LogIn className="mr-2" size={20} />
              Log in
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-gray-300" />
          <span className="absolute px-2 text-sm text-gray-500 bg-white">Or</span>
        </div>
        <div>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="w-5 h-5 mr-2"/>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
