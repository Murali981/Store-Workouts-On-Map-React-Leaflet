import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {/* <li>
          <NavLink to="/">Home</NavLink>
          {/* When you <NavLink> for navigation between pages other than the <Link> , This <NavLink> will attach a active class 
          to the element on which you are clicking , Let us say below there are two link elements which are wrapped inside the <NavLink>
          element , So when you click on pricing link then the active class will be attached to this "pricing" link as "class=active"
          you can open up the developer tools and check the elements and then you can see the active class */}
        {/* </li> */}
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
