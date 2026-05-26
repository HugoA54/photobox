import { loadPhotos } from "./photoloader.js";
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
