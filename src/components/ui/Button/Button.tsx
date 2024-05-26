import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <button className={clsx(styles.button, className)} {...props} ref={ref} />
    );
  }
);

export default Button;
