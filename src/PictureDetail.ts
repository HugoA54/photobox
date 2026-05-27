export interface PictureDetail {
  photo: {
    id: number;
    titre: string;
    file: string;
    url: { href: string };
    descr: string;
    thumbnail: { href: string };
    original: { href: string };
  };
  links: {
    self: { href: string };
    categorie: { href: string };
    comments: { href: string };
  };
}
