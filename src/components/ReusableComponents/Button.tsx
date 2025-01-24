import React from "react";
import { MouseEventHandler, ReactNode } from "react";
import ButtonLoader from "./ButtonLoader";
import { Link } from "react-router-dom";

interface propTypes {
  className?: string;
  href?: string;
  children?: ReactNode;
  isFormSubmitting?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
}

const Button = ({
  className,
  href,
  children,
  isFormSubmitting,
  onClick,
  iconBefore,
  iconAfter,
}: propTypes) => {
  const classes = `button relative inline-flex items-center gap-2 justify-center rounded-xl bg-shades-10 px-6 py-3 text-[1rem] text-shades-1 transition-all hover:bg-shades-12 hover:text-shades-1 cursor-pointer `;
  const spanClasses = "relative z-10";
  const renderButton = () => (
    <button
      onClick={onClick}
      type="button"
      className={`${classes} ${className} `}
    >
      {iconBefore}
      <span className={spanClasses}>{children}</span>
      {iconAfter}
      <ButtonLoader fillColor="#fff" applyLoader={isFormSubmitting!} />
    </button>
  );

  const renderLink = () => (
    <Link to={href!} className={classes}>
      <span className={spanClasses}>{children}</span>
    </Link>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
