// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

/* eslint-disable */

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition(); // We will use this "mapLat" and "mapLng" to do reverse geo-coding.

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  /* Get the location data from the URL  into this Form component which is reading the global state that is stored in the URL */

  // We want to fetch the above "lat" and "lng" data right from this Form component mounts.

  useEffect(
    function () {
      // The data that we are going to fetch here is not going into our global state which is into the global city's context
      // because this data is only relevant for creating a city's object that will be added to the array. So we need this data
      // right here only into this component.

      if (!lat && !lng) {
        return;
      }

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          ); // We are getting the "lat" and "lng" from the URL
          const data = await res.json();
          console.log(data);

          if (!data.countryCode) {
            throw new Error(
              "That doesn't seem to be a city. Please click somewhere else 😀" // Whatever we pass into this error (or)
              // throw this error will go into the catch block and it can be accessed through err.message
            );
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      fetchCityData();
    },
    [lat, lng] // Whenever these lat and lng changes then this useEffect will be triggered again.
  );

  async function handleSubmit(e) {
    e.preventDefault(); // Here we are writing the "e.preventDefault()" because our page will get hot reload which we donot
    // want in a single page application.

    if (!cityName || !date) {
      return;
    }

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    }; // We have to add this new city object to our fake API

    await createCity(newCity); // as this is an async function it will return a promise which will be resolved later. So we have to
    // await on this promise to resolve it.
    navigate("/app/cities"); // this will  navigate to "/app/cities"
  }

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (!lat && !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    // By default in HTML if we click on any button on the form then the form will be submitted automatically.
    // But if you see in the below form there are two buttons , one is "Back" and the other is "Add" Button but we want
    // only after clicking on only the  "Add" button the form has to be submitted. But when we click on the "Back" button
    // the form doesn't have to be submitted. So to prevent this what we did is , In the "Back" button we are writing
    // the "e.preventDefault()" so that the form doesn't get submitted when we click on the "Back" button.
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        {/* In the below label , in native HTML instead of htmlFor we have "for" but in React it has changed to "htmlFor" */}
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          id="date" // This is="date" is connected to the above htmlFor="date" in the <label> where when we click on this
          // label then the date picker will be displayed and  please remember that both id and htmlFor must be same.
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
