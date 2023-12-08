import * as React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import Container from "@mui/material/Container";

const render = (status) => {
  return <h1>{status}</h1>;
};

const API_LOCATION = "pk.4011a7183de0fdb3148f3f531e5d1642";

export const Mapa = ({ onMapNameChange }) => {
  const [clicks, setClicks] = React.useState([]);
  const [name, setName] = React.useState("");
  const [zoom, setZoom] = React.useState(3);
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0,
  });

  const getCityName = async (latLng) => {
    const latitude = latLng.lat();
    const longitude = latLng.lng();

    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${API_LOCATION}&lat=${latitude}&lon=${longitude}&format=json`
      );
      const name = await response.json();

      setName(name.display_name);
      if (onMapNameChange) {
        onMapNameChange(name.display_name);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const onClick = (e) => {
    setClicks([e.latLng]);
    getCityName(e.latLng);
  };

  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    ></div>
  );

  return (
    <div style={{ display: "flex", height: "300px", margin: "20px" }}>
      <Container maxWidth="sm">
        <Wrapper
          apiKey={"AIzaSyDaE7dj6NwSMf6sPueJS7nJV9EOAYWfFD8"}
          render={render}
        >
          <Map
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            zoom={zoom}
            style={{ flexGrow: "1", height: "300px", width: "100%" }}
          >
            {clicks.map((latLng, i) => (
              <Marker key={i} position={latLng} />
            ))}
          </Map>
        </Wrapper>
        {form}
      </Container>
    </div>
  );
};

const Map = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof window.google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof window.google.maps.LatLng
  ) {
    return new window.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
  }

  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
