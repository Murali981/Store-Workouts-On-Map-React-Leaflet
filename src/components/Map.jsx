/* eslint-disable */

import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css"; // Here "csm" is the short hand snippet to get this import automatically.

/* WHAT IS PROGRAMMATIC NAVIGATION ? 
    programmatic navigation basically means to move to a new URL without the user to click on any link and a common usecase of this behaviour is
    right after submitting a form. So many times when a user submits a form , We want them to move to a new page in our application automatically.
    So without having to click on any link. For this we can use the programmatic navigation.
 
     Why do we use programmatic navigation  here ? 
     In our Map container which is on the right side where the entire Map is displayed , And when the user clicks on anywhere in the entire map
     container we then want to move automatically to the form component
*/

/* WHAT IS USENAVIGATE() HOOK ?
      useNavigate() hook is used to navigate to a new URL. It takes a single argument which is the URL which we want to navigate to.
      this is provided by the react-router-dom   

  */

function Map() {
  const navigate = useNavigate(); // This useNavigate() hook will return a function called navigate(). Now using this navigate() function
  // we can move to any URL

  // We are trying to read the latitude and longitude from the URL . To do this we will use useSearchParams() hook given by the react-router
  const [searchParams, setSearchParams] = useSearchParams(); // This useSearchParams() hook is similar to the useState() hook where it return an
  // array which has basically the current state which we will usually call searchParams and the second we will get a function with which we can set
  // the searchParams using setSearchParams() function where we will update the searchParams in this way

  const lat = searchParams.get("lat"); // We are storing the latitude into this lat variable because this data is not directly accessible on the
  // searchParams where it is not like the object that gives us this data here but this is an object where we will call the get() function (or)
  // method. The above lat which is inside the get("lat") should match the "lat" in the url as the below
  // "http://localhost:5174/app/cities/17806751?lat=40.46635901755316&lng=-3.7133789062500004"
  const lng = searchParams.get("lng");

  return (
    // In the below we are implementing the programmatic navigation using the useNavigate() hook where when we click on the map container
    // we will automatically navigate to the form component using the url "http://localhost:5174/app/form"
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>MAP</h1>
      <h1>
        Position : {lat} , {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
        Change position
      </button>
    </div>
  );
}

export default Map;
