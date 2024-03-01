import Login from "./components/login_&_signup/Login";
import SignUp from "./components/login_&_signup/SignUp";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddExpense from "./components/addExpense/AddExpense";
import Expenses from "./components/expenses/Expenses";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import ResetPassword from "./components/forgetPassword/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />
        <Route path="/addexpense" element={<AddExpense />} />
        <Route path="/" element={<Expenses />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/password/resetpassword/:id" element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
      {/* <Expenses /> */}
    </>
  );
}

export default App;
