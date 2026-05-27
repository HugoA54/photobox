export interface PhotoItem {
  photo: {
    id: number;
    titre: string;
    file: string;
    thumbnail: { href: string };
    original: { href: string };
  };
  links: {
    self: { href: string };
  };
}
