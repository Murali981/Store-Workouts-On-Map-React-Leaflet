/* eslint-disable */

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload], // spread operator of ...state.cities => gives all the current cities
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  //   const [cities, setCities] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [currentCity, setCurrentCity] = useState({}); // We need this state in multiple components in our application , So
  // we are placing this state into this city's provider and then pass this state into the below context provider which is
  // <CitiesContext.Provider value={{currentCity}}> => In this way we can use this state in multiple components

  console.log(cities);

  // We want to load the countries data which is coming from a fake API on mount (or) Initial render of the component
  //  of the application . So we are using useEffect hook here.
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
        // console.log("There was an error loading cities data");
      }
    }

    fetchCities();
  }, []);

  // Creating a function to get the current city
  const getCity = useCallback(
    async function getCity(id) {
      // We will get the City from our fake server based on the id of the city.
      console.log(id, currentCity.id); // Here the "id" is coming from the URL which  is a string and please remember that
      // Whatever coming from the URL is basically a string

      if (Number(id) === currentCity.id) {
        // Here that's why we are converting the "id" into a Number before comparing it
        // with the currentCity.id
        return;
      }

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    // We will get the City from our fake server based on the id of the city.
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      }); // This is just a standard way of creating a post request to the API which is basically sending some data to the
      // API
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    // We will get the City from our fake server based on the id of the city.
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      }); // This is just a standard way of creating a DELETE request to the API which is basically deleting some data from the
      // API
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
