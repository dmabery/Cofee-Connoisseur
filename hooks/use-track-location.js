import { useState } from "react";

const useTrackLocation = () => {

    const [locationErrorMsg, setLocationErrorMessage] = useState('');

    const [latLong, setLatLong] = useState('');

    const [isFindingLocation, setIsFindingLocation] = useState(false);

    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitutde = position.coords.longitutde;

      setLatLong(`${latitude}, ${longitutde}`);
      setLocationErrorMessage('');
      setIsFindingLocation(false);

    };

    const error = () => {
      setIsFindingLocation(false);
      setLocationErrorMessage('Unable to retrieve your location');

    }

    const handleTrackLocation = () => {
      setIsFindingLocation(true);
        if(!navigator.geolocation) {
            setLocationErrorMessage('Geolocation is not supported by your browser')
            setIsFindingLocation(false)
          } else {
            /* status.textContent = 'Locating…'; */
            navigator.geolocation.getCurrentPosition(success, error);
          }

    }

    return {
      latLong,
      handleTrackLocation,
      locationErrorMsg,
      isFindingLocation,
    }
}

export default useTrackLocation;