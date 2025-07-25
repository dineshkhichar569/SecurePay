import { Routes, Route} from "react-router-dom";

import './App.css'
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MakePayment from "./pages/MakePayment";
import PayNow from "./pages/PayNow";
import Transaction from "./pages/Transactions";
import Support from "./pages/Support";
import Settings from "./pages/Settings";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />



      <Route path="/makepayment" element={<MakePayment />} />

      

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/paynow" element={<PayNow />} />
      <Route path="/transactions" element={<Transaction />} />
      <Route path="/support" element={<Support />} />
      <Route path="/setting" element={<Settings />} />
    </Routes>
    </>
  )
}

export default App
