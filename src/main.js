// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import {drawGallery, clearGallery} from './js/render-functions';
import {getPhotos} from './js/pixabay-api';

let gallery = document.querySelector(".gallery");
let form = document.querySelector(".form");
let input = document.querySelector('[name="search-text"]');
let loader = document.querySelector(".loader");
let loadBtn = document.querySelector(".load-btn");
let response;
let currentPage = 1;
let inputValue;

loader.style.display = "none";

form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    inputValue = input.value;
    currentPage = 1;
    if(inputValue.trim() === ""){
        // console.log("Заповніть поле пошуку");
        return;
    }
    clearGallery();
    loader.style.display = "block";

    try{
        response = await getPhotos(inputValue, currentPage);
        let images = response.hits;

        if(images.length > 0){
        // console.log(response.data)
        drawGallery(images);

        let totalPages = Math.ceil(response.totalHits / 15);
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
    loadBtn.style.display = "none";
    
    try{
        let totalPages = Math.ceil(response.totalHits / 15);

    if(currentPage <= totalPages){

        response = await getPhotos(inputValue, currentPage);
        let images = response.hits;

        drawGallery(images);

        loadBtn.style.display = "flex";

        setTimeout(() => {
            let item = document.querySelector(".gallery-item");
            let rect = item.getBoundingClientRect();
            // console.log(((rect.height * 3) + (3 * 16)));
                window.scrollBy({
                    top: (rect.height * 2) + (2 * 16),
                    behavior: "smooth",
                });
        }, 300);
        //без setTimeout воно проскролить до того як домалювало всі елементи на сторінку
            
                
            
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