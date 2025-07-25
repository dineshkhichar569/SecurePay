// File: MakePayment.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const paymentOptions = ["UPI", "Wallet", "Card"];

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const MakePayment = () => {
  const location = useLocation();
  const prefilledAmount = location.state?.amount || "";

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(prefilledAmount);
  const [method, setMethod] = useState("");
  const [showSelector, setShowSelector] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [saveRecipient, setSaveRecipient] = useState(false);
  const selectorRef = useRef(null);

  const riskScore = Math.floor(Math.random() * 100);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8f9ff] to-[#ffffff] flex items-center justify-center px-6 py-12">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-80 h-80 bg-pink-300 blur-[120px] rounded-full top-[-50px] left-[-40px] animate-float1" />
        <div className="absolute w-[30rem] h-[30rem] bg-purple-200 blur-[150px] rounded-full top-[20%] left-[40%] animate-float2" />
        <div className="absolute w-64 h-64 bg-yellow-200 blur-[100px] rounded-full bottom-[-40px] right-[-30px] animate-float3" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-purple-50/10 pointer-events-none" />
      </div>

      <button className="absolute top-10 left-10">
        <Link
          to="/paynow"
          className="flex items-center gap-2 text-orange-500 hover:text-orange-700 text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Back to PayNow
        </Link>
      </button>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="w-full z-50 max-w-xl bg-white border border-purple-100 rounded-3xl p-8 shadow-2xl space-y-6"
      >
        <motion.h2
          variants={itemVariant}
          className="text-3xl font-bold text-gray-800 tracking-tight"
        >
          🚀 Make a Payment
        </motion.h2>

        {/* Student ID */}
        <motion.div variants={itemVariant} className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">Student ID</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter Student ID"
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 bg-gray-50"
          />
        </motion.div>

        {/* Amount */}
        <motion.div variants={itemVariant} className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="₹ Enter amount"
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 bg-gray-50"
          />
        </motion.div>

        {/* Payment Method Selector */}
        <motion.div variants={itemVariant} ref={selectorRef} className="relative">
          <label className="text-sm text-gray-600 font-medium block mb-1">
            Payment Method
          </label>
          <div
            onClick={() => setShowSelector(!showSelector)}
            className="w-full p-3 bg-white border border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 transition shadow-sm"
          >
            {method || "Select Method"}
          </div>

          <AnimatePresence>
            {showSelector && (
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-2 w-full bg-white/70 backdrop-blur-lg border border-gray-200 rounded-xl shadow-xl overflow-hidden"
              >
                {paymentOptions.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => {
                      setMethod(opt);
                      setShowSelector(false);
                    }}
                    className={`px-4 py-3 text-sm cursor-pointer transition-all ${
                      method === opt
                        ? "bg-purple-50 font-semibold text-purple-700"
                        : "hover:bg-purple-100"
                    }`}
                  >
                    {opt}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Save recipient option */}
        <motion.div
          variants={itemVariant}
          className="flex items-center gap-2 mt-1 text-sm text-gray-700"
        >
          <input
            type="checkbox"
            checked={saveRecipient}
            onChange={() => setSaveRecipient(!saveRecipient)}
            className="accent-purple-600"
          />
          <span>Save recipient for future payments</span>
        </motion.div>

        {/* Proceed Button */}
        <motion.div variants={itemVariant}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowReview(true)}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-purple-700 transition-all"
          >
            Proceed to Review
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReview && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              className="bg-white w-[90%] max-w-md p-6 rounded-3xl shadow-2xl space-y-5"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🧾 Review Transaction
              </h3>

              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Recipient:</strong> {recipient}</p>
                <p><strong>Amount:</strong> ₹{amount}</p>
                <p><strong>Method:</strong> {method}</p>
              </div>

              {/* Risk Analysis */}
              <div className="pt-4">
                <p className="text-sm text-gray-600 font-medium mb-1">AI-Powered Fraud Risk</p>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      riskScore < 40
                        ? "bg-green-400"
                        : riskScore < 75
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${riskScore}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-700 font-semibold mt-1">
                  {riskScore}% Risk -{" "}
                  {riskScore > 70 ? "⚠️ Suspicious Recipient" : "✅ Fair"}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowReview(false)}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                >
                  <XCircle size={18} />
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowReview(false);
                    alert("✅ Payment processed securely!");
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 font-medium"
                >
                  <CheckCircle size={18} />
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MakePayment;