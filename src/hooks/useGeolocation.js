import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  // This doesn't have to be a jsx file because we are not exporting any JSX but this is just a javascript function
  const [isLoading, setIsLoading] = useState(false);

  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation) {
      console.log("There is an error occured");
      return setError("Your browser does not support geolocation");
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
