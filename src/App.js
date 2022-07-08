import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  // For the love of god remember to set this as an object before you go trying to change any values
  const [bounds, setBounds] = useState({});

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

  useEffect(() => {
    // Because getPlacesData is an async function, don't forget to call ".then" on it to continue
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      setPlaces(data);
    });
    // Our dependencies are these two because that way it gets rerun everytime they change
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        {/* This just means that the grid will have full width on mobile devices unless they're medium device size or larger. In which case only take 4 of the 12 spaces available up.*/}
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        {/* Because we want the map to take up more space than the List, we have it take up 8 of 12 available slots on medium or larger devices */}
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
