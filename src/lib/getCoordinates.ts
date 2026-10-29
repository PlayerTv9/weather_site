
import { coordinates } from "./dataClasses";

export async function getCoordinates(): Promise<coordinates> {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    throw new Error("La geolocalizzazione non è supportata");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const c: coordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          alt: position.coords.altitude,
          accuracy: position.coords.accuracy,
        };

        resolve(c);
      },
      (error) => {
        reject(new Error(error.message));
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 60000
      }
    );
  });
}
