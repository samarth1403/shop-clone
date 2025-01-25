import axios, { HttpStatusCode, isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { apiUrls } from "../../../services/apiUrls/apiUrls";
import { constants, formDataTypes } from "../../../utils/constants";
import { validateSignUp } from "../../../utils/validation/Validation";
import { Button, FormField, Heading, Section } from "../../ReusableComponents";

const Register = () => {
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useGlobalContext();
  const [isFormSubmitting, setFormIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataTypes>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, { message: string }>>({});

  const setFormDataKey = (
    key: string,
    value: string | number | boolean | readonly string[]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const errors = validateSignUp(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setFormIsSubmitting(true);
    try {
      const { status } = await axios.post(apiUrls.register, {
        ...formData,
        avatar: "https://i.pravatar.cc/150?img=68",
      });
      if (status === HttpStatusCode.Created) {
        toast.success("Successfully Registered");
        setIsUserLoggedIn(true);
        navigate(constants.routes.login);
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
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
      <div className="flex-center mt-4 w-full flex-col  lg:mt-4 xl:mt-6">
        <Heading title={`Get Started Today !`} className="mb-4" />
        <div className="flex-center h-auto w-72 flex-col gap-4 rounded-xl bg-white px-4 py-2 shadow-2xl shadow-shades-6 lg:w-96 lg:px-8 lg:py-6 ">
          <FormField
            label="Name"
            type="text"
            name="name"
            value={formData.name!}
            setValue={setFormDataKey}
            placeholder="Name"
            className="w-full rounded-lg border-2 border-shades-4 p-3 focus:border-shades-8 focus:outline-none"
            error={errors.name}
            isRequired
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            setValue={setFormDataKey}
            placeholder="Drop Your Email Here"
            className="w-full rounded-lg border-2 border-shades-4 p-3 focus:border-shades-8 focus:outline-none"
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
            className="w-full rounded-lg border-2 border-shades-4 p-3 focus:border-shades-8 focus:outline-none"
            error={errors.password}
            isRequired
          />
          <Button
            onClick={handleSubmit}
            className="w-full"
            isFormSubmitting={isFormSubmitting}
          >
            Sign Up
          </Button>
          <Link to={constants.routes.login}>
            <p className="body-2 text-center">
              {`Already have an Account ? `} &nbsp;
              <span className="text-blue-600">Sign In</span>{" "}
            </p>
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Register;
