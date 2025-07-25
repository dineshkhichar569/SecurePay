// File: Settings.jsx
// import React, { useState } from "react";
// import { ArrowLeft, LogOut, Lock, User, Camera } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import profilePic from "/fingerprint.svg";

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState("Profile");
//   const [editMode, setEditMode] = useState(false);
//   const [profilePicUrl, setProfilePicUrl] = useState(profilePic);

//   const handlePicChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePicUrl(URL.createObjectURL(file));
//     }
//   };

//   const studentData = [
//     { label: "Full Name", value: "Dinesh Khichar" },
//     { label: "Student ID", value: "STD123456" },
//     { label: "Email", value: "dineshSunny@gmail.com" },
//     { label: "Phone", value: "(+91) 98765 43210" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4 sm:px-10 py-8 font-sans relative">
//       {/* Back and Logout buttons */}
//       <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
//         <Link
//           to="/dashboard"
//           className="flex items-center gap-2 text-orange-500 hover:text-orange-700 text-sm font-medium"
//         >
//           <ArrowLeft size={18} />
//           Back to Dashboard
//         </Link>
//         <button
//           onClick={() => alert("Logging out...")}
//           className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium"
//         >
//           <LogOut size={18} />
//           Log Out
//         </button>
//       </div>

//       {/* Profile Header with piture and name */}
//       <motion.div
//         className="max-w-5xl mx-auto text-center mb-10"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.6 }}
//       >
//         <div className="relative inline-block">
//           <img
//             src={profilePicUrl}
//             alt="Profile"
//             className="w-28 h-28 rounded-full object-cover border-4 border-orange-500 shadow"
//           />
//           <label className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-1 rounded-full cursor-pointer">
//             <Camera size={16} />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handlePicChange}
//               className="hidden"
//             />
//           </label>
//         </div>
//         <h2 className="text-xl font-bold mt-4 text-gray-800">Dinesh Khichar</h2>
//         <p className="text-sm text-gray-500">@dineshSunny</p>
//       </motion.div>

//       {/* Tab Switcher b/w Profile and password change */}
//       <motion.div
//         className="flex justify-center gap-6 mb-8 border-b border-gray-300"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, duration: 0.6 }}
//       >
//         {["Profile", "Password"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`relative py-2 text-base font-semibold transition-all duration-300 ${
//               activeTab === tab
//                 ? "text-orange-500"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {tab}
//             {activeTab === tab && (
//               <motion.div
//                 layoutId="underline"
//                 className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
//               />
//             )}
//           </button>
//         ))}
//       </motion.div>

//       {/* Tab Content about Profile and Password */}
//       <motion.div
//         className="max-w-4xl mx-auto"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6, duration: 0.6 }}
//       >
//         <AnimatePresence mode="wait">
//           {/* ///////////////// Profile Tab */}
//           {activeTab === "Profile" && (
//             <motion.div
//               key="profile"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-6 sm:p-8 space-y-8"
//             >
//               <h2 className="text-2xl font-bold text-gray-800">Your Info</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {studentData.map((field, idx) => (
//                   <div key={idx}>
//                     <label className="text-sm text-gray-500">
//                       {field.label}
//                     </label>
//                     <input
//                       disabled={
//                         !editMode ||
//                         field.label === "Student ID" ||
//                         field.label === "Email"
//                       }
//                       defaultValue={field.value}
//                       className={`mt-1 w-full bg-gray-50 border ${
//                         field.label === "Student ID" || field.label === "Email"
//                           ? "bg-gray-100 cursor-not-allowed text-gray-400"
//                           : ""
//                       } border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition`}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setEditMode(!editMode)}
//                 className="mt-4 px-6 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
//               >
//                 {editMode ? "Save Changes" : "Edit Profile"}
//               </motion.button>
//             </motion.div>
//           )}

//           {/* ////////////////  Password Tab */}
//           {activeTab === "Password" && (
//             <motion.div
//               key="password"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-6 sm:p-8 space-y-6"
//             >
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Change Password
//               </h2>
//               {["Current Password", "New Password", "Confirm New Password"].map(
//                 (label, idx) => (
//                   <div key={idx}>
//                     <label className="text-sm text-gray-500">{label}</label>
//                     <input
//                       type="password"
//                       placeholder="••••••••"
//                       className="mt-1 w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
//                     />
//                   </div>
//                 )
//               )}
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 className="mt-4 px-6 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
//               >
//                 Update Password
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       {/* for background animation */}
//       <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
//         {/* for Orange circle */}
//         <div
//           className="fixed 
//       w-[30rem] h-[30rem] 
//       sm:w-[20rem] sm:h-[20rem]
//       bg-gradient-to-br from-orange-600/30 to-yellow-500/20 
//       rounded-full blur-[150px] sm:blur-[100px]
//       top-10 left-1/2 -translate-x-1/2 
//       animate-pulse-slow"
//         />

//         {/* FOR Sky Blue CIRCLE */}
//         <div
//           className="fixed 
//       w-[24rem] h-[24rem] 
//       sm:w-[16rem] sm:h-[16rem]
//       bg-gradient-to-tr from-sky-600/20 to-blue-500/10 
//       rounded-full blur-[120px] sm:blur-[80px]
//       bottom-20 right-16 sm:bottom-10 sm:right-5 
//       animate-blob"
//         />

//         {/* For Pink cIRCLE */}
//         <div
//           className="fixed 
//       w-[28rem] h-[28rem] 
//       sm:w-[18rem] sm:h-[18rem]
//       bg-pink-200 
//       rounded-full blur-[160px] sm:blur-[100px]
//       top-1/3 left-20 sm:left-4 
//       animate-ping-slow"
//         />
//       </div>
//     </div>
//   );
// };

// export default Settings;

// Settings.jsx
import React, { useState, useEffect } from "react";
import { ArrowLeft, LogOut, Lock, User, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import profilePic from "/fingerprint.svg";
import { toast } from "react-toastify";


const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [editMode, setEditMode] = useState(false);
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({});
  const [profilePicUrl, setProfilePicUrl] = useState(profilePic);
  const navigate = useNavigate();

  // Fetch student profile
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/students/get-student", {
          withCredentials: true,
        });
        setStudent(res.data.data);
        setFormData({
          fullname: res.data.data.fullname,
          email: res.data.data.email,
          phone: res.data.data.phone,
          studentId: res.data.data.studentId,
        });
        if (res.data.data.avatar) {
          setProfilePicUrl(res.data.data.avatar);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchStudent();
  }, []);

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Save updated profile
  const handleProfileUpdate = async () => {
    try {
      await axios.patch(
        "http://localhost:8000/api/v1/students/update-account",
        {
          fullname: formData.fullname,
          phone: formData.phone,
          email: formData.email
        },
        { withCredentials: true }
      );
      setEditMode(false);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error)
  const errorMessage = error?.response?.data?.message || "Something went wrong";
  toast.error(errorMessage);
}
  };

  // Change profile picture
  const handlePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setProfilePicUrl(preview);

      const data = new FormData();
      data.append("avatar", file);

      try {
        await axios.patch("http://localhost:8000/api/v1/students/update-avatar", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        console.error("Error uploading avatar:", err);
      }
    }
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;

    try {
      await axios.post(
        "http://localhost:8000/api/v1/students/change-password",
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      e.target.reset();
      alert("Password updated");
    } catch (err) {
      console.error("Error changing password:", err);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/students/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  if (!student) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4 sm:px-10 py-8 font-sans relative">
      {/* Back and Logout buttons */}
      <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
        <Link to="/dashboard" className="flex items-center gap-2 text-orange-500 hover:text-orange-700 text-sm font-medium">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium">
          <LogOut size={18} />
          Log Out
        </button>
      </div>

      {/* Profile Header */}
      <motion.div className="max-w-5xl mx-auto text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <div className="relative inline-block">
          <img src={profilePicUrl} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-orange-500 shadow" />
          <label className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-1 rounded-full cursor-pointer">
            <Camera size={16} />
            <input type="file" accept="image/*" onChange={handlePicChange} className="hidden" />
          </label>
        </div>
        <h2 className="text-xl font-bold mt-4 text-gray-800">{formData.fullname}</h2>
        <p className="text-sm text-gray-500">@{student.username || student.email?.split("@")[0]}</p>
      </motion.div>

      {/* Tab Switcher */}
      <motion.div className="flex justify-center gap-6 mb-8 border-b border-gray-300" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
        {["Profile", "Password"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`relative py-2 text-base font-semibold transition-all duration-300 ${activeTab === tab ? "text-orange-500" : "text-gray-500 hover:text-gray-700"}`}>
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
        <AnimatePresence mode="wait">
          {activeTab === "Profile" && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-6 sm:p-8 space-y-8">
              <h2 className="text-2xl font-bold text-gray-800">Your Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", name: "fullname" },
                  { label: "Student ID", name: "studentId" },
                  { label: "Email", name: "email" },
                  { label: "Phone", name: "phone" },
                ].map(({ label, name }, idx) => (
                  <div key={idx}>
                    <label className="text-sm text-gray-500">{label}</label>
                    <input
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      disabled={!editMode || name === "studentId" }
                      className={`mt-1 w-full bg-gray-50 border ${["studentId"].includes(name) ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""} border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition`}
                    />
                  </div>
                ))}
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={editMode ? handleProfileUpdate : () => setEditMode(true)} className="mt-4 px-6 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
                {editMode ? "Save Changes" : "Edit Profile"}
              </motion.button>
            </motion.div>
          )}

          {activeTab === "Password" && (
            <motion.form onSubmit={handlePasswordChange} key="password" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
              <div>
                <label className="text-sm text-gray-500">Current Password</label>
                <input type="password" name="oldPassword" required className="mt-1 w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
              </div>
              <div>
                <label className="text-sm text-gray-500">New Password</label>
                <input type="password" name="newPassword" required className="mt-1 w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
              </div>
              <motion.button whileTap={{ scale: 0.95 }} type="submit" className="mt-4 px-6 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
                Update Password
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background Blobs (unchanged) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="fixed w-[30rem] h-[30rem] sm:w-[20rem] sm:h-[20rem] bg-gradient-to-br from-orange-600/30 to-yellow-500/20 rounded-full blur-[150px] sm:blur-[100px] top-10 left-1/2 -translate-x-1/2 animate-pulse-slow" />
        <div className="fixed w-[24rem] h-[24rem] sm:w-[16rem] sm:h-[16rem] bg-gradient-to-tr from-sky-600/20 to-blue-500/10 rounded-full blur-[120px] sm:blur-[80px] bottom-20 right-16 sm:bottom-10 sm:right-5 animate-blob" />
        <div className="fixed w-[28rem] h-[28rem] sm:w-[18rem] sm:h-[18rem] bg-pink-200 rounded-full blur-[160px] sm:blur-[100px] top-1/3 left-20 sm:left-4 animate-ping-slow" />
      </div>
    </div>
  );
};

export default Settings;





