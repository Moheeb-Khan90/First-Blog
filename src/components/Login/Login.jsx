import React, { useState, useEffect } from "react"
import { Input, Button, Loader } from "../index"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import authService from "../../Appwrite/Authentication"
import { login as signup } from "../../store/Auth"

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const login = async (data) => {
    setLoading(true);
    setError("");
    try {
      const authLogin = await authService.login(data)
      if (authLogin) {
        const userData = await authService.getCurrentUser()
        dispatch(signup(userData));
      }
    } catch (error) {
      setError(error.message || 'An error occurred during login.')
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (authStatus) {
      navigate("/home")
    }
  }, [authStatus, navigate])

  return (
    <>
     {error && <p className="text-red-600 text-center my-4">{error}</p>}
      {!authStatus ? (
        <div className="w-full h-full flex justify-center flex-wrap p-4">
          <div
            className="
            xsm:w-[100%] 
            sm:w-full
            md:w-1/2
            rounded-md shadow-lg border border-neutral-100 p-4"
          >
            <span className="font-bold text-5xl my-5 text-blue-600 border-b-2 w-full flex justify-center py-4">
              Login
            </span>
            <form
              onSubmit={handleSubmit(login)}
              className="w-[100%] flex flex-col gap-5 items-center justify-center sm:w-full md:w-[100%] p-4"
            >
              <Input
                type="email"
                placeholder="Email"
                labelText="Email"
                classLabel="flex-start capitalize font-semibold text-lg text-neutral-600"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}

              <Input
                type="password"
                placeholder="Password"
                labelText="Password"
                classLabel="flex-start capitalize font-semibold text-lg text-neutral-600"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}

              <Button
                type="submit"
                textBtn="Login"
                className="w-full my-4 font-medium"
                disabled={loading || isSubmitting}
              />
              <p>
                Don’t have an account?{" "}
                <Link to="/signup" className="text-blue-700 font-semibold">
                  Sign Up
                </Link>{" "}
                here
              </p>
            </form>
          </div>
        </div>
      ) : null}
      {loading && <Loader loadingText="Loading..." />}
    </>
  );
};

export default Login;
