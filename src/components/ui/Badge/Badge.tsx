import { PropsWithChildren } from "react";
import styles from "./Badge.module.scss";

type Props = PropsWithChildren;

const Badge = ({ children }: Props) => {
  return <span className={styles.badge}>{children}</span>;
};

export default Badge;
