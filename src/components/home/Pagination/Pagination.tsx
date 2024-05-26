import useUrlState from "@ahooksjs/use-url-state";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import {
  useGetRepositoriesQuery,
  useGetUsersQuery,
} from "@/redux/services/search";
import styles from "./Pagination.module.scss";
import Button from "@/components/ui/Button/Button";
import { useCallback, useMemo } from "react";

const Pagination = () => {
  const [filter, setFilter] = useUrlState(
    {
      type: "users",
      query: undefined,
      first: undefined,
      after: undefined,
      before: undefined,
      last: undefined,
    },
    { parseOptions: { parseNumbers: true } }
  );

  const { data: repositoriesData } = useGetRepositoriesQuery(
    {
      query: filter.query,
      first: filter.first ? filter.first : filter.last ? undefined : 10,
      last: filter.last,
      after: filter.after,
      before: filter.before,
    },
    { skip: filter.type !== "repositories" || !filter.query }
  );

  const { data: usersData } = useGetUsersQuery(
    {
      query: filter.query,
      first: filter.first ? filter.first : filter.last ? undefined : 10,
      last: filter.last,
      after: filter.after,
      before: filter.before,
    },
    { skip: filter.type === "repositories" || !filter.query }
  );

  const totalCount = useMemo(
    () => repositoriesData?.repositoryCount || usersData?.userCount,
    [repositoriesData?.repositoryCount, usersData?.userCount]
  );

  const hasNextPage = useMemo(() => {
    if (filter.type === "repositories") {
      return repositoriesData?.pageInfo.hasNextPage;
    }
    return usersData?.pageInfo.hasNextPage;
  }, [
    filter.type,
    repositoriesData?.pageInfo.hasNextPage,
    usersData?.pageInfo.hasNextPage,
  ]);

  const hasPreviousPage = useMemo(() => {
    if (filter.type === "repositories") {
      return repositoriesData?.pageInfo.hasPreviousPage;
    }
    return usersData?.pageInfo.hasPreviousPage;
  }, [
    filter.type,
    repositoriesData?.pageInfo.hasPreviousPage,
    usersData?.pageInfo.hasPreviousPage,
  ]);

  const handleNextPage = useCallback(() => {
    setFilter({
      after:
        repositoriesData?.pageInfo.endCursor || usersData?.pageInfo.endCursor,
      before: undefined,
      last: undefined,
      first: 10,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoriesData?.pageInfo.endCursor, usersData?.pageInfo.endCursor]);

  const handlePreviousPage = useCallback(() => {
    setFilter({
      before:
        repositoriesData?.pageInfo.startCursor ||
        usersData?.pageInfo.startCursor,
      after: undefined,
      last: 10,
      first: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoriesData?.pageInfo.startCursor, usersData?.pageInfo.startCursor]);

  if (!repositoriesData?.repositories?.length && !usersData?.users?.length) {
    return null;
  }

  return (
    <section className={styles.pagination}>
      <p>Total Item: {totalCount || 0}</p>

      <div className={styles.buttons}>
        <Button onClick={handlePreviousPage} disabled={!hasPreviousPage}>
          <FaChevronLeft />
        </Button>

        <Button onClick={handleNextPage} disabled={!hasNextPage}>
          <FaChevronRight />
        </Button>
      </div>
    </section>
  );
};

export default Pagination;
