/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { z } from "zod";
import logo from "../assets/logo.png";
import image from "../assets/image.png";
import google from "../assets/search 1.png";
import facebook from "../assets/facebook 1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const UserSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters").trim(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

type UserFormValues = z.infer<typeof UserSchema>;
const submitFormData = async (formData: any) => {
  const response = await axios.post("/api/user/signup", formData);
  return response.data;
};
const Signup = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<Error | null>(null);
  const { mutate } = useMutation({
    mutationFn: submitFormData,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    mutate(values, {
      onSuccess: () => {
        // Handle success (optional)
        console.log("Form submitted successfully");
        navigate("/");
      },
      onError: (error: Error) => {
        // Handle error (optional)
        setServerError(error);
        console.error("Submission error:", error);
      },
      onSettled: () => {
        // Reset submitting state
        setSubmitting(false);
      },
    });
  };

  const validate = (values: UserFormValues) => {
    try {
      UserSchema.parse(values);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.flatten().fieldErrors;
      }
      throw error;
    }
  };

  const formik = useFormik<UserFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  return (
    <div className="main flex h-screen bg-[#B1D9DB]">
      {/* Left Section */}
      <div className="left h-full w-2/5">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text px-14 text-white text-3xl">
          Find 3D Objects, Mockups
          <br />
          and Illustrations here.
        </div>
        <div className="image-container absolute left-[13%] bottom-5">
          <img src={image} alt="Image" className="w-[420px] h-[450px]" />
        </div>
      </div>

      {/* Right Section */}
      <div className="right h-full w-3/5 bg-white rounded-l-[60px] flex items-center justify-center">
        <div className="form-container w-3/5">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

          {serverError && (
            <div className="text-red-500 mb-4">{serverError.message}</div>
          )}

          <div className="flex space-x-4 mb-6">
            <button className="flex items-center justify-center bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 w-1/2">
              <img src={google} alt="Google" className="w-5 h-5 mr-2" />
              <span>signup with google</span>
            </button>
            <button className="flex items-center justify-center bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 w-1/2">
              <img src={facebook} alt="Facebook" className="w-5 h-5 mr-2" />
              <span>signup with facebook</span>
            </button>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div>-</div>
            <p className="mx-2 text-lg text-gray-500">OR</p>
            <div>-</div>
          </div>

          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                value={formik.values.name}
                aria-label="Enter your name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-xs">{formik.errors.name}</div>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                value={formik.values.email}
                aria-label="Enter your email address"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                value={formik.values.password}
                aria-label="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#A7CCCE] text-white cursor-pointer py-2 rounded-lg hover:bg-[#9dc8ca]"
              disabled={
                formik.isSubmitting ||
                Object.keys(formik.errors).length > 0 ||
                !!serverError
              }
            >
              {formik.isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
