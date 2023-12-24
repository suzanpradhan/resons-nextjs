import { Wrapper } from '@googlemaps/react-wrapper';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };
const DEFAULT_ZOOM = 7;

const GoogleMapsWrapper = ({ children }: { children: React.ReactNode }) => {
  // Ideally we want the apiKey to be fetch from an environment variable
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};

interface GoogleMapstype {
  markerPosition: {
    lat: number;
    lng: number;
  };
  setMarkerPosition: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  userLocation: string;
  setUserLocation: Dispatch<SetStateAction<string>>;
}

const GoogleMaps = ({
  markerPosition,
  setMarkerPosition,
  userLocation,
  setUserLocation,
}: GoogleMapstype) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();

    function geocode(request: any): void {
      geocoder
        .geocode(request)
        .then((result) => {
          const { results } = result;
          console.log(result);
          mapRef.current.setCenter(results[0].geometry.location);
          markerRef.current.setPosition(results[0].geometry.location);
          return results;
        })
        .catch((e) => {
          alert('Geocode was not successful for the following reason: ' + e);
        });
    }
    if (ref.current) {
      mapRef.current = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        disableDefaultUI: true,
      });

      markerRef.current = new window.google.maps.Marker({
        position: DEFAULT_CENTER,
        label: 'saf',
        map: mapRef.current,
      });

      window.google.maps.event.addListener(
        mapRef.current,
        'center_changed',
        function () {
          const newCenter = mapRef.current.getCenter()?.toJSON();
          markerRef.current.setPosition(newCenter);
          setMarkerPosition(newCenter);
        }
      );

      // window.google.maps.event.addListener(mapRef.current, 'click', (e) => {
      //   console.log('geda');
      //   geocode({ location: e.latLng });
      // });
    }
  }, [ref]);

  return <div ref={ref} className="w-full h-96"></div>;
};

const AddLocation = () => {
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState<string>('');
  const handleLocationChange = () => {};

  return (
    <div>
      <input
        value={JSON.stringify(markerPosition)}
        className="w-full px-4 py-2"
        onChange={handleLocationChange}
      />
      <GoogleMapsWrapper>
        <GoogleMaps
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
          setUserLocation={setUserLocation}
          userLocation={userLocation}
        />
      </GoogleMapsWrapper>
    </div>
  );
};

export default AddLocation;
