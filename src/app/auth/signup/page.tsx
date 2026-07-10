"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeSlash, At, ShieldKeyhole, Person } from "@gravity-ui/icons";
import { authClient, signUp } from "@/lib/auth-client";

export default function SignupPage() {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");



  const handleSignup = async (e: React.FormEvent) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    if(password !== confirmPassword){
      setError("Passwords do not match.");
      return;
    }


    setIsLoading(true);


    try {

      const { error: authError } = await signUp.email({

        name,
        email,
        password,

        callbackURL:"/",

      });


      if(authError){

        setError(authError.message || "Unable to create account.");

      }else{

        setSuccess("Account created successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

      }


    } catch {

      setError("Something went wrong. Please try again.");

    } finally {

      setIsLoading(false);

    }

  };



  const handleGoogleSignup = async()=>{

    await authClient.signIn.social({

      provider:"google",
      callbackURL:"/",

    });

  };



  return (

    <div className="min-h-screen flex">


      {/* LEFT */}

      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-blue-950 via-cyan-950 to-teal-900 relative overflow-hidden">


        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl"/>


        <Link href="/" className="flex items-center gap-3 z-10">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 flex items-center justify-center text-2xl">
            🏠
          </div>


          <span className="text-3xl font-black text-white">
            RoomFinder
          </span>

        </Link>



        <div className="z-10 space-y-6">

          <h1 className="text-5xl font-black text-white leading-tight">

            Start your journey
            <span className="block text-cyan-300">
              to a better home.
            </span>

          </h1>


          <p className="text-white/70 text-lg max-w-md">

            Join thousands of users who discover,
            connect, and find their ideal living spaces.

          </p>



          <div className="space-y-4 pt-6">

            {[
              "Find verified rooms easily",
              "Connect with trusted owners",
              "Save your favorite places",
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





      {/* RIGHT FORM */}


      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">


        <div className="w-full max-w-sm">


          {/* Mobile logo */}

          <div className="flex items-center gap-3 mb-8 lg:hidden">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              🏠
            </div>

            <span className="text-2xl font-black">
              RoomFinder
            </span>

          </div>




          <div className="mb-7">

            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Join RoomFinder and find your next home
            </p>

          </div>




          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full h-12 rounded-xl border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm font-medium"
          >

            <span className="font-bold">
              G
            </span>

            Continue with Google

          </button>



          <div className="flex items-center gap-3 my-6">

            <div className="flex-1 h-px bg-gray-100"/>

            <span className="text-xs text-gray-400">
              or register with email
            </span>

            <div className="flex-1 h-px bg-gray-100"/>

          </div>




          <form onSubmit={handleSignup} className="space-y-4">


            {/* Name */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <div className="flex items-center gap-2 h-12 px-4 mt-2 rounded-xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-cyan-400">

                <Person size={16} className="text-gray-400"/>

                <input
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="flex-1 bg-transparent outline-none text-sm"
                />

              </div>

            </div>




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


              <div className="flex items-center gap-2 h-12 px-4 mt-2 rounded-xl border border-gray-200 bg-gray-50">

                <ShieldKeyhole size={16} className="text-gray-400"/>


                <input
                  type={showPassword ? "text":"password"}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Create password"
                  required
                  className="flex-1 bg-transparent outline-none text-sm"
                />


                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                >

                  {showPassword ? <EyeSlash size={16}/> : <Eye size={16}/>}

                </button>


              </div>

            </div>





            {/* Confirm Password */}

            <div>

              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>


              <div className="flex items-center gap-2 h-12 px-4 mt-2 rounded-xl border border-gray-200 bg-gray-50">


                <ShieldKeyhole size={16} className="text-gray-400"/>


                <input
                  type={showConfirmPassword ? "text":"password"}
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className="flex-1 bg-transparent outline-none text-sm"
                />


                <button
                  type="button"
                  onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                >

                  {showConfirmPassword ? <EyeSlash size={16}/> : <Eye size={16}/>}

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

              {isLoading ? "Creating Account..." : "Create Account"}

            </button>


          </form>




          <p className="text-center text-sm text-gray-500 mt-6">

            Already have an account?{" "}

            <Link
              href="/auth/signin"
              className="font-semibold text-cyan-600 hover:text-cyan-700"
            >
              Sign In
            </Link>

          </p>



        </div>


      </div>


    </div>

  );
}