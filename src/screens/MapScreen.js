import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Polygon, Marker, Callout } from "react-native-maps";

function MapScreen({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 34.0522,
    longitude: -118.2437,
    latitudeDelta: 0.6,
    longitudeDelta: 0.6,
  });

  const darkMode = [
    // Define your dark map style here (as mentioned in the previous example)
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
    // ...
  ];
  const lightMode = [];

  const shouldLightenCell = (rowIndex, columnIndex) => {
    // Define the condition under which a specific grid cell should be lightened
    return (
      (columnIndex === 3 && rowIndex === 7) || // Example condition
      (columnIndex === 2 && rowIndex === 5) // Another example condition
      // Add more conditions as needed
    );
  };

  const createGrid = () => {
    const gridPolygons = [];
    const gridRows = 10;
    const gridColumns = 10;

    const northwestCorner = { latitude: 34.215635, longitude: -118.639871 };
    const southeastCorner = { latitude: 33.750811, longitude: -118.11257 };

    const latStep =
      (northwestCorner.latitude - southeastCorner.latitude) / gridRows;
    const lngStep =
      (southeastCorner.longitude - northwestCorner.longitude) / gridColumns;

    // Add the entire grid
    gridPolygons.push(
      <Polygon
        key={`all-grid`}
        coordinates={[
          {
            latitude: northwestCorner.latitude,
            longitude: northwestCorner.longitude,
          },
          {
            latitude: southeastCorner.latitude,
            longitude: northwestCorner.longitude,
          },
          {
            latitude: southeastCorner.latitude,
            longitude: southeastCorner.longitude,
          },
          {
            latitude: northwestCorner.latitude,
            longitude: southeastCorner.longitude,
          },
        ]}
        strokeColor="transparent"
        fillColor="transparent"
      />
    );

    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridColumns; j++) {
        if (shouldExcludeCell(i, j)) {
          continue;
        }

        const cellCoordinates = [
          {
            latitude: northwestCorner.latitude - latStep * i,
            longitude: northwestCorner.longitude + lngStep * j,
          },
          {
            latitude: northwestCorner.latitude - latStep * (i + 1),
            longitude: northwestCorner.longitude + lngStep * j,
          },
          {
            latitude: northwestCorner.latitude - latStep * (i + 1),
            longitude: northwestCorner.longitude + lngStep * (j + 1),
          },
          {
            latitude: northwestCorner.latitude - latStep * i,
            longitude: northwestCorner.longitude + lngStep * (j + 1),
          },
        ];

        if (shouldLightenCell(i, j)) {
          gridPolygons.push(
            <Polygon
              key={`row-${i}-col-${j}`}
              coordinates={cellCoordinates}
              strokeColor="black"
              fillColor="rgba(255, 255, 0, 0.3)"
            />
          );
        }
      }
    }
    return gridPolygons;
  };

  const markers = [
    {
      id: 1,
      coordinate: { latitude: 34.1184, longitude: -118.3004 }, // Griffith Observatory
      title: "Griffith Observatory",
      description: "An iconic observatory with great views of the city.",
    },
    {
      id: 2,
      coordinate: { latitude: 34.0089, longitude: -118.4974 }, // Santa Monica Pier
      title: "Santa Monica Pier",
      description: "A famous pier with an amusement park and aquarium.",
    },
    {
      id: 3,
      coordinate: { latitude: 34.0689, longitude: -118.4436 }, // Bruin Bear
      title: "Bruin Bear",
      description: "UCLA's beloved Bruin Bear statue.",
    },
    {
      id: 4,
      coordinate: { latitude: 34.1381, longitude: -118.3534 }, // Universal Studios
      title: "Universal Studios",
      description: "The famous Universal Studios Hollywood theme park.",
    },
    {
      id: 5,
      coordinate: { latitude: 34.1017, longitude: -118.3314 }, // Walk of Fame
      title: "Walk of Fame",
      description: "The Hollywood Walk of Fame featuring celebrity stars.",
    },
    {
      id: 6,
      coordinate: { latitude: 34.1341, longitude: -118.3215 }, // Hollywood Sign
      title: "Hollywood Sign",
      description: "The iconic Hollywood Sign in the Hollywood Hills.",
    },
    {
      id: 7,
      coordinate: { latitude: 34.0522, longitude: -118.2571 }, // Crypto Arena
      title: "Crypto Arena",
      description: "A popular venue for cryptocurrency events.",
    },
    {
      id: 8,
      coordinate: { latitude: 34.0736, longitude: -118.24 }, // Dodgers Stadium
      title: "Dodgers Stadium",
      description: "The home stadium of the Los Angeles Dodgers.",
    },
    {
      id: 9,
      coordinate: { latitude: 34.0505, longitude: -118.2483 }, // Grand Central Market
      title: "Grand Central Market",
      description: "A historic public market with diverse food vendors.",
    },
    {
      id: 10,
      coordinate: { latitude: 34.0586, longitude: -118.4175 }, // Century City
      title: "Century City",
      description: "A commercial and residential district in West Los Angeles.",
    },
    {
      id: 11,
      coordinate: { latitude: 34.0626, longitude: -118.3355 }, // Rocco's Tavern
      title: "Rocco's Tavern",
      description: "A popular sports bar and restaurant in Los Angeles.",
    },
  ];


  function shouldExcludeCell(rowIndex, columnIndex) {
    // Define the logic to exclude cells (if any)
    return false; // Include all cells by default
  }
  const calloutStyles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: "#fff",
      elevation: 4,
    },
    title: {
      fontWeight: "bold",
      fontSize: 16,
    },
    description: {
      marginTop: 5,
      fontSize: 14,
    },
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        provider="google"
        customMapStyle={darkMode}
      >
        {createGrid()}
        {/* Add markers with callouts */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          >
            <Callout>
              <View>
                <Text style={calloutStyles.title}> {marker.title}</Text>
                <Text style={calloutStyles.description}> {marker.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
