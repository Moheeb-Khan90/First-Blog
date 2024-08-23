import React, { useState } from "react";
import { Input, Button, Loader } from "../index";
import authService from "../../Appwrite/Authentication";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/Auth";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signin = async (data) => {
    setError("")
    setLoading(true)
    try {
      const createAccount = await authService.createAccount(data);
      if (createAccount) {
        const userData = await authService.getCurrentUser();
        dispatch(login(userData))
        navigate("/home")
      }
    } catch (error) {
      setError(error.message || "An error occurred during Signin.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {error && <p className="text-red-600 text-center my-4">{error}</p>}
      {!authStatus && (
        <div className=" w-full  h-full flex justify-center flex-wrap p-4">
          <div
            className="
          xsm:w-[100%] 
          sm:w-full
          md:w-1/2
          rounded-md shadow-lg border border-neutral-100   p-4"
          >
            <span className="font-bold text-5xl my-5 text-blue-600 border-b-2 w-full flex justify-center py-4 ">
              Signup
            </span>
            <form
              onSubmit={handleSubmit(signin)}
              className="w-[100%] flex flex-col gap-5  items-center justify-center sm:w-full md:w-[100%] p-4"
            >
              <Input
                type="text"
                placeholder="Enter your full name"
                labelText="User Name"
                classLabel="flex-start capitalize font-semibold text-lg text-neutral-600"
                {...register("name", {
                  required: {
                    value: true,
                    message: "User Name Must Be Required",
                  },
                  minLength: {
                    value: 3,
                    message: "User Name Must Be 3 character",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}

              <Input
                type="email"
                placeholder="Enter your email"
                labelText="Email"
                classLabel="flex-start capitalize font-semibold text-lg text-neutral-600"
                {...register("email", {
                  required: { value: true, message: "Email Must Be Required" },
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}

              <Input
                type="password"
                placeholder="Enter your password"
                labelText="password"
                classLabel="flex-start capitalize font-semibold text-lg text-neutral-600"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password contains 8 character long",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}

              <Button
                type="submit"
                textBtn="Create Account"
                className="w-full my-4 font-medium"
              />
              <p>
                Do you have an account?{" "}
                <Link to="/" className="text-blue-700 font-semibold">
                  login
                </Link>{" "}
                here
              </p>
            </form>
          </div>
        </div>
      )}
      {loading && <Loader loadingText="Loading..." />}
    </>
  );
};

export default Signin;
