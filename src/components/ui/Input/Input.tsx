import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <input className={clsx(styles.input, className)} {...props} ref={ref} />
    );
  }
);

export default Input;
