import useUrlState from "@ahooksjs/use-url-state";

import RepositoryCard from "@/components/RepositoryCard/RepositoryCard";
import styles from "./ItemList.module.scss";
import UserCard from "@/components/UserCard/UserCard";
import { useAppSelector } from "@/hooks/useAppSelector";

const ItemList = () => {
  const [filter] = useUrlState({
    type: "users",
  });

  const favourites = useAppSelector((state) => state.favourites);

  return (
    <section>
      <div className={styles.list}>
        {filter.type === "repositories"
          ? favourites.repositories.map((repository) => (
              <RepositoryCard key={repository.id} repository={repository} />
            ))
          : favourites.users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
      </div>
    </section>
  );
};

export default ItemList;
