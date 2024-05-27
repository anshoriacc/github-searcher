import Filter from "@/components/Filter/Filter";
import Header from "@/components/Header/Header";
import Container from "@/components/ui/Container/Container";
import ItemList from "@/components/favourites/ItemList/ItemList";

const FavouritesPage = () => {
  return (
    <Container>
      <Header />

      <Filter />

      <ItemList />
    </Container>
  );
};

export default FavouritesPage;
