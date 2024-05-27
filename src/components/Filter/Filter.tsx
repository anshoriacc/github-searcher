import { useCallback, useMemo } from "react";
import { useDebounceCallback } from "usehooks-ts";
import useUrlState from "@ahooksjs/use-url-state";

import Input from "@/components/ui/Input/Input";
import styles from "./Filter.module.scss";
import Select from "@/components/ui/Select/Select";
import { useLocation } from "react-router-dom";

const Filter = () => {
  const location = useLocation();

  const typeOptions = useMemo(
    () => [
      { label: "Users", value: "users" },
      {
        label: "Repositories",
        value: "repositories",
      },
    ],
    []
  );

  const [filter, setFilter] = useUrlState({
    type: "users",
    query: undefined,
    first: 10,
    after: undefined,
    before: undefined,
    last: undefined,
  });

  const handleFilterChange = useCallback(
    (key: keyof typeof filter, value: string) => {
      setFilter({
        [key]: value || undefined,
        first: undefined,
        after: undefined,
        before: undefined,
        last: undefined,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );

  const debouncedHandleFilterChange = useDebounceCallback(
    handleFilterChange,
    500
  );

  return (
    <section className={styles.filter}>
      {location.pathname === "/" && (
        <Input
          defaultValue={filter.query}
          onChange={(e) => debouncedHandleFilterChange("query", e.target.value)}
          type="search"
          placeholder="Typing to search users or repositories"
        />
      )}

      <Select
        value={filter.type === "repositories" ? "repositories" : "users"}
        onChange={(e) => handleFilterChange("type", e.target.value)}
      >
        {typeOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </section>
  );
};

export default Filter;
