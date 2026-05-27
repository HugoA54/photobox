import { loadPhotos, loadResource } from "./photoloader.js";
import type { PhotoItem } from "./PhotoItem.js";
import type { PhotoCollection } from "./PhotoCollection.js";

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
    
export function first(currentLinks: Gallery["links"]): Promise<Gallery> {
    if (!currentLinks.first) {
        return Promise.reject(new Error("Pas de lien 'first' disponible"));
    }
    return loadResource("https://webetu.iutnc.univ-lorraine.fr" + currentLinks.first.href);
}

export function last(currentLinks: Gallery["links"]): Promise<Gallery> {
    if (!currentLinks.last) {
        return Promise.reject(new Error("Pas de lien 'last' disponible"));
    }
    return loadResource("https://webetu.iutnc.univ-lorraine.fr" + currentLinks.last.href);
}