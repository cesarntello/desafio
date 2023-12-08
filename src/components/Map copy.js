import React, { useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

function MyMapComponent({ center, zoom }) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  }, []);

  return (
    <>
      <div ref={ref} id="map" style={{ width: 500, height: 500 }} />
      <h1>mostrando</h1>
    </>
  );
}

export default function Map() {
  const API = "AIzaSyDaE7dj6NwSMf6sPueJS7nJV9EOAYWfFD8";
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;
  const render = (status) => {
    if (status === Status.FAILURE) return <h1>Error</h1>;
    return <h1>cargandohhhh</h1>;
  };
  return (
    <div>
      <Wrapper apiKey={API} render={render}>
        <MyMapComponent center={center} zoom={zoom} />
      </Wrapper>
    </div>
  );
  //   const [location, setLocation] = useState({
  //     latitude: -34.603722,
  //     longitude: -58.381592,
  //   });

  //   const handleMapClick = (event) => {
  //     // Obtener las coordenadas del clic del mapa
  //     const { lat, lng } = event.latLng;

  //     // Actualizar la ubicación
  //     setLocation({
  //       latitude: lat,
  //       longitude: lng,
  //     });
  //   };

  //   const handlePlaceChanged = (place) => {
  //     // Obtener el nombre de la ciudad
  //     const city = place.address.city;

  //     // Actualizar la ubicación
  //     setLocation({
  //       latitude: place.geometry.location.lat(),
  //       longitude: place.geometry.location.lng(),
  //       city,
  //     });
  //   };

  //   return (

  //     <GoogleMap
  //       zoom={15}
  //       center={location}
  //       onMapClick={handleMapClick}
  //       onPlaceChanged={handlePlaceChanged}
  //     >
  //       <Marker position={location} />
  //     </GoogleMap>
  //   );
}
