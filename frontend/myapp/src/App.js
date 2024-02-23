import Login from "./components/login_&_signup/Login";
import SignUp from "./components/login_&_signup/SignUp";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddExpense from "./components/expense/AddExpense";
import Expenses from "./components/expenses/Expenses";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />
        <Route path="/addexpense" element={<AddExpense />} />
      </Routes>
      <ToastContainer />
      <Expenses />
    </>
  );
}

export default App;
