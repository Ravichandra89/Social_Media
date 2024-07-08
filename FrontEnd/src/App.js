import "./App.css";
import HomePage from "./Features/HomePage/Home";
import LoginPage from "./Features/LoginPage/Login";
import ProfilePage from "./Features/ProfilePage/Profile";
import NavBar from "./Features/Navbar/Navbar";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Login from "./Features/LoginPage/Login";
import Home from "./Features/HomePage/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />}  />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
