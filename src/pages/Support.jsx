import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { Mail, MessageCircle, Phone } from "lucide-react";

const supportOptions = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email Us",
    desc: "support@securepay.in",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "Live Chat",
    desc: "Available 9AM – 9PM",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Call Support",
    desc: "+91 98765 43210",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const Support = () => {
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 md:pl-[208px] pt-20 px-6 sm:px-12 text-gray-800 relative overflow-hidden">


        {/* for animated background */}
        <div className="fixed w-56 h-56 bg-pink-300/30 blur-2xl rounded-full bottom-0 right-0 animate-pulse"/>
        <div className="fixed w-72 h-72 bg-purple-400/30 blur-3xl rounded-full top-1/4 left-1/3 animate-pulse"/>
        <div className="fixed w-72 h-72 bg-purple-300/30 blur-3xl rounded-full top-0 left-0 animate-pulse"/>
        <div className="fixed w-56 h-56 bg-pink-400/30 blur-2xl rounded-full bottom-1/4 right-2/3 animate-pulse" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="max-w-5xl mx-auto py-10 space-y-14 z-10 relative"
        >
          {/* Heading texts */}
          <motion.div variants={fadeUp} custom={0}>
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Customer Support
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Have a question or need help? We’re here for you.
            </p>
          </motion.div>

          {/* Contact Options to support the Student */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {supportOptions.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold">{item.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* fill the form to send a message */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Send us a message
            </h2>
            <form className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  className="w-full mt-1 p-3 rounded-xl border border-gray-300 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Support;
