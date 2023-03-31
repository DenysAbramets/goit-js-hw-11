import Notiflix from 'notiflix';
import './style.css'
import ImageApiService from './js/api-services';
import {renderCollectionsCards} from './js/render-images'

const buttonSeacrh = document.querySelector('.load-more');
const searchForm = document.querySelector('.seacrh-form');
const collection = document.querySelector('.gallery');
const input =document.querySelector('.form__seacrh')



const api = new ImageApiService();
searchForm.addEventListener('submit' , onImageSeacrh);
buttonSeacrh.addEventListener('click', onLoadMore)


function onImageSeacrh (e){
    e.preventDefault();    
    api.q = e.currentTarget.elements.searchQuery.value;
    api.resetPage();
    clearColection();
    api.fetchSearch().then(images=>{
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`)

        renderImages(images)
    });    

};




function onLoadMore(){
    api.fetchSearch().then(images =>{renderImages(images)}).catch((error) =>{
        console.log(error)})
}
// function fetchSearch(){
//     api.fetchSearch().then(images=>{
//         if(images.totalHits === 0){
//             clearInput();
//             return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."
//       );
//      }
//         })
            
//         })
// }

function  renderImages(images){
collection.insertAdjacentHTML('beforeend', renderCollectionsCards(images));
}

function clearColection(){
    collection.innerHTML = ''

}
function clearInput(){
    input.value = ''

}

