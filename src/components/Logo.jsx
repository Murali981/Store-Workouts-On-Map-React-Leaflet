import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    // Here why we are using <Link> instead of <NavLink> is because we don't want any special styles when it is selected
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
