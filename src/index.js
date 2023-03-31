import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './style.css'
import ImageApiService from './js/api-services';
import {renderCollectionsCards} from './js/render-images';


const buttonSeacrh = document.querySelector('.load-more');
const searchForm = document.querySelector('.seacrh-form');
const collection = document.querySelector('.gallery');
const input =document.querySelector('.form__seacrh');
const formButton =document.querySelector('.form__button');

const api = new ImageApiService();


searchForm.addEventListener('submit' , onImageSeacrh);
buttonSeacrh.addEventListener('click', onLoadMore);
input.addEventListener('input' , ()=> {
if(input.value.trim() !== ""){
    formButton.disabled=false;
}else{
    formButton.disabled=true;
}

})

async function onImageSeacrh (e){
    e.preventDefault();    
    api.q = e.currentTarget.elements.searchQuery.value.trim();
    if(api.q ===''){
        return
    };
    buttonSeacrh.classList.add('is-hidden');
    api.resetPage();
    clearColection();
    try{
    const images = await api.fetchSearch();
    const result = await images;
    if(images.totalHits ===0){
        clearInput();
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        };
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
    renderImages(images);
    if(images.hits.length === api.per_page){
         return buttonSeacrh.classList.remove('is-hidden');
    }
    simpleLightbox.refresh();

    return result;
    }catch(error){
    console.log(error)
    }
};


async function onLoadMore(){
    try{
    const images = await api.fetchSearch();
    const result = await images;
    renderImages(images);
    simpleLightbox.refresh();

    if(images.hits.length <api.per_page){
    buttonSeacrh.classList.add('is-hidden');
    return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    }
    
    return result;
    }catch(error){
    console.log(error)
    }

    }

    const simpleLightbox = initializeSimpleLightbox();
function initializeSimpleLightbox() {
    return new SimpleLightbox('.gallery a');
  }

function  renderImages(images){
collection.insertAdjacentHTML('beforeend', renderCollectionsCards(images));
}

function clearColection(){
    collection.innerHTML = ''

}
function clearInput(){
    input.value = ''

}


function lengthChekingCollection(){
    
}