import useUrlState from "@ahooksjs/use-url-state";
import { useMemo } from "react";

import Filter from "@/components/Filter/Filter";
import Header from "@/components/Header/Header";
import Container from "@/components/ui/Container/Container";
import { useAppSelector } from "@/hooks/useAppSelector";
import ItemList from "@/components/favourites/ItemList/ItemList";

const FavouritesPage = () => {
  const [filter] = useUrlState({ query: "", type: "users" });
  const favourites = useAppSelector((state) => state.favourites);

  const isEmpty = useMemo(() => {
    if (filter.type === "repositories") {
      return favourites.repositories.length === 0;
    }

    return favourites.users.length === 0;
  }, [favourites.repositories.length, favourites.users.length, filter.type]);

  return (
    <Container style={{ justifyContent: isEmpty ? "center" : undefined }}>
      <Header />

      <Filter />

      <ItemList />
    </Container>
  );
};

export default FavouritesPage;
