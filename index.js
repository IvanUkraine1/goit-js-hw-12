import{S as h,a as b,i as u}from"./assets/vendor-BH9GyP-n.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const y of l.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&d(y)}).observe(document,{childList:!0,subtree:!0});function t(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function d(e){if(e.ep)return;e.ep=!0;const l=t(e);fetch(e.href,l)}})();let p=new h(".gallery a",{captionsData:"alt",captionDelay:250});p.on("shown.simplelightbox",function(){});let f=document.querySelector(".gallery");function m(s){let o=s.map(t=>`
        <li class="gallery-item">
            <a href="${t.largeImageURL}" class="gallery-link">
                <img 
                class="gallery-image"
                src="${t.webformatURL}" 
                alt="${t.tags}"
                data-source="${t.largeImageURL}"
                >
            </a>
            <div class="image-info">
                <div class="image-info-element">
                    <b>Likes</b>
                    <p>${t.likes}</p>
                </div>
                <div class="image-info-element">
                    <b>Views</b>
                    <p>${t.views}</p>
                </div>
                <div class="image-info-element">
                    <b>Comments</b>
                    <p>${t.comments}</p>
                </div>
                <div class="image-info-element">
                    <b>Downloads</b>
                    <p>${t.downloads}</p>
                </div>
            </div>
        </li>
        `).join("");f.insertAdjacentHTML("beforeend",o),p.refresh()}function v(){f.innerHTML=""}async function g(s,o){try{return(await b.get("https://pixabay.com/api/",{params:{key:"49450031-b4478c296ebc20935df165a9a",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}catch{return null}}let F=document.querySelector(".form"),w=document.querySelector('[name="search-text"]'),i=document.querySelector(".loader"),r=document.querySelector(".load-btn"),n,a=1,c;document.addEventListener("DOMContentLoaded",()=>{i.style.display="none"});F.addEventListener("submit",async s=>{if(s.preventDefault(),c=w.value,a=1,c.trim()!==""){v(),i.style.display="block";try{n=await g(c,a);let o=n.hits;o.length>0?(m(o),Math.ceil(n.totalHits/15)<0?r.style.display="none":r.style.display="flex"):(r.style.display="none",u.show({message:`Sorry, there are no images matching your ${c}. Please try again!`,backgroundColor:"#EF4040",messageColor:"#FFBEBE",position:"topRight",icon:"fa-solid fa-ban"}))}catch{}finally{i.style.display="none"}}});r.addEventListener("click",async()=>{a++,i.style.display="block",r.style.display="none";try{let s=Math.ceil(n.totalHits/15);if(a<=s){n=await g(c,a);let o=n.hits;m(o),r.style.display="flex",setTimeout(()=>{let d=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:d.height*2+2*16,behavior:"smooth"})},300),a>=s&&(r.style.display="none",u.show({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#1E90FF",messageColor:"#FFFFFF",position:"topRight",icon:"fa-solid fa-ban"}))}else r.style.display="none",i.style.display="none",u.show({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#1E90FF",messageColor:"#FFFFFF",position:"topRight",icon:"fa-solid fa-ban"})}catch{}finally{i.style.display="none"}});
//# sourceMappingURL=index.js.map
