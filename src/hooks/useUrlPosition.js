import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // We are trying to read the latitude and longitude from the URL . To do this we will use useSearchParams() hook given by the react-router
  const [searchParams] = useSearchParams(); // This useSearchParams() hook is similar to the useState() hook where it return an
  // array which has basically the current state which we will usually call searchParams and the second we will get a function with which we can set
  // the searchParams using setSearchParams() function where we will update the searchParams in this way.
  const lat = searchParams.get("lat"); // We are storing the latitude into this lat variable because this data is not directly accessible on the
  // searchParams where it is not like the object that gives us this data here but this is an object where we will call the get() function (or)
  // method. The above lat which is inside the get("lat") should match the "lat" in the url as the below
  // "http://localhost:5174/app/cities/17806751?lat=40.46635901755316&lng=-3.7133789062500004"

  const lng = searchParams.get("lng");

  return [lat, lng];
}
