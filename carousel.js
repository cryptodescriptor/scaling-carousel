Array.prototype.rotate = function(n) {
  return this.slice(n, this.length).concat(this.slice(0, n));
}

const galleryContainer = document.querySelector('.gallery-container');
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
  constructor(container, items) {
    this.carouselContainer = container;
    this.carouselArray = [...items];
    this.carouselArrayTemp = [];
  }

  // Assign initial css classes for gallery and nav items
  setInitialState() {
    this.carouselArray[0].classList.add('gallery-item-first');
    this.carouselArray[1].classList.add('gallery-item-previous');
    this.carouselArray[2].classList.add('gallery-item-selected');
    this.carouselArray[3].classList.add('gallery-item-next');
    this.carouselArray[4].classList.add('gallery-item-last');

    document.querySelector('.gallery-nav').childNodes[0].className = 'gallery-nav-item gallery-item-first';
    document.querySelector('.gallery-nav').childNodes[1].className = 'gallery-nav-item gallery-item-previous';
    document.querySelector('.gallery-nav').childNodes[2].className = 'gallery-nav-item gallery-item-selected';
    document.querySelector('.gallery-nav').childNodes[3].className = 'gallery-nav-item gallery-item-next';
    document.querySelector('.gallery-nav').childNodes[4].className = 'gallery-nav-item gallery-item-last';

    return document.querySelectorAll('.gallery-nav-item');
  }

  // Update the order state of the carousel with css classes
  setCurrentState(target) {
    if (target.className === 'next') {
      this.carouselArrayTemp = this.carouselArray.rotate(-1);
    } else if (target.className === 'previous') {
      this.carouselArrayTemp = this.carouselArray.rotate(1);
    }

    let tempClassList = [];

    this.carouselArrayTemp.forEach(item => {
      tempClassList.push(item.classList[1]);
    });

    [galleryItems, galleryNavItems].forEach(elements => {
      elements.forEach((item, ind) => {
        item.classList.remove(item.classList[1]);
        item.classList.add(tempClassList[ind]);
      });
    });
  }

  // Construct the carousel navigation
  setNav() {
    galleryContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

    this.carouselArray.forEach(item => {
      const nav = galleryContainer.lastElementChild;
      nav.appendChild(document.createElement('li'));
    });
  }
 
  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [document.querySelector('.previous'),
    document.querySelector('.next')];

    triggers.forEach(control => {
      control.addEventListener('click', () => {
        const target = control;
        this.setCurrentState(target);
      });
    });
  }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems);

exampleCarousel.setNav();
const galleryNavItems = exampleCarousel.setInitialState();
exampleCarousel.useControls();