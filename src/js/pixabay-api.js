import axios from "axios";

export async function getPhotos(word, currentPage){
    try{
        let response = await axios.get("https://pixabay.com/api/",{
            params:{
                key: "49450031-b4478c296ebc20935df165a9a",
                q: word,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: 15,
                page: currentPage
            }
        });
        return response.data;
    } catch(error){
        // console.error(error);
        return null;
    }
}