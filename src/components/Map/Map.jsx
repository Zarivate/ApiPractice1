import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

// These values are all changed via GoogleMapReact/detected by GoogleMapReact
const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
  const classes = useStyles();
  // This variable will be set to false if the width of the device is less than 600px
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        // 50 to the top, 50 on the right, 50 on the bottom, and 50 on the left side
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          // When a change is detected, we set the "setCoordinates" variable to an object that has the properties we need to alter the value
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          // Same idea for the "setBounds" variable
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        // Is used when you click on a restaurant on the map
        onChildClick={""}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {/* Depending if user is on mobile or desktop, what we will show changes */}
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                />
                {/* readonly is placed here because we don't want our user changing it */}
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
