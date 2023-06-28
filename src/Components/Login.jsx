import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Context } from "../context/userContext/Context";
import { apiDomain } from "../utils/utils";

const Login = () => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    Email: yup.string().email('Invalid email').required('Email is required'),
    Password: yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post(`${apiDomain}/auth/login`, data)
      .then(({ data }) => {
        const { isAdmin } = data;
        if (data.token) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: data });
          const dashboardPath = isAdmin ? '/admin/dashboard' : '/voter/dashboard';
          navigate(dashboardPath);
          toast.success('Logged in successfully')
        } 
      })
      .catch(() => {
        dispatch({ type: 'LOGIN_FAILURE' });
        navigate('/auth/login');
        toast.error('Log in failed. Wrong credentials.');
      });
  };
  


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-form-header">
          <h2>Login</h2>
          <p>
            {'Don\'t have an account?'} <Link to="/auth/register">Register</Link>
          </p>
        </div>

        <label htmlFor="Email">Email</label>
        <input
          type="Email"
          id="Email"
          {...register('Email')}
        />
        {errors.Email && <span>{errors.Email.message}</span>}

        <label htmlFor="Password">Password</label>
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="Password"
            {...register('Password')}
          />
          {showPassword ? (
            <FaEyeSlash className="password-toggle" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="password-toggle" onClick={togglePasswordVisibility} />
          )}
        </div>
        {errors.Password && <span>{errors.Password.message}</span>}

        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;

