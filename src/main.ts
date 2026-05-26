import { loadPicture, loadResource } from "./photoloader.js";
import { displayPicture, displayCategorie, displayComments } from "./UI.js";
import { first, last, load, next, prev } from "./gallery.js";
import { display_galerie } from "./gallery_ui.js";
import type { Picture } from "./UI.js";

function getPicture(id: number): void {
  loadPicture(id)
    .then((p: any) => {
      displayPicture(p);
      return Promise.all([getCategorie(p), getComments(p)]);
    })
    .then((data_array: any[]) => {
      displayCategorie(data_array[0]);
      displayComments(data_array[1]);
    })

    .catch((error: unknown) => {
      console.error("Erreur lors du chargement:", error);
    });
}

function getCategorie(imageData: any): Promise<any> {
  return loadResource(
    "https://webetu.iutnc.univ-lorraine.fr" + imageData.links.categorie.href,
  );
}

function getComments(imageData: any): Promise<any> {
  return loadResource(
    "https://webetu.iutnc.univ-lorraine.fr" + imageData.links.comments.href,
  );
}

const hash = window.location.hash;
if (hash) {
  const id = parseInt(hash.substring(1));
  if (!isNaN(id)) {
    // getPicture(id);
  }
} else {
}

let currentLinks: {
  next?: { href: string };
  prev?: { href: string };
  first?: { href: string };
  last?: { href: string };
} = {};

const btnGallery = document.getElementById("btn-load-gallery");

if (btnGallery) {
  btnGallery.addEventListener("click", () => {
    load()
      .then((data) => {
        currentLinks = data.links;
        display_galerie(data);
        updateGalleryButtons();
      })
      .catch((error: unknown) =>
        console.error("Erreur chargement galerie:", error),
      );
  });

  const btnPrevGallery = document.getElementById("btn-prev-gallery");
  if (btnPrevGallery) {
    btnPrevGallery.addEventListener("click", () => {
      if (!currentLinks.prev) return;
      prev(currentLinks)
        .then((data: any) => {
          currentLinks = data.links;
          display_galerie(data);
          updateGalleryButtons();
        })
        .catch((error: unknown) =>
          console.error("Erreur chargement galerie précédente:", error),
        );
    });
  }

  const btnNextGallery = document.getElementById("btn-next-gallery");
  if (btnNextGallery) {
    btnNextGallery.addEventListener("click", () => {
      if (!currentLinks.next) return;
      next(currentLinks)
        .then((data: any) => {
          currentLinks = data.links;
          display_galerie(data);
          updateGalleryButtons();
        })
        .catch((error: unknown) =>
          console.error("Erreur chargement galerie suivante:", error),
        );
    });
  }

  const btnFirstGallery = document.getElementById("btn-first-gallery");
  if (btnFirstGallery) {
    btnFirstGallery.addEventListener("click", () => {
      if (!currentLinks.first) return;
      first(currentLinks)
        .then((data: any) => {
          currentLinks = data.links;
          display_galerie(data);
          updateGalleryButtons();
        })
        .catch((error: unknown) =>
          console.error("Erreur chargement première galerie:", error),
        );
    });
  }

  const btnLastGallery = document.getElementById("btn-last-gallery");
  if (btnLastGallery) {
    btnLastGallery.addEventListener("click", () => {
      if (!currentLinks.last) return;
      last(currentLinks)
        .then((data: any) => {
          currentLinks = data.links;
          display_galerie(data);
          updateGalleryButtons();
        })
        .catch((error: unknown) =>
          console.error("Erreur chargement dernière galerie:", error),
        );
    });
  }

  function updateGalleryButtons() {
    if (currentLinks.next) {
      btnNextGallery?.removeAttribute("disabled");
    } else {
      btnNextGallery?.setAttribute("disabled", "true");
    }

    if (currentLinks.prev) {
      btnPrevGallery?.removeAttribute("disabled");
    } else {
      btnPrevGallery?.setAttribute("disabled", "true");
    }

    if (currentLinks.first) {
      btnFirstGallery?.removeAttribute("disabled");
    } else {
      btnFirstGallery?.setAttribute("disabled", "true");
    }

    if (currentLinks.last) {
      btnLastGallery?.removeAttribute("disabled");
    } else {
      btnLastGallery?.setAttribute("disabled", "true");
    }
  }

  updateGalleryButtons();
}

const currentGallery = document.getElementById("la_galerie");
if (currentGallery) {
  currentGallery.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const photoId = target.closest<HTMLElement>("[data-photo-id]")?.dataset.photoId;
    if (photoId) {
      getPicture(parseInt(photoId));
    }
  });
}

const lightbox = document.getElementById("lightbox");
const btnClose = document.getElementById("lightbox-close");

if (btnClose && lightbox) {
  btnClose.addEventListener("click", () => {
    lightbox.classList.add("hidden");
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
    }
  });
}
;