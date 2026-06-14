import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Income from "./views/Dashboard/Income";
import Expense from "./views/Dashboard/Expense";
import Home from "./views/Dashboard/Home";
import Login from "./views/Authentication/Login";
import SignUp from "./views/Authentication/Signup";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <UserProvider>  

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/signUp" exact element={<SignUp/>}/>
          <Route path="/dashboard" exact element={<Home/>}/>
          <Route path="/income" exact element={<Income/>}/>
          <Route path="/expense" exact element={<Expense/>}/>
        </Routes>
      </Router>
    </div>

    <Toaster
    toastOptions={{
      className: "",
      style: {
        fontSize: '13px'
      },
    }}
    />
    </UserProvider>
  )
}

export default App

const Root = () =>{
  // Check if token exsists in localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? <Navigate to="/dashboard"/> : <Navigate to="/login"/>;
}