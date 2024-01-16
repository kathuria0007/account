import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Listusers from "./components/list/Listusers.jsx";
import Signup from "./components/signup/Signup.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import login from "./components/login/login.jsx";
import admin from "./components/admin/Admin.jsx";
import Addwork from "./components/admin/Addwork.jsx";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Signup}></Route>
          <Route path="/listusers" Component={Listusers}></Route>
          <Route path="/login" Component={login}></Route>
          <Route path="/dashboard" Component={Dashboard}></Route>
          <Route path="/adminpanel" Component={admin}></Route>
          <Route path="/addwork" Component={Addwork}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
