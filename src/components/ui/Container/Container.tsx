import { HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

import styles from "./Container.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Container = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <main
        className={clsx(styles.container, className)}
        {...props}
        ref={ref}
      />
    );
  }
);

export default Container;
