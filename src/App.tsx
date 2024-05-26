import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import HomePage from "@/pages/Home/Home";
import store from "@/redux/store";
import FavouritesPage from "@/pages/Favourites/Favourites";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/favourites", element: <FavouritesPage /> },
]);

const App = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
};

export default App;
