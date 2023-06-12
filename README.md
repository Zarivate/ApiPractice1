# Working Demo

For a working demo of this site please visit [`here`](https://648621f7d2a28e47274b0d10--jazzy-gaufre-859dfa.netlify.app/).

Note: Will need to give site access to location to properly work.

## Getting Started

Install [`Node.js`](https://nodejs.org/en) if not already installed

## Installing Dependencies

Run this command within your terminal IDE

```Javascript
npm install @material-ui/core @material-ui/icons @material-ui/lab @react-google-maps/api axios google-map-react
```

Retrieve a RapidAPI Key from [`here`](https://rapidapi.com/apidojo/api/travel-advisor)

Note: You may be required to signUp for RapidAPI before being allowed access.

Afterwards, place API key within the index.js file. Replacing the .env in the headers like so.

```Javascript

headers: {
    "X-RapidAPI-Key": TravelAdvisor API key goes here,
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
}

headers: {
    "X-RapidAPI-Key": TravelAdvisor API key goes here,
    "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
},
```

Retrieve a Google Maps API key from [`here`](https://cloud.google.com/blog/products/maps-platform). A signup for Google may be necessary if you don't already have an account.

Afterwards, place the API key within the Map.jsx file.

```Javascript
bootstrapURLKeys={{
          key: Google Maps API key goes here,
        }}
```

## Known Issues

1. Blocking access to location results in empty attraction and no Google Maps.

2. Use of a VPN prevents any results from populating, even when allowed access to VPN location.
