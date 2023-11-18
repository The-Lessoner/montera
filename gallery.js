const countItems = 3;
const moveImg = 500;
const interval = 3000;
let countImg;
let widthImg;
let count = 0;
let gap = 0;
let clickElement;
let leftArrow;
let rightArrow;
const next = document.getElementById("btn_plus");
const previous = document.getElementById("btn_minus");
const widthImageGallery = (document.querySelector(".portfolio_gallery").offsetWidth) / countItems;
const allPortfolio = document.querySelectorAll(".project_photo");
allPortfolio.forEach(image => image.addEventListener("click", (e) => increaseImg(e.target, true)));

const chooseWidth = () => {
  const field = document.querySelectorAll(".documents_library");
  let fieldWidth;
  field.forEach(item => {
    if (item.offsetWidth) {
      fieldWidth = item.offsetWidth;
    }
  });
  const images = document.querySelectorAll(".documents_library_photo");
  images.forEach(img => {
    widthImg = (fieldWidth - 60) / countItems;
    img.style.width = widthImg + "px";
    img.style.height = widthImg * 1.4 + "px";
  });
};

document.querySelectorAll(".documents_library_photo").forEach(img => {
  img.addEventListener("click", (e) => increaseImg(e.target, false), {passive: true});
});

window.addEventListener("resize", () => {
  chooseWidth()
}, {passive: true});

const openGallery = (element) => {
  chooseWidth();
  const id = element.id;
  const imgArray = document.querySelectorAll(`img[alt=${id}]`);
  countImg = imgArray.length;
  const item = element.parentElement.children;
  for (const key in item) {
    if (item[key].className === "wrapper_library") {
      if (element.checked) {
        item[key].animate([
            {
              height: "0",
            },
            {
              height: `${widthImg * 1.4 + +60 + "px"}`,
              visibility: "visible",
            }
          ],
          {
            duration: 200,
            fill: "both",
            delay: "100",
            easing: "ease-in"
          }
        );
      } else {
        item[key].animate([
            {
              height: `${widthImg * 1.4 + "px"}`,
              visibility: "visible",
            },
            {
              height: "0",
              visibility: "hidden",
            }
          ],
          {
            duration: 0,
            fill: "both"
          }
        );
      }
      if (countImg <= countItems) {
        const gallery = item[key].children;
        for (let child in gallery) {
          if (gallery[child].tagName === "IMG") {
            gallery[child].style.visibility = "hidden";
          }
        }
      }
    }
  }
};

const checkArrow = (element) => {
  const children = element.parentElement.children;
  let leftArray;
  let rightArray;
  for (const key in children) {
    if (children[key].className === "left arrow_library") {
      leftArray = children[key];
    }
    if (children[key].className === "right arrow_library") {
      rightArray = children[key];
    }
  }
  if (count + countItems >= countImg) {
    rightArray.style.visibility = "hidden";
  } else {
    rightArray.style.visibility = "visible";
  }
  if (count === 0) {
    leftArray.style.visibility = "hidden";
  } else {
    leftArray.style.visibility = "visible";
  }
};

const nextImage = (element) => {
  const gallery = element.previousElementSibling.children[0];
  count++;
  gap += 30;
  checkArrow(element);
  rollLibrary(gallery);
};

const prevImage = (element) => {
  const gallery = element.nextElementSibling.children[0];
  count--;
  gap -= 30;
  checkArrow(element);
  rollLibrary(gallery);
};

const rollLibrary = (element) => {
  element.style.transform = "translate(-" + (widthImg * count + gap) + "px)";
};

const increaseImg = (element, portfolio) => {
  clickElement = element;
  const wrapper = document.querySelector(".increase_wrapper_library");
  wrapper.className = "increase_wrapper_library open_slider";
  document.body.style.overflow = "hidden";
  for (const key in wrapper.children) {
    if (wrapper.children[key].alt === "left") {
      leftArrow = wrapper.children[key];
    }
    if (wrapper.children[key].alt === "right") {
      rightArrow = wrapper.children[key];
    }
  }
  addImg(clickElement, portfolio);

  if (portfolio) {
    leftArrow.addEventListener("click", prevImagePortfolio, {passive: true});
    rightArrow.addEventListener("click", nextImagePortfolio, {passive: true});
    rightArrow.style.visibility = "visible";
    leftArrow.style.visibility = "visible";
  } else {
    leftArrow.addEventListener("click", prevImg, {passive: true});
    rightArrow.addEventListener("click", nextImg, {passive: true});
  }
};

const addImg = (element, left, portfolio) => {
  let start, finish;
  if (left) {
    start = moveImg;
    finish = -moveImg;
  } else {
    start = -moveImg;
    finish = moveImg;
  }
  const image = document.createElement("img");
  image.src = element.src;
  image.className = "increase_documents_library_photo";
  const gallery = document.querySelector(".increase_documents_images");
  if (!gallery.childNodes.length) {
    gallery.innerHTML = `<img src =${element.src} alt="photo" class="increase_documents_library_photo" />`;
  } else {
    image.animate([
      {
        transform: `translateX(${start}px)`,
        opacity: "0",
      },
      {
        opacity: "1",
      }
    ], {
      duration: interval / 4,
      fill: "both",
      delay: "1000"
    });
    gallery.appendChild(image)

    gallery.childNodes[0].animate([
      {
        opacity: "1",
      },
      {
        opacity: "0",
        transform: `translateX(${finish}px)`,
      }
    ], {
      duration: interval / 4,
      fill: "both",
    });
    setTimeout(() => gallery.removeChild(gallery.firstElementChild), interval / 4);
  }

  if (!portfolio) {
    checkIncreaseArrow(element);
  }
};

const nextImg = () => {
  clickElement = clickElement.nextElementSibling;
  addImg(clickElement, true);
};

const prevImg = () => {
  clickElement = clickElement.previousElementSibling;
  addImg(clickElement, false);
};

const checkIncreaseArrow = (element) => {
  if (!element.nextElementSibling) {
    rightArrow.style.visibility = "hidden";
  } else {
    rightArrow.style.visibility = "visible";
  }
  if (!element.previousElementSibling) {
    leftArrow.style.visibility = "hidden";
  } else {
    leftArrow.style.visibility = "visible";
  }
};

const closeWrapper = (event) => {
  if (event.target.className === "increase_wrapper_library open_slider") {
    event.target.className = "increase_wrapper_library close_slider";
    document.body.style.overflow = "visible";
    document.querySelector(".increase_documents_images").innerHTML = "";
  }
};

const nextImagePortfolio = () => {
  let parent = clickElement.parentElement.nextElementSibling;
  const children = clickElement.parentElement.parentElement.children;
  if (!parent) {
    parent = children[1];
  }
  for (const key in parent.children) {
    if (parent.children[key].tagName === "IMG") {
      clickElement = parent.children[key];
    }
  }
  addImg(clickElement, true, true);
};

const prevImagePortfolio = () => {
  let parent = clickElement.parentElement.previousElementSibling;
  const children = clickElement.parentElement.parentElement.children;
  if (!parent) {
    parent = children[children.length - 1];
  }
  for (const key in parent.children) {
    if (parent.children[key].tagName === "IMG") {
      clickElement = parent.children[key];
    }
  }
  addImg(clickElement, false, true);
};

const setParamImg = () => {
  const allPhotos = document.querySelectorAll(".project_photo");
  for (let i = 0; i < allPhotos.length; i++) {
    if (i === 0) {
      allPhotos[i].style.width = widthImageGallery + "px";
      allPhotos[i].style.height = widthImageGallery * 1.2 + "px";
    } else {
      allPhotos[i].style.width = widthImageGallery * 0.8 + "px";
      allPhotos[i].style.height = widthImageGallery * 0.8 * 1.2 + "px";
    }
  }
};

window.addEventListener("load", setParamImg, {passive: true});
window.addEventListener("resize", setParamImg, {passive: true});

const animateNext = () => {
  const allPhotos = document.querySelectorAll(".project_photo");
  for (let i = 0; i < allPhotos.length; i++) {

    allPhotos[i].parentElement.animate([
      {
        transform: `translateX(0px)`,
      },
      {
        transform: `translateX(-${widthImageGallery + 30}px)`,
      }
    ], {
      duration: interval,
      fill: "both"
    });
    if (i === 0) {
      allPhotos[i].style.width = `${widthImageGallery}px`;
      allPhotos[i].style.height = `${widthImageGallery * 1.2}px`;
      allPhotos[i].parentElement.animate([
        {
          opacity: "1",
        },
        {
          opacity: "0",
        }
      ], {
        duration: interval,
      });
    }
    if (i === 1) {
      allPhotos[i].animate([
        {
          width: `${widthImageGallery * 0.8}px`,
          height: `${widthImageGallery * 0.8 * 1.2}px`,
        },
        {
          width: `${widthImageGallery}px`,
          height: `${widthImageGallery * 1.2}px`,
        }
      ], {
        duration: interval,
        fill: "both"
      });
    }
    if (i === 3) {
      allPhotos[i].animate([
        {
          width: `${widthImageGallery}px`,
          height: `${widthImageGallery * 1.2}px`,
        },
        {
          width: `${widthImageGallery * 0.8}px`,
          height: `${widthImageGallery * 0.8 * 1.2}px`,
        }
      ], {
        duration: interval,
        fill: "both"
      });
      allPhotos[i].parentElement.animate([
        {
          opacity: "0",
        },
        {
          opacity: "1",
        }
      ], {
        duration: interval,
      });
    }
  }
};
animateNext();

const animateBack = () => {
  const allPhotos = document.querySelectorAll(".project_photo");

  for (let i = 0; i < allPhotos.length; i++) {
    allPhotos[i].parentElement.animate([
      {
        left: `-${widthImageGallery + 30}px`,
      },
      {
        left: `0`,
      }
    ], {
      duration: interval,
    });
    if (i === 0) {
      allPhotos[i].animate([
        {
          // opacity: "1",
          width: `${widthImageGallery}px`,
          height: `${widthImageGallery * 1.2}px`
        },
        {
          // opacity: "1",
          width: `${widthImageGallery}px`,
          height: `${widthImageGallery * 1.2}px`
        }
      ], {
        duration: interval,
        fill: "both"
      });
    }
    if (i === 1) {
      allPhotos[i].animate([
        {
          opacity: "0",
        },
        {
          opacity: "1",
        }
      ], {
        duration: interval,
        // fill: "both"

      });
    }
    if (i === 2) {
      allPhotos[i].animate([
        {
          width: `${widthImageGallery}px`,
          height: `${widthImageGallery * 1.2}px`,
        },
        {
          width: `${widthImageGallery * 0.8}px`,
          height: `${widthImageGallery * 0.8 * 1.2}px`,
        }
      ], {
        duration: interval,
        fill: "both"
      });
    }
    if (i === 4) {
      allPhotos[i].parentElement.animate([
        {
          opacity: "1",

        },
        {
          opacity: "0",
        }
      ], {
        duration: interval,
        // fill: "both"
      });
      allPhotos[i].animate([
        {
          width: `${widthImageGallery * 0.8}px`,
          height: `${widthImageGallery * 0.8 * 1.2}px`,
        },
        {
          width: `${widthImageGallery}px`,
          height: `${widthImageGallery * 1.2}px`,
        }
      ], {
        duration: interval,
        // fill: "both"
      });
    }
  }
};

const nextProject = () => {
  const parent = document.querySelector(".portfolio_gallery");
  const first = parent.firstElementChild;
  // first.style.width = `${widthImageGallery * 0.8}px`;
  // first.style.height = `${widthImageGallery * 1.2 * 0.8}px`;
  setTimeout(() => {
    parent.removeChild(first);
    parent.appendChild(first);
    animateNext();
  }, 0);
};

const prevProject = () => {
  const parent = document.querySelector(".portfolio_gallery");
  const last = parent.lastElementChild;

  setTimeout(() => {
    parent.removeChild(last);
    parent.insertBefore(last, parent.firstElementChild);
    animateBack();
  }, 0);
};

next.addEventListener("click", nextProject, {passive: true});
previous.addEventListener("click", prevProject, {passive: true});

// const portfolio = document.querySelector(".content_slider");
// let moveSlider = setInterval(nextProject, interval);

// portfolio.addEventListener("mouseenter", () => {
//   clearInterval(moveSlider);
// });
//
// portfolio.addEventListener("mouseleave", () => {
//   setTimeout(() => moveSlider = setInterval(nextProject, interval), 0);
// });