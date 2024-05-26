import Card from "../ui/Card/Card";
import styles from "./CardPlaceholder.module.scss";

const CardPlaceholder = () => {
  return (
    <Card className={styles["card-placeholder"]}>
      <span className={styles["avatar-placeholder"]} />

      <div className={styles.info}>
        <span className={styles["name-placeholder"]} />

        <span className={styles["description-placeholder"]} />
        <span className={styles["description-placeholder"]} />
        <span
          className={styles["description-placeholder"]}
          style={{ width: "25%" }}
        />
      </div>
    </Card>
  );
};

export default CardPlaceholder;
