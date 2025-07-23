// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import faceIcon from "/face-id.svg";
// import fingerprintIcon from "/fingerprint.svg";

// export default function Login() {
//   return (
//     <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">

//       {/* for animation background */}
//       <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-80"/>
//       <div className="absolute top-[12%] left-[10%] w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-[5%] right-[8%] w-72 h-72 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
      

//       {/* AI Badge */}
//       <div className="absolute top-4 right-4 text-xs text-cyan-300 bg-white/10 px-4 py-1 rounded-full border border-cyan-400/20 shadow-md z-20 backdrop-blur-sm">
//         🛡️ AI-Powered Risk Monitoring
//       </div>

//       {/* Main Content */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8 }}
//         className="z-10 w-full max-w-md px-8 py-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)]"
//       >
//         {/* Secure Banner */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="mb-6 text-center text-sm text-cyan-300 tracking-wide"
//         >
//           🔒 Secure Login • Zero-Fraud AI Validation
//         </motion.div>

//         {/* Title */}
//         <motion.h2
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-center text-3xl font-extrabold text-white tracking-wide mb-6"
//         >
//           Welcome Back
//         </motion.h2>

//         {/* login Form */}
//         <form action="submit">
//           {/* Email */}
//           <motion.div
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="mb-5 relative"
//           >
//             <label className="text-sm text-white mb-1 block">
//               Email or Student ID
//             </label>
//             <input
//               type="text"
//               placeholder="you@example.edu"
//               required
//               className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-inner"
//             />
//             <div className="absolute right-3 top-10 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
//           </motion.div>

//           {/* Password */}
//           <motion.div
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="mb-6 relative"
//           >
//             <label className="text-sm text-white mb-1 block">Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               required
//               className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-inner"
//             />
//             <div className="absolute right-3 top-10 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
//           </motion.div>

//           {/* Login Button */}
//           <motion.div
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.53 }}
//               transition={{ duration: 0.2 }}
//               className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] transition"
//             >
//               Login Securely
//             </motion.button>
//           </motion.div>

//         </form>

//         {/* Divider for email or biometric */}
//         <div className="flex items-center gap-4 my-6">
//           <div className="flex-1 h-px bg-white/20" />
//           <span className="text-sm text-white/50">or</span>
//           <div className="flex-1 h-px bg-white/20" />
//         </div>

//         {/* for Biometric Login */}
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.63 }}
//           className="text-center"
//         >
//           <p className="text-xs text-gray-400 mb-4">
//             Biometric Login (Coming Soon)
//           </p>
//           <div className="flex justify-center gap-10">
//             {/* Face ID */}
//             <div className="group w-20 h-20 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner flex flex-col items-center justify-center transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-90 cursor-pointer">
//               <img
//                 src={faceIcon}
//                 alt="Face ID"
//                 className="w-8 h-8 opacity-70 group-hover:opacity-100 transition"
//               />
//               <span className="text-xs text-gray-400 mt-2 group-hover:text-cyan-400">
//                 Face ID
//               </span>
//             </div>

//             {/* Fingerprint */}
//             <div className="group w-20 h-20 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner flex flex-col items-center justify-center transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-90 cursor-pointer">
//               <img
//                 src={fingerprintIcon}
//                 alt="Fingerprint"
//                 className="w-8 h-8 opacity-70 group-hover:opacity-100 transition"
//               />
//               <span className="text-xs text-gray-400 mt-2 group-hover:text-cyan-400">
//                 Fingerprint
//               </span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Links to redirect forgot password and signup */}
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.73 }}
//           className="flex justify-between mt-6 text-sm text-cyan-400"
//         >
//           <Link to="/forgot-password" className="hover:underline">
//             Forgot Password?
//           </Link>
//           <Link to="/signup" className="hover:underline">
//             Create Account
//           </Link>
//         </motion.div>

//         {/* Trust Score title */}
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.83 }}
//           className="mt-8"
//         >
//           <div className="text-xs text-center text-gray-500">
//             🎖️ Trust Score: <span className="text-green-400">Verified</span>{" "}
//             (Gamified Security System)
//           </div>
//         </motion.div>


//       </motion.div>


//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import faceIcon from "/face-id.svg";
import fingerprintIcon from "/fingerprint.svg";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/students/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-80" />
      <div className="absolute top-[12%] left-[10%] w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[5%] right-[8%] w-72 h-72 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md px-8 py-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)]"
      >
        <div className="mb-6 text-center text-sm text-cyan-300 tracking-wide">
          🔒 Secure Login • Zero-Fraud AI Validation
        </div>
=======
        {/* Secure Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-center text-sm text-cyan-300 tracking-wide"
        >
          🔒 Secure Login • SecurePay AI Validation
        </motion.div>
        (Dashboard, Paynow, Transactions, Support Pages Done.)

        <h2 className="text-center text-3xl font-extrabold text-white tracking-wide mb-6">
          Welcome Back
        </h2>

        {/* ✅ FIXED FORM */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5 relative">
            <label className="text-sm text-white mb-1 block">
              Email 
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.edu"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-inner"
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="text-sm text-white mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-inner"
            />
          </div>

          {/* ✅ LOGIN BUTTON */}
          <div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.93 }}
              transition={{ duration: 0.2 }}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] transition"
            >
              Login Securely
            </motion.button>
          </div>
        </form>

        {/* Optional Error Message */}
        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-sm text-white/50">or</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Biometric login */}
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-4">
            Biometric Login (Coming Soon)
          </p>
          <div className="flex justify-center gap-10">
            <div className="group w-20 h-20 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-90 transition-all duration-300">
              <img src={faceIcon} alt="Face ID" className="w-8 h-8" />
              <span className="text-xs text-gray-400 mt-2">Face ID</span>
            </div>
            <div className="group w-20 h-20 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-90 transition-all duration-300">
              <img src={fingerprintIcon} alt="Fingerprint" className="w-8 h-8" />
              <span className="text-xs text-gray-400 mt-2">Fingerprint</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 text-sm text-cyan-400">
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
          <Link to="/signup" className="hover:underline">
            Create Account
          </Link>
        </div>

        <div className="mt-8 text-xs text-center text-gray-500">
          🎖 Trust Score: <span className="text-green-400">Verified</span>
        </div>
      </motion.div>
    </div>
  );
}


