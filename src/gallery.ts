import { loadPhotos, loadResource } from "./photoloader.js";
import type { PhotoItem, PhotoCollection } from "./photoloader.js";

export interface Gallery {
  photos: PhotoItem[];
  links: PhotoCollection["links"];
  count: number;
  size: number;
}

export function load(): Promise<Gallery> {
  return loadPhotos().then((collection) => ({
    photos: collection.photos,
    links: collection.links,
    count: collection.count,
    size: collection.size,
  }));
}

export function next(currentLinks: Gallery["links"]): Promise<Gallery> {
    if (!currentLinks.next) {
        return Promise.reject(new Error("Pas de lien 'next' disponible"));
    }
    return loadResource("https://webetu.iutnc.univ-lorraine.fr" + currentLinks.next.href);
}

export function prev(currentLinks: Gallery["links"]): Promise<Gallery> {
    if (!currentLinks.prev) {
        return Promise.reject(new Error("Pas de lien 'prev' disponible"));
    }
    return loadResource("https://webetu.iutnc.univ-lorraine.fr" + currentLinks.prev.href);
}
    