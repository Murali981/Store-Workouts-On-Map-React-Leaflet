import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import City from "./components/City";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import Form from "./components/Form";

/* We will take the react router to the next level by actually storing the state in the URL so that we can use it in different places of the 
application. We can useState() hook also to store state but URL is also an excellent place to store the state and especially the UI state
   
        WHY DO WE WANT TO STORE THE STATE IN THE URL ?
        The first reason is , Placing the state in the URL is an easy way to store state in a global place that is easily accessible to all
        the components in the application. Before if we want to access the state to be accessible everywhere then we have to store it in a 
        parent component and then pass it all the way down to it's child components using props but if we place state in the URL then we can just
        read the value from the URL wherever the component is in the component tree. So basically we can move some react state management to the 
        URL and also placing state in the URL is , in many situations is a good way to pass data from one page into the next page without having to
        store the data in some temporary place  inside the app and another biggest advantage of placing the state in the URL is , we can bookmark
      (or) share the page with exact UI state

        (*) For storing the state in the URL , we use params (or) query string. Now params which stands for parameters are very useful to pass
      data to the next page  while the query string is used to store some global state that should be accessible everywhere.

        www.example.com/app/cities/lisbon?lat=32.78&lng=-9.141 => params=lisbon and queryString = lat=32.78&lng=-9.141

        To use params with React router we basically do it in three steps
          step 1) Create a new route
          step 2) Link to this new route
          step 3) From the route we will read the state from the URL

          Second way of storing the state in the URL is query string 
               
*/

/* eslint-disable */
/* WHEN WE NEED NESTED ROUTES */
/* We need nested routes when we want a part of the user interface to be controlled by a part of the URL. Remember that If we have a longer path
  in the URL doesn't mean that it is a nested route  but when it makes a nested route is "when a particular path influences what component is
  rendered inside the bigger component" "localhost:5174/app/cities" where this "/cities" is a nested route because it renders a seperate 
  component */

/* PROGRAMATIC NAVIGATION USING THE <NAVIGATE /> COMPONENT */

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        isLoading(false);
      } catch {
        alert("There was an error loading cities data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Below will be the HomePage which is going to render as soon as application loads as we keep this as a index route */}
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        {/* In the below app we are making a nested route as "/app/cities" , "/app/countries" and "/app/form" */}
        <Route path="app" element={<AppLayout />}>
          {/* We are adding an Index route here. An Index route is basically the default child route that is going to be matched if none of the 
          below child routes matches. So in the below we are creating a default which is index route */}
          {/* In the below two routes where one is index route and the another one is "cities" both are pointing to the same component
          which is <CityList /> . So now in the index route we are changing the element to use "<Navigate />" component which is given
          by the react-router-dom and the same as in the <Link> component we can specify the "to" prop in the <Navigate /> component */}
          <Route index element={<Navigate replace to="cities" />} />
          {/* You can think of the above <Navigate /> component is like a redirect where as soon as the index route got hit then it will 
           redirect us to the "cities" route which is the below "cities" route. The above "replace" keyword will replace the current
           element in the history stack */}
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          {/* In the above nested route "/app/cities" where we will display the above "<p>" in the UI (or) in other words how are we now
           going to display one component (or) one element inside another component and this is where the <outlet> component provided by the 
           react router comes into play. We want to display the above "<p>" inside the <SideBar> component. So we will use this "<Outlet />"
           element inside the SideBar component. */}
          <Route path="cities/:id" element={<City />} />
          {/* In the above URL "cities/:id" we have linked this URL to the City component and so whenever the URL matches this URL 
          we will render this City component */}
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        {/* When we put path="*" then it will catch all the routes that are not matching  to the one of the above three routes*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
