import useUrlState from "@ahooksjs/use-url-state";

import CardPlaceholder from "@/components/CardPlaceholder/CardPlaceholder";
import RepositoryCard from "@/components/RepositoryCard/RepositoryCard";
import {
  useGetRepositoriesQuery,
  useGetUsersQuery,
} from "@/redux/services/search";
import styles from "./ItemList.module.scss";
import { useMemo } from "react";
import UserCard from "@/components/UserCard/UserCard";

const ItemList = () => {
  const [filter] = useUrlState({
    type: "users",
    query: undefined,
    first: undefined,
    after: undefined,
    before: undefined,
    last: undefined,
  });

  const {
    data: repositoriesData,
    isFetching: isFetchingRepositoriesData,
    isError: isErrorRepositoriesData,
  } = useGetRepositoriesQuery(
    {
      query: filter.query,
      first: filter.first
        ? parseInt(filter.first)
        : filter.last
        ? undefined
        : 10,
      last: filter.last ? parseInt(filter.last) : undefined,
      after: filter.after,
      before: filter.before,
    },
    { skip: filter.type !== "repositories" || !filter.query }
  );

  const {
    data: usersData,
    isFetching: isFetchingUsersData,
    isError: isErrorUsersData,
  } = useGetUsersQuery(
    {
      query: filter.query,
      first: filter.first
        ? parseInt(filter.first)
        : filter.last
        ? undefined
        : 10,
      last: filter.last ? parseInt(filter.last) : undefined,
      after: filter.after,
      before: filter.before,
    },
    { skip: filter.type === "repositories" || !filter.query }
  );

  const isFetching = useMemo(
    () => isFetchingRepositoriesData || isFetchingUsersData,
    [isFetchingRepositoriesData, isFetchingUsersData]
  );

  const isError = useMemo(
    () => isErrorRepositoriesData || isErrorUsersData,
    [isErrorRepositoriesData, isErrorUsersData]
  );

  return (
    <section>
      <div className={styles.list}>
        {isFetching ? (
          [...Array(10)].map((_, index) => <CardPlaceholder key={index} />)
        ) : isError ? (
          <p>Error</p>
        ) : filter.type === "repositories" &&
          repositoriesData &&
          repositoriesData.repositories.length > 0 ? (
          repositoriesData.repositories.map((repository) => (
            <RepositoryCard key={repository.id} repository={repository} />
          ))
        ) : usersData && usersData.users.length > 0 ? (
          usersData.users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p>No data</p>
        )}
      </div>
    </section>
  );
};

export default ItemList;
