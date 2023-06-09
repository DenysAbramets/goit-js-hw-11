export function renderCollectionsCards(images) {
  return images.hits
    .map(image => {
      return `<div class="photo-card ">
    <a href="${image.largeImageURL}">
    <img src="${image.previewURL}" alt="${image.tags}" loading="lazy"></a>
    <div class="info">
      <p class="info-item">
        <b>Likes ${image.likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${image.views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${image.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${image.downloads}</b>
      </p>
    </div>
  </div>`;
    })
    .join('');
}
