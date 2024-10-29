import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

/* eslint-disable */
function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  const { cityName, emoji, date, id, position } = city; // After inspecting the city object we are destructuring some properties from the city object
  // but not all.

  //   Second way of storing the state in the URL is query string , Adding the data to the query string is really easy
  // All we have to do is , Add it to the path that the user will go to when the user click on the below link
  //  which is to={`${id}`}

  function handleClick(e) {
    e.preventDefault(); // This is written because if you see the below button is wrapped inside the <Link> component
    // and so if we click on the button then this link is automatically activating and redirecting to "/app/cities/:id/lat/lng"
    // So to prevent this from happening we have written this "e.preventDefault()"
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* Please remember don't put "/${id}" slash before the id because we want this id to be attached to the end of the already existing url */}
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
