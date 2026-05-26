import Handlebars from "handlebars";

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

    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.classList.remove("hidden");
    }
}


export function displayCategorie(categorieData: any): void {
    const templateSource = document.getElementById("categorie-template") as HTMLScriptElement;
    const container = document.getElementById("la_categorie");
    if (!templateSource || !container) return;
    const template = Handlebars.compile(templateSource.innerHTML);
    container.innerHTML = template({ nom: categorieData.categorie.nom });
}

export function displayComments(commentsData: any): void {
    const templateSource = document.getElementById("comments-template") as HTMLScriptElement;
    const container = document.getElementById("les_commentaires");
    if (!templateSource || !container) return;
    const template = Handlebars.compile(templateSource.innerHTML);
    container.innerHTML = template({ comments: commentsData.comments });
}
