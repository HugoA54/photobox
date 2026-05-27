import { API_BASE_URL } from "./config.js";
import type { PhotoCollection } from "./PhotoCollection.js";
import type { PictureDetail } from "./PictureDetail.js";

export function loadPhotos(): Promise<PhotoCollection> {
  return loadResource<PhotoCollection>(`${API_BASE_URL}/photos`);
}

export function loadPicture(idPicture: number): Promise<PictureDetail> {
  return loadResource<PictureDetail>(`${API_BASE_URL}/photos/${idPicture}`)
    .catch((error: unknown) => {
      console.error("Erreur de fetch sur l'image:", error);
      throw error;
    });
}

export function loadResource<T>(uri: string): Promise<T> {
  return fetch(uri)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP! status: ${response.status}`);
      }
      return response.json() as Promise<T>;
    });
}

