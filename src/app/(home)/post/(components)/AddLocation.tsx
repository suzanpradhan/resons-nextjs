import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  MapCameraChangedEvent,
  MapMouseEvent,
} from '@vis.gl/react-google-maps/dist/components/map/use-map-events';
import { NavigationArrow } from 'phosphor-react';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const API_KEY = 'AIzaSyCdAQJrGrDGP53RUF4yuBz0u0MmUvv0Tj8';
const DEFAULT_CENTER = { lat: 22.54992, lng: 0 };

interface LatLngJsonType {
  lat: number;
  lng: number;
}

interface PlacesAutocompleteType {
  setMarkerPosition: Dispatch<SetStateAction<LatLngJsonType>>;
}

const PlacesAutocomplete = ({ setMarkerPosition }: PlacesAutocompleteType) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const placesLib = useMapsLibrary('places');
  useEffect(() => {
    if (!placesLib) return;

    const defaultBounds = {
      north: DEFAULT_CENTER.lat + 0.1,
      south: DEFAULT_CENTER.lat - 0.1,
      east: DEFAULT_CENTER.lng + 0.1,
      west: DEFAULT_CENTER.lng - 0.1,
    };

    const searchBox = new placesLib.SearchBox(inputRef.current!, {
      bounds: defaultBounds,
    });
    console.log('Autocomplete instance:', searchBox);

    searchBox.addListener('places_changed', () => {
      const place = searchBox.getPlaces();
      const location = place?.[0].geometry?.location?.toJSON();
      setMarkerPosition(location!);
    });
  }, [placesLib, inputRef]);
  return (
    <input
      ref={inputRef}
      className="py-3 grow px-4 h-11 border rounded-md focus:outline-none placeholder:text-sm text-sm text-gray-700 font-normal border-gray-200"
    />
  );
};

const AddLocation = () => {
  const [markerPosition, setMarkerPosition] =
    useState<LatLngJsonType>(DEFAULT_CENTER);

  // console.log(useMapsLibrary('places'));
  const handleCenterChange = (map: MapCameraChangedEvent) => {
    const newCenter = map.detail.center;
    setMarkerPosition(newCenter);
  };

  const handleMapClick = (map: MapMouseEvent) => {
    map.map.setCenter(map.detail.latLng!);
  };

  const handleClick = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setMarkerPosition(pos);
    });
  };

  return (
    <div>
      <APIProvider apiKey={API_KEY!}>
        <div className="flex flex-col ">
          <div className="flex my-2">
            <PlacesAutocomplete setMarkerPosition={setMarkerPosition} />
            <button
              type="button"
              className="px-2 bg-white ml-2 rounded-md "
              onClick={handleClick}
            >
              <NavigationArrow size={26} />
            </button>
          </div>
          <Map
            onCenterChanged={(map) => handleCenterChange(map)}
            zoom={8}
            center={markerPosition}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            className="w-full h-96"
            onClick={(map) => handleMapClick(map)}
          >
            <Marker position={markerPosition} />
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default AddLocation;
