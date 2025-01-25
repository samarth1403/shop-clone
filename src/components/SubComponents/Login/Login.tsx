"use client";
import axios, { HttpStatusCode, isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { apiUrls } from "../../../services/apiUrls/apiUrls";
import { constants, formDataTypes } from "../../../utils/constants";
import { validateSignIn } from "../../../utils/validation/Validation";
import {
  Button,
  FormField,
  Heading,
  Section,
} from "../../ReusableComponents/index";

const Login = () => {
  const { setIsUserLoggedIn } = useGlobalContext();
  const [isFormSubmitting, setFormIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataTypes>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, { message: string }>>({});
  const navigate = useNavigate();

  const setFormDataKey = (
    key: string,
    value: string | number | boolean | readonly string[]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const errors = validateSignIn(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setFormIsSubmitting(true);
    try {
      const { data, status } = await axios.post(apiUrls.login, formData);
      if (status === HttpStatusCode.Created) {
        toast.success("Login Successful");
        localStorage.setItem(
          constants.localStorageItems.access_token,
          data?.access_token
        );
        localStorage.setItem(
          constants.localStorageItems.refresh_token,
          data?.refresh_token
        );
        setIsUserLoggedIn(true);
        navigate("/");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
      setIsUserLoggedIn(false);
    } finally {
      setFormIsSubmitting(false);
      setErrors({});
    }
  };

  return (
    <Section
      className="mt-12 w-full"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="flex-center mt-4 w-full flex-col lg:mt-4 xl:mt-4">
        <Heading title={`Welcome back !`} />
        <div className="flex-center h-auto w-72 flex-col gap-5 rounded-xl bg-white p-4 shadow-2xl shadow-shades-6 lg:w-96 lg:p-6 ">
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            setValue={setFormDataKey}
            placeholder="Drop Your Email Here"
            className="w-full rounded-lg border-2 border-shades-4 p-4 focus:border-shades-8 focus:outline-none"
            error={errors.email}
            isRequired
          />
          <FormField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            setValue={setFormDataKey}
            placeholder="Password"
            className="w-full rounded-lg border-2 border-shades-4 p-4 focus:border-shades-8 focus:outline-none"
            error={errors.password}
            isRequired
          />
          <Button
            onClick={handleSubmit}
            className="w-full"
            isFormSubmitting={isFormSubmitting}
          >
            Sign In
          </Button>
          <Link to={constants.routes.register}>
            <p className="body-2 text-center">
              {`Don't have Account ? `} &nbsp;
              <span className="text-blue-600">Register Now</span>{" "}
            </p>
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Login;
