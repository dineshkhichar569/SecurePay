// import React  from "react";
// import { motion } from "framer-motion";
// import Sidebar from "../components/Sidebar";
// import { AlertTriangle } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";


// const recentTransactions = [
//   {
//     date: "Jul 22",
//     desc: "Netflix Subscription",
//     amount: "₹499.00",
//     status: "✅",
//   },
//   { date: "Jul 21", desc: "Amazon Order", amount: "₹2,450.00", status: "✅" },
//   { date: "Jul 20", desc: "Zomato", amount: "₹780.00", status: "⚠️" },
//   { date: "Jul 19", desc: "ATM Withdrawal", amount: "₹5,000.00", status: "✅" },
//   { date: "Jul 18", desc: "Flipkart", amount: "₹1,200.00", status: "✅" },
// ];

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
// };

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   useEffect(()=>{
//     const fetchDashboardData = async()=> {
//       try{
//         const token = localStorage.getItem("token")
//         console.log("token from localstorage", token)
//         const res = await axios.get("http://localhost:8000/api/v1/students/dashboard", {
//           headers:{
//             Authorization:`Bearer ${token}`, 
//           },
//         });
        
//         console.log(res.data)
//         setDashboardData(res.data.data);
//       }
//       catch(err){
//         console.error("Error fetching dashboard data:", err)
//       }

//     };
//     fetchDashboardData();
//   },[]);
//   if(!dashboardData){
//     return <div className="text-center p-10 text-gray-500">Loading dashboard...</div>;
//   }

//   const {walletBalance, trustScore, recentTransactions} = dashboardData;


//   return (
//     <>
//       <Sidebar />
//       <div className="min-h-screen md:p-10 md:w-[calc(100%-208px)] absolute right-0 top-16 bg-gradient-to-tr from-white via-slate-100 to-white text-gray-800 overflow-hidden">
//         <motion.main
//           className="flex-1 px-4 sm:px-10 py-8 space-y-10 relative z-10"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Some Text Section */}
//           <motion.div variants={cardVariants} className="text-left max-w-2xl">
//             <p className="inline-block bg-black/5 px-3 py-1 text-xs rounded-full border border-black/10 font-medium uppercase tracking-wider">
//               Smart Finance Dashboard
//             </p>
//             <h1 className="text-5xl sm:text-6xl font-bold leading-tight mt-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//               Redefining Payment
//               <br />
//               Trust, Safety & Control
//             </h1>
//             <p className="text-gray-600 mt-5 text-lg">
//               Empowering students and institutions with a sleek, animated fee
//               dashboard designed for security, transparency, and growth.
//             </p>
//           </motion.div>

//           {/* Animated background blur circles */}
//           <motion.div
//             className="fixed -z-10 inset-0 pointer-events-none"
//             animate={{ opacity: [0.7, 1, 0.7] }}
//             transition={{ repeat: Infinity, duration: 6 }}
//           >
//         <div className="fixed w-56 h-56 bg-pink-300/30 blur-2xl rounded-full bottom-0 right-0 animate-pulse"></div>
//         <div className="fixed w-72 h-72 bg-purple-400/30 blur-3xl rounded-full top-1/4 left-1/3 animate-pulse"></div>
//         <div className="fixed w-72 h-72 bg-purple-300/30 blur-3xl rounded-full top-0 left-0 animate-pulse"></div>
//         <div className="fixed w-56 h-56 bg-pink-400/30 blur-2xl rounded-full bottom-1/4 right-2/3 animate-pulse"></div>
//           </motion.div>

//           {/* Wallet Card Section */}
//           <motion.div
//             variants={cardVariants}
//             className="grid grid-cols-1 md:grid-cols-2 gap-8"
//           >
//             {/* Wallet Card */}
//             <div className="rounded-3xl p-6 bg-white shadow-md border border-gray-100 relative">
//               <h2 className="text-md font-semibold text-gray-500">
//                 Wallet Balance
//               </h2>
//               <p className="text-4xl font-bold text-gray-900 mt-2 tracking-tight">
//                 ₹78,450.00
//               </p>
//               <p className="text-xs text-gray-400 mt-1">Updated just now</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.96 }}
//                 className="bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 shadow-sm transition-all duration-300 text-gray-800 font-semibold text-lg absolute right-3 bottom-3"
//               >
//                 Add ₹
//               </motion.button>
//             </div>

//             {/* Trust Score Card */}
//             <div className="rounded-3xl p-6 bg-white shadow-md border border-gray-100">
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Trust Score:{" "}
//                 <span className="font-bold text-green-600">82/100</span>
//               </h3>
//               <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                 <motion.div
//                   className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
//                   initial={{ width: "0%" }}
//                   animate={{ width: "82%" }}
//                   transition={{ duration: 1.2, ease: "easeInOut" }}
//                 />
//               </div>
//             </div>
//           </motion.div>

//           {/* Risk Alert Section */}
//           <motion.div
//             variants={cardVariants}
//             className="flex items-center gap-3 bg-red-100 border border-red-300 text-red-700 rounded-xl px-5 py-4 shadow-sm"
//           >
//             <AlertTriangle className="w-5 h-5" />
//             <div className="text-sm">
//               <strong>Alert:</strong> Last transaction flagged as suspicious.
//               <button className="ml-3 text-red-600 underline text-xs hover:text-red-800 transition">
//                 Review Now
//               </button>
//             </div>
//           </motion.div>

//           {/* Recent Transactions section */}
//           <motion.div
//             variants={cardVariants}
//             className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
//           >
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               Recent Transactions
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm border-separate border-spacing-y-2 text-gray-700">
//                 <thead className="text-gray-500 text-xs uppercase">
//                   <tr>
//                     <th className="pb-2 text-left">Date</th>
//                     <th className="pb-2 text-left">Description</th>
//                     <th className="pb-2 text-left">Amount</th>
//                     <th className="pb-2 text-left">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentTransactions.map((t, idx) => (
//                     <motion.tr
//                       key={idx}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: idx * 0.1 }}
//                       className="bg-gray-50 hover:bg-gray-100 transition rounded-xl"
//                     >
//                       <td className="py-3 px-2">{t.date}</td>
//                       <td className="py-3 px-2">{t.desc}</td>
//                       <td className="py-3 px-2 font-medium text-gray-900">
//                         {t.amount}
//                       </td>
//                       <td className="py-3 px-2 text-lg">{t.status}</td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         </motion.main>
//       </div>
//     </>
//   );
// };

// export default Dashboard;


import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token from localstorage", token);
        const res = await axios.get("http://localhost:8000/api/v1/students/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);
        setDashboardData(res.data.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div className="text-center p-10 text-gray-500">Loading dashboard...</div>;
  }

  const { walletBalance, trustScore, recentTransactions, isLastTransactionFraud } = dashboardData;

  return (
    <>
      <Sidebar />
      <div className="min-h-screen md:p-10 md:w-[calc(100%-208px)] absolute right-0 top-16 bg-gradient-to-tr from-white via-slate-100 to-white text-gray-800 overflow-hidden">
        <motion.main
          className="flex-1 px-4 sm:px-10 py-8 space-y-10 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Intro Section */}
          <motion.div variants={cardVariants} className="text-left max-w-2xl">
            <p className="inline-block bg-black/5 px-3 py-1 text-xs rounded-full border border-black/10 font-medium uppercase tracking-wider">
              Smart Finance Dashboard
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mt-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Redefining Payment
              <br />
              Trust, Safety & Control
            </h1>
            <p className="text-gray-600 mt-5 text-lg">
              Empowering students and institutions with a sleek, animated fee
              dashboard designed for security, transparency, and growth.
            </p>
          </motion.div>

          {/* Background blur */}
          <motion.div
            className="fixed -z-10 inset-0 pointer-events-none"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            <div className="fixed w-56 h-56 bg-pink-300/30 blur-2xl rounded-full bottom-0 right-0 animate-pulse"></div>
            <div className="fixed w-72 h-72 bg-purple-400/30 blur-3xl rounded-full top-1/4 left-1/3 animate-pulse"></div>
            <div className="fixed w-72 h-72 bg-purple-300/30 blur-3xl rounded-full top-0 left-0 animate-pulse"></div>
            <div className="fixed w-56 h-56 bg-pink-400/30 blur-2xl rounded-full bottom-1/4 right-2/3 animate-pulse"></div>
          </motion.div>

          {/* Wallet & Trust Score Cards */}
          <motion.div variants={cardVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl p-6 bg-white shadow-md border border-gray-100 relative">
              <h2 className="text-md font-semibold text-gray-500">
                Wallet Balance
              </h2>
              <p className="text-4xl font-bold text-gray-900 mt-2 tracking-tight">
                ₹{walletBalance?.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-400 mt-1">Updated just now</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 shadow-sm transition-all duration-300 text-gray-800 font-semibold text-lg absolute right-3 bottom-3"
              >
                Add ₹
              </motion.button>
            </div>

            <div className="rounded-3xl p-6 bg-white shadow-md border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Trust Score:{" "}
                <span className="font-bold text-green-600">{trustScore}/100</span>
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${trustScore}%` }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Risk Alert Section */}
          {isLastTransactionFraud && (
            <motion.div
              variants={cardVariants}
              className="flex items-center gap-3 bg-red-100 border border-red-300 text-red-700 rounded-xl px-5 py-4 shadow-sm"
            >
              <AlertTriangle className="w-5 h-5" />
              <div className="text-sm">
                <strong>Alert:</strong> Last transaction flagged as suspicious.
                <button className="ml-3 text-red-600 underline text-xs hover:text-red-800 transition">
                  Review Now
                </button>
              </div>
            </motion.div>
          )}

          {/* Recent Transactions */}
          <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Transactions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate border-spacing-y-2 text-gray-700">
                <thead className="text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="pb-2 text-left">Date</th>
                    <th className="pb-2 text-left">Description</th>
                    <th className="pb-2 text-left">Amount</th>
                    <th className="pb-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.length > 0 ? (
                    recentTransactions.map((t, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-50 hover:bg-gray-100 transition rounded-xl"
                      >
                        <td className="py-3 px-2">{t.date || "-"}</td>
                        <td className="py-3 px-2">{t.description || "-"}</td>
                        <td className="py-3 px-2 font-medium text-gray-900">₹{t.amount || 0}</td>
                        <td className="py-3 px-2 text-lg">{t.status || "✅"}</td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-400">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.main>
      </div>
    </>
  );
};

export default Dashboard;

