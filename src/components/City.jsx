/* eslint-disable */

import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // To get (or) read the data from the URL , we use the useParams() hook which is provided by the react router
  const { id } = useParams();

  // We are trying to read the latitude and longitude from the URL . To do this we will use useSearchParams() hook given by the react-router

  const [searchParams, setSearchParams] = useSearchParams(); // This useSearchParams() hook is similar to the useState() hook where it return an
  // array which has basically the current state which we will usually call searchParams and the second we will get a function with which we can set
  // the searchParams using setSearchParams() function where we will update the searchParams in this way

  const lat = searchParams.get("lat"); // We are storing the latitude into this lat variable because this data is not directly accessible on the
  // searchParams where it is not like the object that gives us this data here but this is an object where we will call the get() function (or)
  // method. The above lat which is inside the get("lat") should match the "lat" in the url as the below
  // "http://localhost:5174/app/cities/17806751?lat=40.46635901755316&lng=-3.7133789062500004"
  const lng = searchParams.get("lng");

  // TEMP DATA
  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <>
      <h1>City {id}</h1>
      <h1>
        Position {lat} , {lng}
      </h1>
    </>
  );

  // return (
  //   <div className={styles.city}>
  //     <div className={styles.row}>
  //       <h6>City name</h6>
  //       <h3>
  //         <span>{emoji}</span> {cityName}
  //       </h3>
  //     </div>

  //     <div className={styles.row}>
  //       <h6>You went to {cityName} on</h6>
  //       <p>{formatDate(date || null)}</p>
  //     </div>

  //     {notes && (
  //       <div className={styles.row}>
  //         <h6>Your notes</h6>
  //         <p>{notes}</p>
  //       </div>
  //     )}

  //     <div className={styles.row}>
  //       <h6>Learn more</h6>
  //       <a
  //         href={`https://en.wikipedia.org/wiki/${cityName}`}
  //         target="_blank"
  //         rel="noreferrer"
  //       >
  //         Check out {cityName} on Wikipedia &rarr;
  //       </a>
  //     </div>

  //     <div></div>
  //   </div>
  // );
}

export default City;
