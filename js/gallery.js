import { galleryItems } from './app.js';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxContent = document.querySelector('.lightbox__content');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxButton = document.querySelector('.lightbox__button');



gallery.insertAdjacentHTML('beforeend', galleryItems.map(image =>
  `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${image.original}"
  >
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>`).join(''))


gallery.addEventListener('click', toOpenModal);

// Открытие модального окна 
function toOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return
  } else {
    modal.classList.add('is-open');
  }

  getOriginalImage(e.target);

  modal.addEventListener('click', closeModalByClick);
  lightboxButton.addEventListener('click', closeModalByClick);
  window.addEventListener('keydown', closeModalByKey);
} 

// Замена значения src
function getOriginalImage(elem) {
  lightboxImage.setAttribute('src', elem.dataset.source);
  lightboxImage.setAttribute('alt', elem.alt);
}

// Закрытие модального окна 

function toCloseModal() {
  modal.classList.remove('is-open');

  removeOriginalImage();

  modal.removeEventListener('click', closeModalByClick);
  lightboxButton.removeEventListener('click', closeModalByClick);
  window.removeEventListener('keydown', closeModalByKey);
}

function removeOriginalImage() {
  lightboxImage.setAttribute('src', '');
    lightboxImage.setAttribute('alt', '');
  
}

function closeModalByClick (e) {

  if (e.target.classList.contains('lightbox__overlay') || e.target.classList.contains('lightbox__button')) {
    toCloseModal()
  } 
}

function closeModalByKey(e) {
  if (e.code !== 'Escape') {
    return;
  } else {
    toCloseModal()
  }
  
}

// function generateSlider(e) {
//   e.code === 'ArrowRight' ? toRightArrowKey() : null;
//   e.code === 'ArrowLeft' ? toLeftArrowKey() : null;
// }

// function toRightArrowKey() {
//   for (let i = 0; i < galleryItems.length; i
//     += 1) {
//     if(lightboxImage.getAttribute('src') === galleryItems.length[i].original) {
//       lightboxImage.setAttribute('src', galleryItems.length[i + 1].original);
//       lightboxImage.setAttribute('alt', galleryItems.length[i + 1].description);
//       return
//     }
//   }
// }

// function toLeftArrowKey() {
//   for (let i = 0; i < galleryItems.length; i
//     += 1) {
//     if(lightboxImage.getAttribute('src') === galleryItems.length[i].original) {
//       lightboxImage.setAttribute('src', galleryItems.length[i - 1].original);
//       lightboxImage.setAttribute('alt', galleryItems.length[i - 1].description);
//       return
//     }
//   }
// }
