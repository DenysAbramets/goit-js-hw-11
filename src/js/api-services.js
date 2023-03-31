const BASE_URL = 'https://pixabay.com/api'
const API_KEY = '34874471-16af660592878a5bec8a5bf13'


 export default class ImageApiService{
constructor(){
this.q = '';
this.page = 1;

}


    fetchSearch(){
    const url =`${BASE_URL}/?key=${API_KEY}&q=${this.q}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=10`
    return  fetch(url)
    .then(response =>  response.json())
    .then(images=>{
        this.incrementPage();
        return images});

    
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
    



