import { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { RiGitRepositoryFill } from "react-icons/ri";

import { TUser } from "@/redux/services/type";
import Card from "../ui/Card/Card";
import styles from "./UserCard.module.scss";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addUser, removeUser } from "@/redux/reducers/favouriteSlice";
import { FaHeart } from "react-icons/fa";

type Props = {
  user: TUser;
};

const UserCard = ({ user }: Props) => {
  const favourites = useAppSelector((state) => state.favourites.users);
  const dispatch = useAppDispatch();

  const isFavourite = useMemo(
    () => !!favourites.find((favourite) => favourite.id === user.id),
    [favourites, user.id]
  );

  const handleClick = useCallback(() => {
    if (isFavourite) {
      dispatch(removeUser(user));
    } else {
      dispatch(addUser(user));
    }
  }, [dispatch, isFavourite, user]);

  return (
    <Card className={styles["user-card"]}>
      <button onClick={handleClick} className={styles["button-favourite"]}>
        <FaHeart size={20} color={isFavourite ? "#FF78AE" : "gray"} />
      </button>

      <img src={user.avatarUrl} alt={`avatar ${user.name}`} draggable={false} />

      <div className={styles.info}>
        <Link to={user.url} target="_blank">
          <h3>{user.name}</h3>

          <span>{user.login}</span>
        </Link>

        <p>{user.bio || user.description}</p>

        {user.location && (
          <span className={styles["other-props"]}>
            <FaLocationDot size={16} />
            {user.location}
          </span>
        )}

        <span className={styles["other-props"]}>
          <RiGitRepositoryFill size={16} />
          {user.repositories?.totalCount ?? 0} repositories
        </span>
      </div>
    </Card>
  );
};

export default UserCard;
