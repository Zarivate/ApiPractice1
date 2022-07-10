import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  // useState for the new places depending on what rating the user chose to go by
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  // Another method to pass down to the Map component
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  // For the love of god remember to set this as an object before you go trying to change any values
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  // This accepts one parameter, which is whatever is set into the variable of "type"
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  // This useEffect is to get the user's location and set the coordinates to them at the start, thus this only runs at the start
  useEffect(() => {
    // The data we get from the user is destructured and then deconstructed again to get the latitude and longitude
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
    // Because this only runs at the start the dependency array is empty
  }, []);

  // This useEffect is for helping to properly filter out places by ratings
  useEffect(() => {
    // If place.rating is greater than the rating currently set, then return the correctly rated places
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  // This is for loading the proper places and their location depending on what the user chose
  useEffect(() => {
    // We only ever run this code if there are bounds, such as if we don't have the latitude, longitude, south west, and north east params, the nwe don't wanna make the request
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      // Because getPlacesData is an async function, don't forget to call ".then" on it to continue
      // We pass in "type" first so the function knows what data it needs to fetch
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        // We filter out any dummy restaurants with no reviews or images here. We check to see if it has a name and any number of reviews. If so return that place else not.
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        // Anytime we get new place data, we have to reset the filteredPlaces array
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
    // Our dependencies are these two because that way it gets rerun everytime they change
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      {/* The setCoordinates function is passed down to the Header so we can adjust the location data in the Header's "onPlaceChanged" function */}
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        {/* This just means that the grid will have full width on mobile devices unless they're medium device size or larger. In which case only take 4 of the 12 spaces available up.*/}
        <Grid item xs={12} md={4}>
          <List
            // If our filteredPlaces array has anything inside it, then we return that instead of places, else just return places
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        {/* Because we want the map to take up more space than the List, we have it take up 8 of 12 available slots on medium or larger devices */}
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
