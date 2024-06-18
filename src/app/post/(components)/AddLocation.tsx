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
import { Crosshair } from 'phosphor-react';

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
      className="py-3 grow px-4 max-[356px]:px-3 h-11 max-[356px]:h-10 border rounded-md focus:outline-none placeholder:text-sm text-sm text-gray-700 font-normal border-gray-200"
    />
  );
};

const AddLocation = () => {
  const [markerPosition, setMarkerPosition] =
    useState<LatLngJsonType>(DEFAULT_CENTER);
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
    <APIProvider apiKey={API_KEY!}>
      <div className="flex flex-col flex-1">
        <div className="flex py-2 px-4 max-[356px]:px-3 bg-white">
          <PlacesAutocomplete setMarkerPosition={setMarkerPosition} />
          <button
            type="button"
            className="w-11 max-[356px]:wx-10 flex justify-center items-center bg-dark-500 ml-2 rounded-md "
            onClick={handleClick}
          >
            <Crosshair className="text-white text-2xl max-[356px]:text-xl" />
          </button>
        </div>
        <Map
          onCenterChanged={(map) => handleCenterChange(map)}
          zoom={14}
          center={markerPosition}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          className="w-full flex-1"
          onClick={(map) => handleMapClick(map)}
        >
          <Marker position={markerPosition} />
        </Map>
      </div>
    </APIProvider>
  );
};

export default AddLocation;
