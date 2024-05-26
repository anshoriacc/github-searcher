import useUrlState from "@ahooksjs/use-url-state";

import Container from "@/components/ui/Container/Container";
import Header from "@/components/Header/Header";
import Filter from "@/components/Filter/Filter";
import ItemList from "@/components/home/ItemList/ItemList";
import Pagination from "@/components/home/Pagination/Pagination";

const HomePage = () => {
  const [filter] = useUrlState({ query: "" });

  return (
    <Container style={{ justifyContent: !filter.query ? "center" : undefined }}>
      <Header />

      <Filter />

      {filter.query && <ItemList />}

      {filter.query && <Pagination />}
    </Container>
  );
};

export default HomePage;
