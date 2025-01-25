import { Validator } from "./Validator";

interface singInPropTypes {
  email: string;
  password: string;
}

interface signUpPropTypes {
  name?: string;
  email: string;
  password: string;
}

export const validateSignIn = (formData: singInPropTypes) => {
  const { email, password } = formData;
  const emailV = new Validator({
    value: email,
    key: "email",
    field: "Email",
  })
    .email()
    .required();
  const passwordV = new Validator({
    value: password,
    key: "password",
    field: "Password",
  }).required();
  return { ...emailV.errors, ...passwordV.errors };
};

export const validateForgotPassword = (formData: { email: string }) => {
  const { email } = formData;
  const emailV = new Validator({
    value: email,
    key: "email",
    field: "Email",
  })
    .email()
    .required();
  return { ...emailV.errors };
};

export const validateResetPassword = (formData: { newPassword: string }) => {
  const { newPassword } = formData;
  const passwordV = new Validator({
    value: newPassword,
    key: "newPassword",
    field: "New Password",
  }).required();
  return { ...passwordV.errors };
};

export const validateSignUp = (formData: signUpPropTypes) => {
  const { email, password, name } = formData;
  const usernameV = new Validator({
    value: name!,
    key: "name",
    field: "Name",
  }).required();
  const emailV = new Validator({
    value: email,
    key: "email",
    field: "Email",
  })
    .email()
    .required();
  const passwordV = new Validator({
    value: password,
    key: "password",
    field: "Password",
  }).required();
  return { ...usernameV.errors, ...emailV.errors, ...passwordV.errors };
};

export const validateReview = (formData: { name: string; star: number }) => {
  const { name, star } = formData;
  const nameV = new Validator({
    value: name!,
    key: "name",
    field: "Name",
  }).required();
  const starV = new Validator({
    value: star,
    key: "star",
    field: "Rating",
  }).numberRequired();
  return { ...nameV.errors, ...starV.errors };
};
