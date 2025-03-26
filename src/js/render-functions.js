// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

let galleryShow = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250,
});

galleryShow.on('shown.simplelightbox', function () {
	
});

export function drawGallery (imageArray){
    let gallery = document.querySelector(".gallery");

    let markup = imageArray.map(image => 
        `
        <li class="gallery-item">
            <a href="${image.largeImageURL}" class="gallery-link">
                <img 
                class="gallery-image"
                src="${image.webformatURL}" 
                alt="${image.tags}"
                data-source="${image.largeImageURL}"
                >
            </a>
            <div class="image-info">
                <div class="image-info-element">
                    <b>Likes</b>
                    <p>${image.likes}</p>
                </div>
                <div class="image-info-element">
                    <b>Views</b>
                    <p>${image.views}</p>
                </div>
                <div class="image-info-element">
                    <b>Comments</b>
                    <p>${image.comments}</p>
                </div>
                <div class="image-info-element">
                    <b>Downloads</b>
                    <p>${image.downloads}</p>
                </div>
            </div>
        </li>
        `
    ).join("");
    gallery.insertAdjacentHTML("beforeend", markup);
    galleryShow.refresh();
}

