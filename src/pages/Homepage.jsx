import { Link } from "react-router-dom";
import styles from "./Homepage.module.css"; // We are getting the
// styles from the Homepage.module.css file which is one CSS module is
// created for every component seperately and we are also importing the
// styles object from the Homepage.module.css file.
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    // In the below we are applying the ".homepage" class with "styles.homepage"
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        {/* In the down we are using a global className which is "cta" */}
        <Link to="/login" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
