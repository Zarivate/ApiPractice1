import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classes = useStyles();

  // This contains all the element references that are clicked, empty array since at start none are clicked
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    // Since we don't need the first parameter and just the second, the first is just an underscore when we map over it
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions near you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            {/* Inside of e.target.value will be whatever the user decided to click on, be it if they click on hotels, attractions, etc */}
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {/* The "?." part just means that, only if there are "places"/isn't empty, then map over them. Also because the index is always given as the second parameter in the map function we can freely use it here*/}
            {/* Normally we would use curly braces here like in most map functions but we only use parentheses this time because all that's being returned is some JSX */}
            {places?.map((place, i) => (
              // For each place we'll return a grid item, and for extra small devices up to big ones the full width of the container that's 12 spaces
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                {/* We pass in our place variable as props to the PlaceDetails file */}
                <PlaceDetails
                  place={place}
                  // This is how we get the site to scroll to whatever the user clicked
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
