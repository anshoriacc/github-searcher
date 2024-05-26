import { SelectHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

import styles from "./Select.module.scss";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <select className={clsx(styles.select, className)} {...props} ref={ref} />
    );
  }
);

export default Select;
