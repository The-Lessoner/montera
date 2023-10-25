const openWorkType = (element) => {
  const allWorksType = document.getElementsByClassName("services_type_content");
  for (const key in allWorksType) {
    allWorksType[key].className = "services_type_content is_close";
  }
  const id = element.href.split("#");
  const type = id[id.length - 1];
  const parent = document.getElementById(type).children;
  for (const key in parent) {
    if (parent[key].className) {
      if (parent[key].className.split(" ").filter(value => value === "services_type_content").length) {
        parent[key].className = "services_type_content is_open";
      }
    }
  }
};

const hoverWork = (element) => {
  const children = element.children;
  for (const key in children) {
    if (children[key].className) {
      if (children[key].className.split(" ").filter(value => value === "is_open").length) {
        children[key].className = "services_type_content is_close";
        return;
      }
      if (children[key].className.split(" ").filter(value => value === "is_close").length) {
        children[key].className = "services_type_content is_open";
      }
    }
  }
};

const openMenu = (element) => {
  const allElements = document.getElementsByClassName(element.className);
  for (const key in allElements) {
    if (allElements[key].nextElementSibling && allElements[key] !== element) {
      const sister = allElements[key].nextElementSibling.className.split(" ");
      if (sister.some(value => value === "is_open_menu")) {
        allElements[key].nextElementSibling.className = "navigate_list";
      }
    }
  }

  const children = element.nextElementSibling;
  if (children.className) {
    let statusElement
    if (children.className === "navigate_list") {
      statusElement = "navigate_list is_open_menu";
    }
    if (children.className === "navigate_list is_open_menu") {
      statusElement = "navigate_list";
    }
    children.className = statusElement
  }
};

const runCheck = (element, field) => {
  const check = () => {
    if (field.getBoundingClientRect().bottom < 10) {
      closeAboutCompany(element, false);
      removeEventListener("scroll", check);
    }
  };
  addEventListener("scroll", check);
};

const closeAboutCompany = (element, state) => {
  const field = element.previousElementSibling;
  if (state) {
    field.className = "about_wrapper_text about_wrapper_hidden";
    element.className = "navigate_button about_button hidden_button";
    runCheck(element, field);
  } else {
    field.className = "about_wrapper_text";
    element.className = "navigate_button about_button";
  }
};

let countItems = 3;
let countImg;
let widthImg;
let count = 0;
let gap = 0;

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
  });
};

const openGallery = (element) => {
  const id = element.id;
  const imgArray = document.querySelectorAll(`img[alt=${id}]`);
  countImg = imgArray.length
  const item = element.parentElement.children;
  if (countImg <= countItems) {
    for (const key in item) {
      if (item[key].className === "wrapper_library") {
        const gallery = item[key].children;
        for (let child in gallery) {
          if (gallery[child].tagName === "IMG") {
            gallery[child].style.visibility = "hidden";
          }
        }
      }
    }
  }
  chooseWidth()
};


const checkArrow = (element) => {
  const children = element.parentElement.children;
  let leftArray;
  let rightArray;
  for (const key in children) {
    if (children[key].className === "left arrow_library") {
      leftArray = children[key]
    }
    if (children[key].className === "right arrow_library") {
      rightArray = children[key]
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
  element.style.transform = 'translate(-' + (widthImg * count + gap) + 'px)';
};

let clickElement;
let leftArrow;
let rightArrow;

const increaseImg = (element, portfolio) => {
  clickElement = element;
  const wrapper = document.querySelector(".increase_wrapper_library");
  wrapper.className = "increase_wrapper_library open_slider";
  wrapper.style.display = "flex";

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
    leftArrow.addEventListener("click", prevImagePortfolio);
    rightArrow.addEventListener("click", nextImagePortfolio);
  } else {
    leftArrow.addEventListener("click", prevImg);
    rightArrow.addEventListener("click", nextImg);
  }
};

const addImg = (element, portfolio) => {
  const gallery = document.querySelector(".increase_documents_images");
  gallery.innerHTML = `<img src =${element.src} alt="photo" class="increase_documents_library_photo" />`;
  if (portfolio) {
    checkIncreaseArrow(element.parentElement);
  } else {
    checkIncreaseArrow(element);
  }
};

const nextImg = () => {
  clickElement = clickElement.nextElementSibling;
  addImg(clickElement);
};

const prevImg = () => {
  clickElement = clickElement.previousElementSibling;
  addImg(clickElement);
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
  }
};

document.querySelectorAll(".documents_library_photo").forEach(img => {
  img.addEventListener("click", (e) => increaseImg(e.target, false));
});

window.addEventListener('resize', chooseWidth);

const openReview = (event) => {
  document.querySelectorAll(".review_content").forEach(item => {
    if (event.target.textContent === item.id) {
      item.className = "review_content review_visible";
    } else {
      item.className = "review_content review_hidden";
    }
  });
};

const reviewIncrease = (event) => {
  const increase = document.querySelector(".increase_wrapper_library");
  increase.className = "increase_wrapper_library open_slider";
  increase.style.display = "flex";
  const wrapperImage = document.querySelector(".increase_documents_images")
  wrapperImage.innerHTML = `<img src =${event.target.previousElementSibling.src} alt="review" class="increase_documents_library_photo" />`;
  for (const key in increase.children) {
    if (increase.children[key].tagName === "IMG") {
      increase.children[key].style.visibility = "hidden";
    }
  }
};

let counterImg = 0;
const next = document.getElementById("btn_plus");
const previous = document.getElementById("btn_minus");
const widthImageGallery = (document.querySelector(".portfolio_gallery").offsetWidth - 60) / 3;
const allPortfolio = document.querySelectorAll(".project_photo");
allPortfolio.forEach(image => image.addEventListener("click", (e) => increaseImg(e.target, true)))

const checkButton = (count) => {
  if (counterImg < 1) {
    previous.className = "portfolio_gallery_button disable";
  } else {
    previous.className = "portfolio_gallery_button active";
  }
  if (counterImg >= (allPortfolio.length - count)) {
    next.className = "portfolio_gallery_button disable";
  } else {
    next.className = "portfolio_gallery_button active";
  }
};

checkButton();

const plusImg = (index) => {
  for (let i = 0; i < allPortfolio.length; i++) {
    const parent = allPortfolio[i].parentElement;

    if (i >= index && i <= index + 2) {
      if (i === index) {
        parent.style.width = widthImageGallery * 1.25 + "px";
        allPortfolio[i].style.height = widthImageGallery * 1.2 * 1.25 + "px";
        parent.className = "project visible_project";
      } else {
        parent.style.width = widthImageGallery * 0.9 + "px";
        allPortfolio[i].style.height = widthImageGallery * 0.9 * 1.25 + "px";
        parent.className = "project visible_project";
      }
    }
    if (i < index || i > index + 2) {
      if (allPortfolio[i].tagName)
        parent.className = "project hidden_project";
    }
  }
};

plusImg(counterImg);

previous.addEventListener("click", () => {
  if (counterImg >= 1) {
    counterImg -= 1;
  }
  checkButton(3);
  plusImg(counterImg);
});

next.addEventListener("click", () => {
  if (counterImg < allPortfolio.length - 3) {
    counterImg += 1;
  }
  checkButton(3);
  plusImg(counterImg);
});

const nextImagePortfolio = () => {
  const parent = clickElement.parentElement.nextElementSibling;
  for (const key in parent.children) {
    if (parent.children[key].tagName === "IMG") {
      clickElement = parent.children[key];
    }
  }
  addImg(clickElement, true);
};

const prevImagePortfolio = () => {
  const parent = clickElement.parentElement.previousElementSibling;
  for (const key in parent.children) {
    if (parent.children[key].tagName === "IMG") {
      clickElement = parent.children[key];
    }
  }
  addImg(clickElement, true);
};

let counterHeader;
let marker = false;
const head = document.querySelector(".header");

const header = () => {
  if (!marker && counterHeader > window.pageYOffset) {
    marker = true;
    head.style.position = "absolute";
    head.style.top = window.pageYOffset - head.offsetHeight + "px";
  }
  if(window.pageYOffset <= head.offsetTop){
    head.style.position= "fixed";
    head.style.top = "0";
    marker = true;
  }
  if (marker && counterHeader <= window.pageYOffset) {
    marker = false
    head.style.position = "absolute";
    head.style.top = window.pageYOffset+"px";
  }
  counterHeader = window.pageYOffset;
};

window.addEventListener("scroll", header);