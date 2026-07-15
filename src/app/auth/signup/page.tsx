"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Eye, EyeSlash, At, ShieldKeyhole, Person } from "@gravity-ui/icons";
import { authClient, signUp } from "@/lib/auth-client";

type Role = "tenant" | "owner";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};


export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState<Role>("tenant");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        userRole: role,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Unable to create account.");
      } else if (data) {
        setSuccess("Account created successfully!");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SECTION */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-blue-950 via-cyan-950 to-teal-900"
      >
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <Link href="/" className="flex items-center gap-3 z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 flex items-center justify-center text-2xl">
            🏠
          </div>

          <span className="text-3xl font-black text-white">RoomFinder</span>
        </Link>

        <div className="z-10 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="text-5xl font-black text-white leading-tight"
          >
            Find your perfect
            <span className="block text-cyan-300">living space.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            className="text-white/70 text-lg max-w-md"
          >
            Join RoomFinder and connect with people searching or offering rooms.
          </motion.p>

          <div className="space-y-4 pt-6">
            {[
              "Discover verified rooms",
              "Connect with trusted owners",
              "Manage your room journey easily",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.08, ease: "easeOut" }}
                className="flex items-center gap-3 text-white/70 text-sm"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs z-10">
          © {new Date().getFullYear()} RoomFinder. All rights reserved.
        </p>
      </motion.div>

      {/* RIGHT SECTION */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 flex items-center justify-center px-6 py-12 bg-white"
      >
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 text-sm mt-2">Join RoomFinder today</p>
          </div>

          <motion.button
            type="button"
            onClick={handleGoogleSignup}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 font-medium text-sm"
          >
            <span className="font-bold">G</span>
            Continue with Google
          </motion.button>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-100 flex-1" />
            <span className="text-xs text-gray-400">or register with email</span>
            <div className="h-px bg-gray-100 flex-1" />
          </div>

          <motion.form
            onSubmit={handleSignup}
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Name */}
            <motion.div variants={fieldVariants}>
              <label className="text-sm font-medium text-gray-700">Full Name</label>

              <div className="flex items-center gap-2 h-12 px-4 mt-2 rounded-xl border border-gray-200 bg-gray-50 transition-colors focus-within:bg-white focus-within:border-cyan-400">
                <Person width={16} height={16} className="text-gray-400" />

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fieldVariants}>
              <label className="text-sm font-medium text-gray-700">Email Address</label>

              <div className="flex items-center gap-2 h-12 px-4 mt-2 rounded-xl border border-gray-200 bg-gray-50 transition-colors focus-within:bg-white focus-within:border-cyan-400">
                <At width={16} height={16} className="text-gray-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
            </motion.div>

            {/* Role */}
            <motion.div variants={fieldVariants}>
              <label className="text-sm font-medium text-gray-700">Account Type</label>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <motion.button
                  type="button"
                  onClick={() => setRole("tenant")}
                  whileTap={{ scale: 0.97 }}
                  className={`h-12 rounded-xl border font-semibold text-sm transition-colors ${
                    role === "tenant"
                      ? "border-cyan-500 bg-cyan-50 text-cyan-600"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  🏠 Tenant
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setRole("owner")}
                  whileTap={{ scale: 0.97 }}
                  className={`h-12 rounded-xl border font-semibold text-sm transition-colors ${
                    role === "owner"
                      ? "border-cyan-500 bg-cyan-50 text-cyan-600"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  🔑 Owner
                </motion.button>
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={fieldVariants}>
              <label className="text-sm font-medium text-gray-700">Password</label>

              <div className="flex items-center gap-2 h-12 px-4 mt-2 rounded-xl border border-gray-200 bg-gray-50 transition-colors focus-within:bg-white focus-within:border-cyan-400">
                <ShieldKeyhole width={16} height={16} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  required
                  className="flex-1 bg-transparent outline-none text-sm"
                />

                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileTap={{ scale: 0.85, rotate: -8 }}
                >
                  {showPassword ? (
                    <EyeSlash width={16} height={16} />
                  ) : (
                    <Eye width={16} height={16} />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={fieldVariants}>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>

              <div className="flex items-center gap-2 h-12 px-4 mt-2 rounded-xl border border-gray-200 bg-gray-50 transition-colors focus-within:bg-white focus-within:border-cyan-400">
                <ShieldKeyhole width={16} height={16} className="text-gray-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className="flex-1 bg-transparent outline-none text-sm"
                />

                <motion.button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  whileTap={{ scale: 0.85, rotate: -8 }}
                >
                  {showConfirmPassword ? (
                    <EyeSlash width={16} height={16} />
                  ) : (
                    <Eye width={16} height={16} />
                  )}
                </motion.button>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg overflow-hidden"
                >
                  {error}
                </motion.p>
              )}

              {success && (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm text-green-600 bg-green-50 px-4 py-3 rounded-lg overflow-hidden"
                >
                  {success}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              variants={fieldVariants}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white font-semibold shadow-lg disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </motion.form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-semibold text-cyan-600">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}