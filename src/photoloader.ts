import { API_BASE_URL } from "./config.js";
import type { PhotoCollection } from "./PhotoCollection.js";

export function loadPhotos(): Promise<PhotoCollection> {
  return loadResource(`${API_BASE_URL}/photos`);
}

export function loadPicture(idPicture: number): Promise<any> {
  return loadResource(`${API_BASE_URL}/photos/${idPicture}`)
    .catch((error: unknown) => {
      console.error("Erreur de fetch sur l'image:", error);
      throw error;
    });
}


export function loadResource(uri: string): Promise<any> {
  return fetch(uri)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP! status: ${response.status}`);
      }
      return response.json();
    });
}

