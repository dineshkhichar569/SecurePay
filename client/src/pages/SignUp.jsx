import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    studentId: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v1/students/register", {
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        studentId: formData.studentId,
        password: formData.password
      });

      console.log(res.data);
      alert("Registration successful!");
      navigate("/login"); // or OTP verification page
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const inputData = [
    { label: "Full Name", type: "text", name: "fullname", placeholder: "Sunny" },
    { label: "Student Email", type: "email", name: "email", placeholder: "student@university.edu" },
    { label: "Phone No.", type: "tel", name: "phone", placeholder: "+91 8167307255" },
    { label: "Student ID", type: "text", name: "studentId", placeholder: "STU123456" },
    { label: "Password", type: "password", name: "password", placeholder: "••••••••" },
    { label: "Confirm Password", type: "password", name: "confirmPassword", placeholder: "••••••••" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-cyan-500 opacity-30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden"
      >
        {/* Left */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden md:flex flex-col justify-center p-10 bg-white/5 border-r border-white/10"
        >
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">
            Zero-Fraud Payment
          </h2>
          <p className="text-gray-300 text-sm">
            Join the new era of secure, AI-powered student payments. Our fraud-proof system keeps your transactions clean and traceable.
          </p>
          <div className="mt-10 text-sm text-gray-400">
            Built for students. Designed for trust.
          </div>
        </motion.div>

        {/* Right (Form) */}
        <div className="p-8 md:p-10 text-white">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-6 text-center"
          >
            Create Account
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {inputData.map(({ label, ...rest }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="relative"
              >
                <label className="text-xs font-medium text-gray-300 mb-1 block tracking-wide">
                  {label}
                </label>
                <input
                  required
                  value={formData[rest.name]}
                  onChange={handleChange}
                  {...rest}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition-all duration-200 shadow-sm"
                />
              </motion.div>
            ))}

            {error && <div className="text-red-400 text-sm">{error}</div>}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all rounded-lg p-2 font-semibold text-black mt-4 shadow-lg"
            >
              Register
            </motion.button>
          </form>

          <div className="text-center text-sm mt-6 text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;