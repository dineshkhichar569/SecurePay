import { Routes, Route} from "react-router-dom";

import './App.css'
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MakePayment from "./pages/MakePayment";
import PayNow from "./pages/PayNow";
import Transaction from "./pages/Transactions";
import Support from "./pages/Support";


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />


      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/paynow" element={<PayNow />} />
      <Route path="/transactions" element={<Transaction />} />
      <Route path="/support" element={<Support />} />
    </Routes>
    </>
  )
}

export default App
