/* eslint-disable */

import { useNavigate, useSearchParams } from "react-router-dom";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css"; // Here "csm" is the short hand snippet to get this import automatically.
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

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
  const { cities } = useCities(); // This is a custom hook where we are mantaining the global state of our application.

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  ); // This useEffect() hook will run whenever the mapLat or mapLng changes and
  // it will set a new position in the map.

  useEffect(
    function () {
      if (geolocationPosition) {
        // In the beginning this geolocationPosition will be null , So the below code will not run but when we click
        // on the button "USE YOUR POSITION" then the geolocationPosition will get retrieved and then this geolocationPosition
        // state will get updated and then this effect will run due to changes in the geolocationPosition then inturn it will
        // set the map postion to our geolocationPosition where this whole component rerenders and finally the map will
        // move to the new position
        // If the geolocationPosition is available
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    [geolocationPosition]
  ); // We will run this Effect each time whenever the geolocationPosition
  // changes

  return (
    // In the below we are implementing the programmatic navigation using the useNavigate() hook where when we click on the map container
    // we will automatically navigate to the form component using the url "http://localhost:5174/app/form"
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        {/* In the above the MapContainer center prop expects an array of latitude and longitude and this is the reason
            we are describing the initial position of the map in this "const mapPosition = useState([40, 0])" useState() hook
        */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap(); // To get the current instance of the map that is currently being displayed.
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate(); // This useNavigate() hook will return a function called navigate(). Now using this navigate() function
  // we can move to any URL.
  useMapEvents({
    // The above useMapEvents() hook is provided by the react-leaflet library which takes in an object as an argument
    // where we can define few properties for different types of events and one of them is click event and this is a
    // bit of weird syntax (or) a bit of weird way of doing things but this is how it works in this react-leaflet library
    // Here to this click event we will specify a callback function which gets the current event and through this current
    // event we will navigate to the form.

    click: (e) => {
      // console.log(e); // This "e" is not the native event object by the "DOM" (or) "React" but this is really coming from the
      // // react-leaflet library

      /* 
      {originalEvent: PointerEvent, containerPoint: Point, layerPoint: Point, latlng: LatLng, type: 'click', …}
     containerPoint : Point {x: 817.8204455847675, y: 373}
     latlng : LatLng {lat: 33.247875947924385, lng: 0.9149609876118394}
     layerPoint : Point {x: 409.8204455847675, y: 567}
     originalEvent : PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …} 
     */

      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); // We are building a query string here with the
      // latitude and longitude
    }, // Here we are programatically navigating to the form path.
    // After navigating to the form and when a form component is rendered on our web browser and then we will fill this form
    // with the new city details and then we will create  a new city object which we will contain the new city position also
    // and to get the new position , We have to give this form component also access to the position where the click on the
    // form have occurred. So how can we do that ? We will do this by leveraging the power of the URL here and basically store the
    // state in the URL. Till now when we click anywhere on the map a form component is being rendered  with the path as
    // "localhost:5173/app/form" => but there is not latitude and longitude in this URL wherever the click happened on the map
    // then inside the form we can read easily data from the URL just like we did in the map component already. We are using the
    // global state to pass data between the pages
  }); // This hook is available in React-Leaflet library
}

export default Map;
