import React from 'react'
import axios from "axios";
import { useState ,useEffect,useContext} from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import {toast} from 'react-toastify'
import loginbg from '../assets/loginbg.png'
import signupbg from '../assets/signupbg.png'
import { SearchCode, UserPen, Mail, Eye, EyeOff, ShieldLock, ArrowRight } from 'lucide-react';
import VerifyEmail from "../smallcomponents/VerifyEmail"
import { AuthContext } from '../context/AuthProvider';
import { useDispatch } from "react-redux";
import { fetchProfile } from "../Redux/profileSlice";


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usernameStatus, setUsernameStatus] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [showOTP,setShowOTP]=useState(false);
  const [slide, setSlide] = useState("Log in");
  const [pendingEmail,setPendingEmail]=useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const displayName = watch("displayName");
  const {isLoggedIn,setIsLoggedIn,DisplayName,setDisplayName}=useContext(AuthContext);

  

  const slidesButton = [
    { id: 1, item: "Log in" },
    { id: 2, item: "Sign up" }
  ];

  const onSubmit = async (data) => {

    let response;

    if (slide === "Log in") {
      // Login API

      try {

        response = await axios.post(
          "http://localhost:8000/api/auth/login",
          {
            email: data.email,
            password: data.password
          },
          { withCredentials: true }
        );

        toast.success(response.data.message);

        await dispatch(fetchProfile());
        setIsLoggedIn(true);
        setDisplayName(response.data.profile.displayName);
        navigate("/");

      } catch (error) {
        toast.error("Invalid username or password")
      }

    } else {
      // Signup API
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/signup",
          {
            displayName: data.displayName,
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        );

        toast.success(response.data.message);

        // Save email for OTP verification
        setPendingEmail(data.email);

        // Open OTP modal
        setShowOTP(true);

      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Signup failed"
        );
      }

    }


  };

  useEffect(() => {
    if (!displayName || displayName.trim().length < 3) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setCheckingUsername(true);
        

        const response = await axios.get(
          "http://localhost:8000/api/auth/checkUsername",
          {
            params: { displayName: displayName.trim() }
          }
        );
       
        setUsernameStatus(response?.data?.message);
      } catch (error) {
        console.log(error);
      } finally {
        setCheckingUsername(false);
      }
    },  1000);

    return () => clearTimeout(timer);
  }, [displayName]);


  const handleVerifyOTP = async (otp) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/verifyEmail",
        {
          email: pendingEmail,
          otp,
        },
        {
        withCredentials: true,
      }
      );

      toast.success(response?.data?.message);
      setShowOTP(false);

      await dispatch(fetchProfile());
      setIsLoggedIn(true);
      navigate("/");


    } catch (error) {
      toast.error(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/resendOtp",
        {
          email: pendingEmail,
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend OTP"
      );
    }
  };







  return (
    <div
      style={{ backgroundImage: `url(${loginbg})` }}
      className='w-screen  bg-cover bg-center h-screen flex justify-center overflow-scroll items-center max-lg:w-full max-lg:min-h-screen max-lg:h-auto max-lg:items-start max-lg:py-6'>
      <div className="main mx-auto  flex h-[90%] w-[75%] shadow-md shadow-gray-900 max-lg:my-auto max-lg:h-auto max-lg:w-[92%] max-lg:max-w-xl">
        <div
          style={{ backgroundImage: `url(${signupbg})` }}
          className="left w-[50%] h-full bg-cover bg-center max-lg:hidden">

        </div>
        <div className="right w-[50%] h-full px-10 py-7 bg-card/20 backdrop-blur-md overflow-scroll max-lg:w-full max-lg:h-auto max-sm:px-5 max-sm:py-6">

          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className='flex flex-col gap-2'>

            <h1 className='text-2xl font-Alumni font-semibold text-[#B266FF]'>{slide === "Log in" ? "WELCOME BACK" : "ENTER THE ARENA"}</h1>
            <h1 className='text-3xl font-Doto font-extrabold text-white max-sm:text-2xl'>{slide === "Log in" ? "Login in to CodeArena" : "Create your Account"}</h1>
            <h1 className=' font-mono  text-text/60 '>{slide === "Log in" ? "Continue your streak and keep building momentum." : "Start practicing for free.No credit card required."}</h1>

            <div className="slides mt-4 bg-page border-2 border-border w-full h-10 rounded-md p-1 flex items-center justify-center">
              {
                slidesButton.map((item) => (
                  <div
                    onClick={() => setSlide(item.item)}
                    key={item.id}
                    className="button  relative p-2 flex-1 h-full flex items-center justify-center cursor-pointer ">
                    <h1 className={`absolute z-50 transition-all text-sm flex p-1 ${item.item === slide ? " text-text" : "text-text/50"}`}>{item.item}</h1>
                    {item.item === slide && (
                      <motion.span
                        layoutId='slide'
                        className="absolute inset-0 rounded-md bg-[#2B0057]"
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}></motion.span>
                    )}
                  </div>
                ))
              }
            </div>

            {slide === "Sign up" && (
              <div className="group mt-5">
                <label className='text-text/50 '>Display name</label>
                <div className="flex items-center gap-3 border border-border rounded-md px-3 focus-within:border-violet-500   transition-all duration-300 w-full h-10 bg-page mt-3">

                  <UserPen className="text-text/40" size={20} />
                  <input
                    {...register("displayName", {
                      required: "Display name is required",
                      minLength: {
                        value: 3,
                        message: "Display name must contain at least 3 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Display name cannot exceed 20 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_ ]+$/,
                        message: "Only letters, numbers, spaces, and underscores are allowed",
                      },
                    })}
                    type="text" placeholder="Virat Kohli"
                    className="w-full bg-transparent outline-none text-text" />
                </div>
              </div>
            )}
            {errors?.displayName ? (
              <p className="text-red-500 text-sm">
                {errors.displayName.message}
              </p>
            ) : usernameStatus ? (
              <p className={`text-sm ${usernameStatus === "Display name is available"
                  ? "text-green-500"
                  : "text-red-500"
                }`}>
                {usernameStatus}
              </p>
            ) : null}

            <div className="email mt-5">
              <label className='text-text/40'>Email address</label>
              <div className="flex items-center gap-3 border border-border rounded-md px-3 focus-within:border-violet-500   transition-all duration-300 w-full h-10 bg-page mt-3">

                <Mail className="text-text/40" size={20} />
                <input
                  {...register("email", {
                    required: "Email  is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="text" placeholder="2016ipl973@example.com"
                  className="w-full bg-transparent outline-none text-text" />
              </div>
            </div>
            {errors?.email && (
              <p className="text-red-500 text-sm">
                {errors?.email?.message}
              </p>
            )}


            <div className="password mt-5">
              <label className='text-text/40'>Password</label>
              <div className="flex items-center gap-3 border border-border rounded-md px-3 focus-within:border-violet-500   transition-all duration-300 w-full h-10 bg-page mt-3">

                <ShieldLock className="text-text/40" size={20} />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters",
                    },

                  })}
                  type={showPassword ? "text" : "password"} placeholder="Minimum 8 characters"
                  className="w-full bg-transparent outline-none text-text" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-full hover:cursor-pointer">{showPassword ? <EyeOff className='text-text/50' size={20} /> : <Eye className='text-text/40' size={20} />}</button>
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors?.password?.message}
              </p>
            )}


            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 w-full flex justify-center items-center text-lg font-bold text-text p-3 h-12 bg-[#59B5F7] rounded-md hover:cursor-pointer hover:-translate-y-0.5 transition-all ease-in-out  gap-3 ${isSubmitting?"hover:cursor-progress bg-[#59B5F7]/20":""}`}>
              {slide === "Log in" ? "Log in to your account " : "Create free account "}<ArrowRight size={16} strokeWidth={1} />
            </button>

            {
              slide === "Log in" ? <div className='mx-auto flex gap-1 mt-5 '><h1
               
              className='text-text/50'>New to codeArena?</h1><span
              onClick={()=>setSlide("Sign up")}
              className='hover:text-violet-400 text-text hover:cursor-pointer'>Create an Account</span></div> : <div className='mx-auto flex gap-1 mt-5 '><h1 className='text-text/50' >Already have an Account?</h1><span
              onClick={()=>setSlide("Log in")}
              className='hover:text-violet-400 hover:cursor-pointer text-text '>Log in</span></div>
            }




          </form>

        </div>
      </div>

      {showOTP && (
        <VerifyEmail
          email={pendingEmail}
          onClose={() => setShowOTP(false)}
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
        />
      )}
   

    </div>
  )
}

export default Login
