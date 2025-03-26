// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import {drawGallery} from './js/render-functions';
import { getPhotos, getTotalHits } from './js/pixabay-api';

let gallery = document.querySelector(".gallery");
let form = document.querySelector(".form");
let input = document.querySelector('[name="search-text"]');
let loader = document.querySelector(".loader");
let loadBtn = document.querySelector(".load-btn");
let currentPage = 1;
let inputValue;

form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    inputValue = input.value;
    currentPage = 1;
    if(inputValue.trim() === ""){
        // console.log("Заповніть поле пошуку");
        return;
    }
    gallery.innerHTML = "";
    loader.style.display = "block";

    try{
        let response = await getPhotos(inputValue, currentPage);
        let images = response.data.hits;

        if(images.length > 0){
        // console.log(response.data)
        drawGallery(images);

        let totalPages = await getTotalHits(inputValue);
        // console.log(totalPages);
        if(totalPages < 0){
            loadBtn.style.display = "none";
        } else {
            loadBtn.style.display = "flex";
        }
        } else {
            loadBtn.style.display = "none";
            iziToast.show({
                message: `Sorry, there are no images matching your ${inputValue}. Please try again!`,   
                backgroundColor:'#EF4040',
                messageColor: '#FFBEBE',
                position: 'topRight',
                icon: 'fa-solid fa-ban',  
            });
        }
    } catch(error) {
            // console.error(error);
    } finally{
        loader.style.display = "none";
    }
});

loadBtn.addEventListener("click", async () =>{
    currentPage++;
    loader.style.display = "block";

    try{
    let totalPages = await getTotalHits(inputValue);

    if(currentPage <= totalPages){
        let initialItemsCount = document.querySelectorAll(".gallery-item").length;
        let response = await getPhotos(inputValue, currentPage);
        let images = response.data.hits;

            drawGallery(images);

            setTimeout(() => {
                let items = document.querySelectorAll(".gallery-item");
                if (items.length > initialItemsCount) {
                    let rect = items[initialItemsCount].getBoundingClientRect();
                    // console.log(rect.height);
                    window.scrollBy({
                        top: (rect.height * 3) + (3 * 16),
                        behavior: "smooth",
                    });
                }
            }, 300);
            
                
            
        if(currentPage >= totalPages) {
            loadBtn.style.display = "none"
            iziToast.show({
                message: `We're sorry, but you've reached the end of search results.`,   
                backgroundColor:'#1E90FF',
                messageColor: '#FFFFFF',
                position: 'topRight',
                icon: 'fa-solid fa-ban',  
            });
        };
    } else {
        loadBtn.style.display = "none";
        loader.style.display = "none";
        iziToast.show({
            message: `We're sorry, but you've reached the end of search results.`,   
            backgroundColor:'#1E90FF',
            messageColor: '#FFFFFF',
            position: 'topRight',
            icon: 'fa-solid fa-ban',  
        });
    }
} catch(error){
    // console.error(error);
} finally {
    loader.style.display = "none";
}
});