import Login from "./components/login_&_signup/Login";
import SignUp from "./components/login_&_signup/SignUp";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
