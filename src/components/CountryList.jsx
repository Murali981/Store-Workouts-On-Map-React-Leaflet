import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";

/* eslint-disable */
function CountryList({ cities, isLoading }) {
  if (isLoading) {
    <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const countries = cities.reduce((arr, city) =>
    // Check if the array already contains the current city (or) not ?
    {
      if (!arr.map((el) => el.country).includes(city.country)) {
        // Here we are mapping over the array and then el.country which will basically create an array of all the cities that are already in the
        // countries array and then we will ask if this includes the country in the  current city and so if the current country is not yet in this
        // array that we are creating here using map then we are returning a new array which will contain all the current elements plus a new one
        // which contains the country and the emoji
        return [...arr, { country: city.country, emoji: city.emoji }];
      } else {
        // If the countries array already includes the current country then we will just return the current countries array
        return arr;
      }
    }, []); // We will derive these countries from the cities array. Each iteration of this reduce
  // method we will get access to a accumulator(array) and the current value(city) which is going to be the current city. In the starter value of the accumulator
  // it is going to be the empty array. Into this array we will place new unique objects

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
