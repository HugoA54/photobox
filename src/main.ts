import { loadPicture, loadResource } from "./photoloader.js";
import { displayPicture, displayCategorie, displayComments } from "./UI.js";
import { API_BASE_URL } from "./config.js";
import { load } from "./gallery.js";
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

const btnGallery = document.getElementById("btn-load-gallery");
if (btnGallery) {
    btnGallery.addEventListener("click", () => {
        load()
            .then(display_galerie)
            .catch((error: unknown) => console.error("Erreur chargement galerie:", error));
    });
}
