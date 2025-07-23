import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Menu,
  X,
  LayoutDashboard,
  CreditCard,
  Repeat,
  LifeBuoy,
} from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const Options = [
    {
      name: "Dashboard",
      goto: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Pay Now", goto: "/paynow", icon: <CreditCard size={18} /> },
    { name: "Transactions", goto: "/transactions", icon: <Repeat size={18} /> },
    { name: "Support", goto: "/support", icon: <LifeBuoy size={18} /> },
  ];

  return (
    <>
      <Navbar />

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-2 z-50 p-2 bg-white text-gray-800 rounded-full shadow-lg hover:scale-105 hover:bg-gray-100 transition md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-screen w-48 md:w-52 z-40 p-5 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        bg-gradient-to-br from-white via-slate-100 to-slate-200 border-r border-gray-200 shadow-xl rounded-r-2xl md:rounded-none`}
      >
        <nav className="flex flex-col gap-2">
          {Options.map(({ name, goto, icon }, i) => {
            const isActive = location.pathname === goto;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.43 + i * 0.13, type: "linear" }}
              >
                <Link
                  to={goto}
                  onClick={() => setIsOpen(false)} // Close sidebar only
                  className={`group flex items-center gap-3 px-4 py-2 rounded-lg font-medium relative transition-all duration-200 ${
                    isActive
                      ? "bg-white text-indigo-600 shadow-md"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-white"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-1 rounded-r bg-indigo-500 transition-transform origin-top ${
                      isActive
                        ? "scale-y-100"
                        : "scale-y-0 group-hover:scale-y-100"
                    }`}
                  />
                  <div className="text-indigo-500">{icon}</div>
                  {name}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </aside>
      
    </>
  );
}

export default Sidebar;
