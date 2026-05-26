import { loadPicture, loadResource } from "./photoloader.js";
import { displayPicture, displayCategorie, displayComments } from "./UI.js";
import { load, next, prev } from "./gallery.js";
import { display_galerie } from "./gallery_ui.js";

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
    return loadResource("https://webetu.iutnc.univ-lorraine.fr" + imageData.links.categorie.href);
}

function getComments(imageData: any): Promise<any> {
    return loadResource("https://webetu.iutnc.univ-lorraine.fr" + imageData.links.comments.href);
}

getPicture(106);

const hash = window.location.hash;
if (hash) {
    const id = parseInt(hash.substring(1));
    if (!isNaN(id)) {
        getPicture(id);
    }
}

let currentLinks: { next?: { href: string }; prev?: { href: string } } = {};

const btnGallery = document.getElementById("btn-load-gallery");
if (btnGallery) {
    btnGallery.addEventListener("click", () => {
        load()
            .then((data) => {
                currentLinks = data.links;
                display_galerie(data);
            })
            .catch((error: unknown) => console.error("Erreur chargement galerie:", error));
    });


const btnPrevGallery = document.getElementById("btn-prev-gallery");
if (btnPrevGallery) {
    btnPrevGallery.addEventListener("click", () => {
        if (!currentLinks.prev) return;
        prev(currentLinks)
            .then((data: any) => {
                currentLinks = data.links;
                display_galerie(data);
            })
            .catch((error: unknown) => console.error("Erreur chargement galerie précédente:", error));
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
            })
            .catch((error: unknown) => console.error("Erreur chargement galerie suivante:", error));
    });

}
}