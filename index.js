import{S as h,a as u,i as y}from"./assets/vendor-BH9GyP-n.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function l(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=l(e);fetch(e.href,a)}})();let p=new h(".gallery a",{captionsData:"alt",captionDelay:250});p.on("shown.simplelightbox",function(){});function m(r){let t=document.querySelector(".gallery"),l=r.map(o=>`
        <li class="gallery-item">
            <a href="${o.largeImageURL}" class="gallery-link">
                <img 
                class="gallery-image"
                src="${o.webformatURL}" 
                alt="${o.tags}"
                data-source="${o.largeImageURL}"
                >
            </a>
            <div class="image-info">
                <div class="image-info-element">
                    <b>Likes</b>
                    <p>${o.likes}</p>
                </div>
                <div class="image-info-element">
                    <b>Views</b>
                    <p>${o.views}</p>
                </div>
                <div class="image-info-element">
                    <b>Comments</b>
                    <p>${o.comments}</p>
                </div>
                <div class="image-info-element">
                    <b>Downloads</b>
                    <p>${o.downloads}</p>
                </div>
            </div>
        </li>
        `).join("");t.insertAdjacentHTML("beforeend",l),p.refresh()}async function f(r,t){try{return u.get("https://pixabay.com/api/",{params:{key:"49450031-b4478c296ebc20935df165a9a",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})}catch{return null}}async function g(r){try{let t=await u.get("https://pixabay.com/api/",{params:{key:"49450031-b4478c296ebc20935df165a9a",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}});return Math.ceil(t.data.totalHits/15)}catch{return 1}}let b=document.querySelector(".gallery"),v=document.querySelector(".form"),w=document.querySelector('[name="search-text"]'),n=document.querySelector(".loader"),c=document.querySelector(".load-btn"),i=1,s;n.style.display="none";v.addEventListener("submit",async r=>{if(r.preventDefault(),s=w.value,i=1,s.trim()!==""){b.innerHTML="",n.style.display="block";try{let l=(await f(s,i)).data.hits;l.length>0?(m(l),await g(s)<0?c.style.display="none":c.style.display="flex"):(c.style.display="none",y.show({message:`Sorry, there are no images matching your ${s}. Please try again!`,backgroundColor:"#EF4040",messageColor:"#FFBEBE",position:"topRight",icon:"fa-solid fa-ban"}))}catch{}finally{n.style.display="none"}}});c.addEventListener("click",async()=>{i++,n.style.display="block";try{let r=await g(s);if(i<=r){let t=document.querySelectorAll(".gallery-item").length,o=(await f(s,i)).data.hits;m(o),setTimeout(()=>{let e=document.querySelectorAll(".gallery-item");if(e.length>t){let a=e[t].getBoundingClientRect();window.scrollBy({top:a.height*3+3*16,behavior:"smooth"})}},300),i>=r&&(c.style.display="none",y.show({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#1E90FF",messageColor:"#FFFFFF",position:"topRight",icon:"fa-solid fa-ban"}))}else c.style.display="none",n.style.display="none",y.show({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#1E90FF",messageColor:"#FFFFFF",position:"topRight",icon:"fa-solid fa-ban"})}catch{}finally{n.style.display="none"}});
//# sourceMappingURL=index.js.map
