import React from "react";
import { Bell, User, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 10 }}
      className="fixed top-0 w-full h-16 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg px-6 md:px-10 py-3"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* Logo */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/dashboard"
            className="ml-10 md:ml-0 text-white text-xl md:text-2xl font-bold tracking-wide flex items-center gap-1 hover:scale-105 transition-transform"
          >
            <span className="text-white">Secure</span>
            <span className="bg-white text-indigo-600 px-2 py-0.5 rounded-md text-sm">
              Pay
            </span>
          </Link>
        </motion.div>

        {/* Right Side of navbar */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-5 md:gap-6 text-white"
        >
          {/* Dark Mode Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-white/20 transition hover:scale-110"
          >
            <Moon className="w-5 h-5" />
          </motion.button>

          {/* Notification */}
          <motion.div className="relative" whileHover={{ scale: 1.1 }}>
            <button className="p-2 rounded-full hover:bg-white/20 transition hover:scale-110">
              <Bell className="w-5 h-5" />
            </button>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full" />
          </motion.div>

          {/* Profile */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-white/20 transition hover:scale-110"
          >
            <Link to="/setting">
              <User className="w-5 h-5" />
            </Link>
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;