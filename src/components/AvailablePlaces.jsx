import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAlltheData } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      setFetchData(true);
      try {
        const places = await fetchAlltheData();
        navigator.geolocation.getCurrentPosition((postion) => {
          const sortData = sortPlacesByDistance(
            places,
            postion.coords.altitude,
            postion.coords.longitude
          );
          setAvaliablePlaces(sortData);
          setFetchData(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "could not fetch places, please try again later",
        });
      }
      setFetchData(false);
    };
    fetchApi();
  }, []);

  if (error) {
    return (
      <Error title="could not able to fetch a data" message={error.message} />
    );
  }

  return (
    <Places
      title="Available Places"
      places={avaliablePlaces}
      isLoading={fetchData}
      loadingText="Fetching a data from database....."
      fallbackText="Fetching a data from database....."
      onSelectPlace={onSelectPlace}
    />
  );
}
