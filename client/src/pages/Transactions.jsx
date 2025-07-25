// import React from "react";
// import { motion } from "framer-motion";
// import Sidebar from "../components/Sidebar";
// import { History } from "lucide-react";

// const transactionData = [
//   {
//     date: "Jul 22",
//     time: "10:45 AM",
//     type: "Subscription",
//     desc: "Netflix",
//     amount: "₹499.00",
//     status: "Success",
//   },
//   {
//     date: "Jul 21",
//     time: "3:15 PM",
//     type: "Shopping",
//     desc: "Amazon",
//     amount: "₹2,450.00",
//     status: "Success",
//   },
//   {
//     date: "Jul 20",
//     time: "8:20 PM",
//     type: "Food",
//     desc: "Zomato",
//     amount: "₹780.00",
//     status: "Flagged",
//   },
//   {
//     date: "Jul 19",
//     time: "6:00 PM",
//     type: "Cash",
//     desc: "ATM Withdrawal",
//     amount: "₹5,000.00",
//     status: "Success",
//   },
//   {
//     date: "Jul 18",
//     time: "1:10 PM",
//     type: "Shopping",
//     desc: "Flipkart",
//     amount: "₹1,200.00",
//     status: "Success",
//   },
// ];

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } },
// };

// const Transaction = () => {
  
//   return (
//     <>
//       <Sidebar />
//       <div className="min-h-screen bg-gradient-to-tr from-white via-slate-100 to-slate-200 text-gray-800 md:pl-[208px] pt-20 overflow-hidden relative">

//         {/* for animated background */}
//         <div className="fixed w-56 h-56 bg-pink-300/30 blur-2xl rounded-full bottom-0 right-0 animate-pulse"></div>
//         <div className="fixed w-72 h-72 bg-purple-400/30 blur-3xl rounded-full top-1/4 left-1/3 animate-pulse"></div>
//         <div className="fixed w-72 h-72 bg-purple-300/30 blur-3xl rounded-full top-0 left-0 animate-pulse"></div>
//         <div className="fixed w-56 h-56 bg-pink-400/30 blur-2xl rounded-full bottom-1/4 right-2/3 animate-pulse"></div>

//         <motion.main
//           className="px-6 sm:px-12 py-8 space-y-10 relative z-10"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* heading texts */}
//           <motion.div variants={cardVariants} className="text-left max-w-4xl">
//             <p className="inline-flex items-center gap-2 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200 font-semibold uppercase tracking-wide">
//               <History className="w-4 h-4" /> Transaction History
//             </p>
//             <h1 className="text-4xl sm:text-5xl font-bold mt-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//               Full Payment Records
//             </h1>
//             <p className="mt-3 text-gray-600 text-lg">
//               Track all your recent transactions with clear status and detail.
//             </p>
//           </motion.div>

//           {/* Transactions Histrory Table */}
//           <motion.div
//             variants={cardVariants}
//             className="bg-white shadow-xl border border-gray-200 rounded-3xl p-6 overflow-auto"
//           >
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               All Transactions
//             </h2>
//             <table className="w-full text-sm text-left border-separate border-spacing-y-2">
//               <thead className="text-xs text-gray-500 uppercase">
//                 <tr>
//                   <th className="pb-2">Date</th>
//                   <th className="pb-2">Time</th>
//                   <th className="pb-2">Type</th>
//                   <th className="pb-2">Description</th>
//                   <th className="pb-2">Amount</th>
//                   <th className="pb-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {transactionData.map((tx, i) => (
//                   <motion.tr
//                     key={i}
//                     className="bg-white hover:bg-indigo-50 transition rounded-xl"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.1 }}
//                   >
//                     <td className="py-3 px-3">{tx.date}</td>
//                     <td className="py-3 px-3">{tx.time}</td>
//                     <td className="py-3 px-3">{tx.type}</td>
//                     <td className="py-3 px-3">{tx.desc}</td>
//                     <td className="py-3 px-3 font-medium text-gray-800">
//                       {tx.amount}
//                     </td>
//                     <td
//                       className={`py-3 px-3 text-sm font-semibold ${
//                         tx.status === "Success"
//                           ? "text-green-600"
//                           : "text-red-500"
//                       }`}
//                     >
//                       {tx.status}
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </motion.div>

//         </motion.main>
        
//       </div>
//     </>
//   );
// };

// export default Transaction;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { History } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8000/api/v1/students/transaction-history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };

  const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString();
  };

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gradient-to-tr from-white via-slate-100 to-slate-200 text-gray-800 md:pl-[208px] pt-20 overflow-hidden relative">

        {/* Animated background */}
        <div className="fixed w-56 h-56 bg-pink-300/30 blur-2xl rounded-full bottom-0 right-0 animate-pulse"></div>
        <div className="fixed w-72 h-72 bg-purple-400/30 blur-3xl rounded-full top-1/4 left-1/3 animate-pulse"></div>
        <div className="fixed w-72 h-72 bg-purple-300/30 blur-3xl rounded-full top-0 left-0 animate-pulse"></div>
        <div className="fixed w-56 h-56 bg-pink-400/30 blur-2xl rounded-full bottom-1/4 right-2/3 animate-pulse"></div>

        <motion.main
          className="px-6 sm:px-12 py-8 space-y-10 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={cardVariants} className="text-left max-w-4xl">
            <p className="inline-flex items-center gap-2 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200 font-semibold uppercase tracking-wide">
              <History className="w-4 h-4" /> Transaction History
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Full Payment Records
            </h1>
            <p className="mt-3 text-gray-600 text-lg">
              Track all your recent transactions with clear status and detail.
            </p>
          </motion.div>

          {/* Table */}
          <motion.div
            variants={cardVariants}
            className="bg-white shadow-xl border border-gray-200 rounded-3xl p-6 overflow-auto"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              All Transactions
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : transactions.length === 0 ? (
              <p className="text-gray-500">No transactions found.</p>
            ) : (
              <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                <thead className="text-xs text-gray-500 uppercase">
                  <tr>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Description</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, i) => (
                    <motion.tr
                      key={tx._id || i}
                      className="bg-white hover:bg-indigo-50 transition rounded-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <td className="py-3 px-3">{formatDate(tx.createdAt)}</td>
                      <td className="py-3 px-3">{formatTime(tx.createdAt)}</td>
                      <td className="py-3 px-3">{tx.type}</td>
                      <td className="py-3 px-3">{tx.description || "—"}</td>
                      <td className="py-3 px-3 font-medium text-gray-800">
                        ₹{tx.amount}
                      </td>
                      <td
                        className={`py-3 px-3 text-sm font-semibold ${
                          tx.status === "success"
                            ? "text-green-600"
                            : tx.status === "failed"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {tx.status}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        </motion.main>
      </div>
    </>
  );
};

export default Transaction;
