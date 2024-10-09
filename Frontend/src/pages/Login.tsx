import { useFormik } from "formik";
import { z } from "zod";
import logo from "../assets/logo.png";
import image from "../assets/image.png";
import google from "../assets/search 1.png";
import facebook from "../assets/facebook 1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Define the Zod schema for login validation
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (values: LoginFormValues) => {
    try {
      LoginSchema.parse(values);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.flatten().fieldErrors;
      }
      throw error;
    }
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("/api/user/login", values);
        resetForm();
        navigate("/");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // Now error is of type AxiosError
          console.error("An unexpected error occurred:", error.message);
          setServerError(
            error.response?.data?.message || "An unknown error occurred"
          );
        } else {
          // Handle other types of errors
        }
      }
    },
  });

  return (
    <div className="main flex h-screen bg-[#B1D9DB]">
      {/* Left Section */}
      <div className="left h-full w-2/5">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="text px-14 text-white text-3xl">
          Find 3D Objects, Mockups
          <br />
          and Illustrations here.
        </div>
        <div className="image-container absolute left-[13%] bottom-5">
          <img src={image} alt="image" className="w-[420px] h-[450px]" />
        </div>
      </div>

      {/* Right Section */}
      <div className="right h-full w-3/5 bg-white rounded-l-[60px] flex items-center justify-center">
        <div className="form-container w-3/5">
          {/* Form Heading */}
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {/* Google and Facebook Login Buttons in Row */}
          <div className="flex space-x-4 mb-6">
            <button className="flex items-center justify-center bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 w-1/2">
              <img src={google} alt="Google" className="w-5 h-5 mr-2" />
              <span>Login with Google</span>
            </button>
            <button className="flex items-center justify-center bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 w-1/2">
              <img src={facebook} alt="Facebook" className="w-5 h-5 mr-2" />
              <span>Login with Facebook</span>
            </button>
          </div>

          {/* OR Separator */}
          <div className="flex items-center justify-center mb-6">
            <div>-</div>
            <p className="mx-2 text-lg text-gray-500">OR</p>
            <div>-</div>
          </div>

          {/* Display server error if any */}
          {serverError && (
            <div className="text-red-500 text-center mb-4">{serverError}</div>
          )}

          {/* Form Inputs */}
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
                onChange={(e) => {
                  formik.handleChange(e);
                  setServerError(null); // Clear server error on input change
                }}
                value={formik.values.email}
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
                onChange={(e) => {
                  formik.handleChange(e);
                  setServerError(null); // Clear server error on input change
                }}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#A7CCCE] text-white cursor-pointer py-2 rounded-lg hover:bg-[#9dc8ca]"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
          </form>

          {/* Don't have an account */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
