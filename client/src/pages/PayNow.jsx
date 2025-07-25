// import React from "react";
// import { motion } from "framer-motion";
// import Sidebar from "../components/Sidebar";

// const feeDetails = [
//   { label: "Tuition Fee", total: 50000, paid: 50000 },
//   { label: "Hostel Fee", total: 30000, paid: 25000 },
//   { label: "Mess Fee", total: 15000, paid: 15000 },
//   { label: "Exam Fee", total: 2000, paid: 0 },
//   { label: "Library Fee", total: 500, paid: 500 },
// ];

// const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;
// const totalDue = feeDetails.reduce(
//   (sum, fee) => sum + (fee.total - fee.paid),
//   0
// );
// const hasDues = totalDue > 0;

// const PayNow = () => {
//   const handlePayAll = () => {
//     alert(`Redirecting to pay ${formatCurrency(totalDue)}`);
//   };

//   return (
//     <>
//       <Sidebar />

//       <div className="absolute right-0 top-16 min-h-screen md:w-[calc(100%-208px)] w-full bg-gradient-to-br from-[#f5f7fa] to-[#ffffff] text-gray-800 p-6 md:p-10 overflow-hidden">

//         {/* for animated background */}
//         <div className="fixed w-56 h-56 bg-pink-300/30 blur-2xl rounded-full bottom-0 right-0 animate-pulse"></div>
//         <div className="fixed w-72 h-72 bg-purple-400/30 blur-3xl rounded-full top-1/4 left-1/3 animate-pulse"></div>
//         <div className="fixed w-72 h-72 bg-purple-300/30 blur-3xl rounded-full top-0 left-0 animate-pulse"></div>
//         <div className="fixed w-56 h-56 bg-pink-400/30 blur-2xl rounded-full bottom-1/4 right-2/3 animate-pulse"></div>


//         {/* Total Due Card it will only visible when there is due fees*/}
//         {hasDues && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white/70 backdrop-blur-lg border border-yellow-300/30 text-yellow-800 p-6 mb-10 rounded-3xl flex flex-col md:flex-row md:items-center justify-between shadow-md"
//           >
//             <div>
//               <h3 className="text-sm uppercase tracking-wide font-semibold">
//                 🔔 Total Outstanding
//               </h3>
//               <p className="text-3xl font-bold mt-1 text-red-500">
//                 {formatCurrency(totalDue)}
//               </p>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handlePayAll}
//               className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:brightness-105 transition"
//             >
//               Pay All Dues
//             </motion.button>
//           </motion.div>
//         )}

//         {/* Fee Summary section */}
//         <h3 className="text-2xl font-bold mb-6">📄 Fee Summary</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {feeDetails.map((fee, idx) => {
//             const due = fee.total - fee.paid;
//             const isPaid = due === 0;

//             return (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.23 }}
//                 whileHover={{ y: -10 }}
//                 className="bg-white/80 border border-gray-200 backdrop-blur-md rounded-3xl p-6 shadow-lg"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h4 className="text-lg font-semibold text-gray-800">
//                     {fee.label}
//                   </h4>
//                   <span
//                     className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                       isPaid
//                         ? "bg-green-100 text-green-700 border border-green-300"
//                         : "bg-yellow-100 text-yellow-800 border border-yellow-300"
//                     }`}
//                   >
//                     {isPaid ? "Paid" : "Due"}
//                   </span>
//                 </div>

//                 <div className="text-sm text-gray-600 space-y-1 mb-4">
//                   <p>Total: {formatCurrency(fee.total)}</p>
//                   <p>Paid: {formatCurrency(fee.paid)}</p>
//                   <p>
//                     Due:{" "}
//                     <span
//                       className={
//                         isPaid ? "text-green-600" : "text-red-500 font-semibold"
//                       }
//                     >
//                       {formatCurrency(due)}
//                     </span>
//                   </p>
//                 </div>

//                 {!isPaid && (
//                   <motion.button
//                     whileHover={{ scale: 1.04 }}
//                     whileTap={{ scale: 0.96 }}
//                     className="w-full mt-auto bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:brightness-110 transition-all"
//                   >
//                     Pay Now
//                   </motion.button>
//                 )}
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PayNow;



// File: PayNow.jsx
import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const feeDetails = [
  { label: "Tuition Fee", total: 50000, paid: 50000 },
  { label: "Hostel Fee", total: 30000, paid: 25000 },
  { label: "Mess Fee", total: 15000, paid: 15000 },
  { label: "Exam Fee", total: 2000, paid: 0 },
  { label: "Library Fee", total: 500, paid: 500 },
];

const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;
const totalDue = feeDetails.reduce((sum, fee) => sum + (fee.total - fee.paid), 0);
const hasDues = totalDue > 0;

const PayNow = () => {
  const navigate = useNavigate();

  const handlePayAll = () => {
    navigate("/makepayment", {
      state: {
        amount: totalDue,
      },
    });
  };

  return (
    <>
      <Sidebar />
      <div className="absolute right-0 top-16 min-h-screen md:w-[calc(100%-208px)] w-full bg-gradient-to-br from-[#f5f7fa] to-[#ffffff] text-gray-800 p-6 md:p-10 overflow-hidden">

        {/* Background Blobs for animation */}
        <div className="fixed w-56 h-56 bg-pink-300/30 blur-2xl rounded-full bottom-0 right-0 animate-pulse"></div>
        <div className="fixed w-72 h-72 bg-purple-400/30 blur-3xl rounded-full top-1/4 left-1/3 animate-pulse"></div>
        <div className="fixed w-72 h-72 bg-purple-300/30 blur-3xl rounded-full top-0 left-0 animate-pulse"></div>
        <div className="fixed w-56 h-56 bg-pink-400/30 blur-2xl rounded-full bottom-1/4 right-2/3 animate-pulse"></div>

        {hasDues && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-lg border border-yellow-300/30 text-yellow-800 p-6 mb-10 rounded-3xl flex flex-col md:flex-row md:items-center justify-between shadow-md"
          >
            <div>
              <h3 className="text-sm uppercase tracking-wide font-semibold">🔔 Total Outstanding</h3>
              <p className="text-3xl font-bold mt-1 text-red-500">
                {formatCurrency(totalDue)}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePayAll}
              className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:brightness-105 transition"
            >
              Pay All Dues
            </motion.button>
          </motion.div>
        )}

        <h3 className="text-2xl font-bold mb-6">📄 Fee Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feeDetails.map((fee, idx) => {
            const due = fee.total - fee.paid;
            const isPaid = due === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.23 }}
                whileHover={{ y: -10 }}
                className="bg-white/80 border border-gray-200 backdrop-blur-md rounded-3xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {fee.label}
                  </h4>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      isPaid
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                    }`}
                  >
                    {isPaid ? "Paid" : "Due"}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>Total: {formatCurrency(fee.total)}</p>
                  <p>Paid: {formatCurrency(fee.paid)}</p>
                  <p>
                    Due:{" "}
                    <span
                      className={isPaid ? "text-green-600" : "text-red-500 font-semibold"}
                    >
                      {formatCurrency(due)}
                    </span>
                  </p>
                </div>

                {!isPaid && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() =>
                      navigate("/makepayment", {
                        state: {
                          amount: due,
                        },
                      })
                    }
                    className="w-full mt-auto bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:brightness-110 transition-all"
                  >
                    Pay Now
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PayNow;