import { HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import styles from "./Card.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className={clsx(styles.card, className)} {...props} ref={ref} />
    );
  }
);

export default Card;
