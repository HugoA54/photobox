import Handlebars from "handlebars";
import { API_BASE_URL } from "./config.js";

export interface Picture {
    titre: string;
    url: { href: string };
    descr: string;
    categorie: string;
}

export function displayPicture(picture: Picture): void {
    const templateSource = document.getElementById("photo-template") as HTMLScriptElement;
    const container = document.getElementById("la_photo");

    if (!templateSource || !container) {
        console.error("Template ou conteneur introuvable");
        return;
    }

    const template = Handlebars.compile(templateSource.innerHTML);
    container.innerHTML = template({
        titre: picture.photo.titre,
        url: "https://webetu.iutnc.univ-lorraine.fr" + picture.photo.url.href,
        descr: picture.photo.descr,
    });



}


export function displayCategorie(categorieData: any): void {
    const container = document.getElementById("la_categorie");
    if (!container) {
        console.error("Conteneur de catégorie introuvable");
        return;
    }
    container.textContent = "Categorie: " + categorieData.categorie.nom;
}


export function displayComments(commentsData: any): void {
    const container = document.getElementById("les_commentaires");
    if(!container) {
        console.error("Conteneur de commentaires introuvable");
        return;
    }
    const commentsArray = commentsData.comments;
            const commentList = document.createElement("ul");

    for (const comment of commentsArray) {
        const commentElement = document.createElement("li");
        commentElement.textContent = `(${comment.pseudo}) ${comment.content}`;
        commentList.appendChild(commentElement);
    }
    container.appendChild(commentList);
}
