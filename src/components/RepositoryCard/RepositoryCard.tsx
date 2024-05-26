import { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FaHeart, FaStar } from "react-icons/fa";

import { TRepository } from "@/redux/services/type";
import Card from "../ui/Card/Card";
import styles from "./RepositoryCard.module.scss";
import Badge from "../ui/Badge/Badge";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  removeRepository,
  addRepository,
} from "@/redux/reducers/favouriteSlice";

type Props = {
  repository: TRepository;
};

const RepositoryCard = ({ repository }: Props) => {
  const favourites = useAppSelector((state) => state.favourites.repositories);
  const dispatch = useAppDispatch();

  const isFavourite = useMemo(
    () => !!favourites.find((favourite) => favourite.id === repository.id),
    [favourites, repository.id]
  );

  const handleClick = useCallback(() => {
    if (isFavourite) {
      dispatch(removeRepository(repository));
    } else {
      dispatch(addRepository(repository));
    }
  }, [dispatch, isFavourite, repository]);

  return (
    <Card className={styles["repository-card"]}>
      <button onClick={handleClick} className={styles["button-favourite"]}>
        <FaHeart size={20} color={isFavourite ? "#FF78AE" : "gray"} />
      </button>

      <div className={styles["wrapper"]}>
        <div className={styles.title}>
          <img
            src={repository.owner.avatarUrl}
            alt={`avatar ${repository.owner.login}`}
            draggable={false}
          />

          <Link to={repository.url} target="_blank">
            <h3>{repository.nameWithOwner}</h3>
          </Link>
        </div>

        <p className={styles.description}>{repository.description}</p>

        {repository.topics?.topics?.length > 0 && (
          <div className={styles["topics-wrapper"]}>
            {repository.topics.topics.map((topic, index) => (
              <Link
                key={index}
                to={topic.url}
                target="_blank"
                className={styles["badge-link"]}
              >
                <Badge>{topic.topic.name}</Badge>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className={styles["wrapper"]}>
        <div className={styles["other-props-wrapper"]}>
          {repository.language && (
            <>
              <span className={styles["other-props"]}>
                <span
                  style={{ backgroundColor: repository.language.color }}
                  className={styles["lang-dot"]}
                />
                {repository.language.name}
              </span>

              <span className={styles["other-props"]}>•</span>
            </>
          )}

          <Link to={`${repository.url}/stargazers`}>
            <span className={styles["other-props"]}>
              <FaStar size={16} />
              {repository.starred ?? 0}
            </span>
          </Link>
        </div>

        {/* date */}
        <span className={styles.date}>
          Updated on {dayjs(repository.updatedAt).format("DD MMM YYYY")}
        </span>
      </div>
    </Card>
  );
};

export default RepositoryCard;
