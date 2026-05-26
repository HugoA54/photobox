import type { Gallery } from "./gallery.js";

const BASE_URL = "https://webetu.iutnc.univ-lorraine.fr";

export function display_galerie(gallery: Gallery): void {
  const container = document.getElementById("la_galerie");
  if (!container) {
    console.error("Conteneur #la_galerie introuvable");
    return;
  }

  container.innerHTML = "";

  for (const item of gallery.photos) {
    const figure = document.createElement("figure");
    figure.dataset.photoId = String(item.photo.id);

    const img = document.createElement("img");
    img.src = BASE_URL + item.photo.thumbnail.href;
    img.alt = item.photo.titre;

    const caption = document.createElement("figcaption");
    caption.textContent = item.photo.titre;

    figure.appendChild(img);
    figure.appendChild(caption);
    container.appendChild(figure);
  }
}
