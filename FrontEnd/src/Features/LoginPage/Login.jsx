import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { setLogin } from "state";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Defining the Login & Register Data Object
const DefaultRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
  occupation: "",
  location: "",
};

const DefaultLogin = {
  email: "",
  password: "",
};

// Making Schemas from YUP React Module
const RegisterSchema = object({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"), // Taking the link of image
  occupation: yup.string().required("required"),
  location: yup.string().required("required"),
});

// Login Schema
const LoginSchema = object({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

const Login = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Login = async (req, res) => {
    try {
      const loggedResponse = await fetch("http://localhost:4001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const login = await loggedResponse.json();
      res.resetForm();
      if(login){
        dispatch(
          setLogin({
            user : loggedIn.user,
            token : loggedIn.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Formik></Formik>;
};

export default Login;
