/* eslint-disable */

import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({}); // We need this state in multiple components in our application , So
  // we are placing this state into this city's provider and then pass this state into the below context provider which is
  // <CitiesContext.Provider value={{currentCity}}> => In this way we can use this state in multiple components

  console.log(cities);

  // We want to load the countries data which is coming from a fake API on mount (or) Initial render of the component
  //  of the application . So we are using useEffect hook here.
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        setIsLoading(false);
      } catch {
        alert("There was an error loading cities data");
        // console.log("There was an error loading cities data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  // Creating a function to get the current city
  async function getCity(id) {
    // We will get the City from our fake server based on the id of the city.

    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      setIsLoading(false);
    } catch {
      alert("There was an error loading cities data");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    // We will get the City from our fake server based on the id of the city.

    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      }); // This is just a standard way of creating a post request to the API which is basically sending some data to the
      // API
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating the city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    // We will get the City from our fake server based on the id of the city.

    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      }); // This is just a standard way of creating a DELETE request to the API which is basically deleting some data from the
      // API
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting the city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
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
