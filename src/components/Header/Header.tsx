import { Link, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

import styles from "./Header.module.scss";
import { useCallback, useMemo } from "react";

const Header = () => {
  const navigations = useMemo(
    () => [
      { url: "/", name: "Home" },
      { url: "/favourites", name: "Favourites" },
    ],
    []
  );

  const location = useLocation();
  const isActive = useCallback(
    (url: string) => location.pathname === url,
    [location.pathname]
  );

  return (
    <header className={styles.header}>
      <FaGithub size={72} />

      <div>
        <h1>GitHub Searcher</h1>
        <p>Search users or repositories in GitHub.</p>

        <nav className={styles.nav}>
          {navigations.map((nav) => (
            <Link
              to={nav.url}
              key={nav.url}
              style={{
                backgroundColor: isActive(nav.url) ? "#171717" : undefined,
                color: isActive(nav.url) ? "white" : undefined,
              }}
            >
              {nav.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
