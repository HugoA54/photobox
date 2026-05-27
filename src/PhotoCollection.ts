import type { PhotoItem } from "./PhotoItem.js";

export interface PhotoCollection {
  type: string;
  count: number;
  size: number;
  links: {
    next?: { href: string };
    prev?: { href: string };
    last?: { href: string };
    first?: { href: string };
  };
  photos: PhotoItem[];
}
