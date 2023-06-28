import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiDomain } from "../utils/utils";

const schema = yup.object().shape({
  FirstName: yup.string().required("First name is required"),
  SecondName: yup.string().required("Second name is required"),
  Email: yup.string().email("Invalid email").required("Email is required"),
  PhoneNumber: yup.string().required("Phone number is required"),
  Password: yup.string().required("Password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post(`${apiDomain}/auth/register`, data)
      .then(( ) => {
        navigate("/auth/login");
      },toast.success('Account created successfully'))
      .catch((error) => {
        if (error.res && error.res.data && error.res.data.error) {
          toast.error(error.res.data.error); // Show error message from the backend using toast notification
        } else {
          toast.error("User already exists!"); // Show a generic error message for other errors
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="registration-form-header">
          <h2>Create Account</h2>
          <p>
            Already have an account? <Link to="/auth/login">Login</Link>{" "}
          </p>
        </div>

        <label htmlFor="FirstName">First Name</label>
        <input type="text" id="FirstName" {...register("FirstName")} />
        {errors.FirstName && <span>{errors.FirstName.message}</span>}

        <label htmlFor="SecondName">Second Name</label>
        <input type="text" id="SecondName" {...register("SecondName")} />
        {errors.SecondName && <span>{errors.SecondName.message}</span>}

        <label htmlFor="Email">Email</label>
        <input type="text" id="Email" {...register("Email")} />
        {errors.Email && <span>{errors.Email.message}</span>}

        <label htmlFor="PhoneNumber">Phone Number</label>
        <input type="text" id="PhoneNumber" {...register("PhoneNumber")} />
        {errors.PhoneNumber && <span>{errors.PhoneNumber.message}</span>}

        <label htmlFor="Password">Password</label>
        <div>
          <input
            className="password-input"
            type={showPassword ? "text" : "password"}
            id="Password"
            {...register("Password")}
          />
          {showPassword ? (
            <FaEyeSlash className="password-toggle" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="password-toggle" onClick={togglePasswordVisibility} />
          )}
        </div>
        {errors.Password && <span>{errors.Password.message}</span>}

        <button type="submit">Create Account</button>
      </form>
      <ToastContainer /> {/* Toast container for displaying notifications */}
    </div>
  );
};

export default Register;
