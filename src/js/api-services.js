import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34874471-16af660592878a5bec8a5bf13';
const PER_PAGE = 40;


 export default class ImageApiService{
constructor(){
this.q = '';
this.page = 1;
this.per_page = 40;

}

     async fetchSearch(){
    const URL =`${BASE_URL}/?key=${API_KEY}&q=${this.q}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`
    const response = await  axios(URL);
    const result = await response.data;
    const images = await result;
    this.incrementPage();
    return images;
    }
   
    incrementPage() {
        this.page += 1;
      }
    resetPage(){
    this.page = 1;
 
    }

    get query() {
        return this.q;
      }
    
    set query(newQuery) {
        this.q = newQuery;
      }
    }
    



