"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { authClient, signIn } from "@/lib/auth-client";
// import { authClient, signIn } from "@/lib/auth-client";

export default function SigninPage() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");


  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {

      const { error: authError } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });


      if (authError) {
        setError(authError.message || "Invalid email or password.");
      } else {
        setSuccess("Signed in successfully!");
        setEmail("");
        setPassword("");
      }


    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };



  const handleGoogleSignIn = async () => {

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

  };



  return (

    <div className="min-h-screen flex">


      {/* LEFT PANEL */}

      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-blue-950 via-cyan-950 to-teal-900">


        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl"/>


        {/* Brand */}

        <Link href="/" className="flex items-center gap-3 z-10">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 flex items-center justify-center text-2xl shadow-lg">
            🏠
          </div>

          <span className="text-3xl font-black text-white">
            RoomFinder
          </span>

        </Link>



        <div className="relative z-10 space-y-6">


          <h1 className="text-5xl font-black text-white leading-tight">
            Find a place
            <span className="block text-cyan-300">
              you call home.
            </span>
          </h1>


          <p className="text-white/70 text-lg max-w-md">
            Discover verified rooms, connect with trusted owners,
            and find your perfect living space easily.
          </p>



          <div className="pt-8 space-y-4">

            {[
              "Verified room listings",
              "Connect directly with owners",
              "Safe and easy room search",
            ].map((item,index)=>(
              <div key={index} className="flex items-center gap-3 text-white/70 text-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400"/>
                {item}
              </div>
            ))}

          </div>


        </div>



        <p className="text-white/30 text-xs z-10">
          © {new Date().getFullYear()} RoomFinder. All rights reserved.
        </p>


      </div>





      {/* RIGHT PANEL */}


      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">


        <div className="w-full max-w-sm">


          {/* Mobile Logo */}

          <div className="flex items-center gap-3 mb-10 lg:hidden">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              🏠
            </div>

            <span className="text-2xl font-black">
              RoomFinder
            </span>

          </div>




          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Sign in to find your perfect room
            </p>

          </div>




          {/* Google */}

          <button
            onClick={handleGoogleSignIn}
            className="w-full h-12 rounded-xl border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm font-medium"
          >

            <span className="text-lg">
              G
            </span>

            Continue with Google

          </button>




          <div className="flex items-center gap-3 my-6">

            <div className="h-px bg-gray-100 flex-1"/>
            <span className="text-xs text-gray-400">
              or continue with email
            </span>
            <div className="h-px bg-gray-100 flex-1"/>

          </div>




          <form onSubmit={handleSignin} className="space-y-4">


            {/* Email */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>


              <div className="flex items-center gap-2 h-12 px-4 mt-2 rounded-xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-cyan-400">

                <At size={16} className="text-gray-400"/>


                <input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex-1 bg-transparent outline-none text-sm"
                />

              </div>

            </div>




            {/* Password */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Password
              </label>


              <div className="flex items-center gap-2 h-12 px-4 mt-2 rounded-xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-cyan-400">


                <ShieldKeyhole size={16} className="text-gray-400"/>


                <input
                  type={isVisible ? "text":"password"}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="flex-1 bg-transparent outline-none text-sm"
                />


                <button
                  type="button"
                  onClick={()=>setIsVisible(!isVisible)}
                >

                  {isVisible ? <EyeSlash size={16}/> : <Eye size={16}/>}

                </button>


              </div>


            </div>




            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
                {error}
              </p>
            )}


            {success && (
              <p className="text-sm text-green-600 bg-green-50 rounded-lg px-4 py-3">
                {success}
              </p>
            )}




            <button
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white font-semibold shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
            >

              {isLoading ? "Signing in..." : "Sign In"}

            </button>



          </form>




          <p className="text-center text-sm text-gray-500 mt-6">

            Don't have an account?{" "}

            <Link
              href="/auth/signup"
              className="font-semibold text-cyan-600 hover:text-cyan-700"
            >
              Create Account
            </Link>

          </p>



        </div>


      </div>


    </div>

  );
}