const cards = document.getElementById("slider").children.length;
const arrowLeft = document.querySelector(".left_arrow");
const arrowRight = document.querySelector(".right_arrow");
let countImage = 0;
let mark = true;
let indexImage = 0;
let startX = null;
let moveWay = null;
let pageCards = 3;
const speed = "300";

const checkArrow = (arrowR, arrowL, cards, count, pageCards, increase) => {
  let hiddenClass, visibleClass, left = null, right = null, buttonLeft, buttonRight;

  if (arrowLeft.parentElement.className === "portfolio_slider") {
    buttonRight = document.getElementById("btn_minus");
    buttonLeft = document.getElementById("btn_plus");
  }

  if (increase) {
    hiddenClass = "arrow_library";
    visibleClass = "arrow_library";
    left = "left";
    right = "right";
  } else {
    hiddenClass = "arrow_library";
    visibleClass = "visible_arrow arrow_library";
  }
  if (count <= 0) {
    arrowL.className = hiddenClass;
    if (buttonRight) {
      buttonRight.className = "portfolio_gallery_button";
    }
  } else {
    arrowL.className = visibleClass + " " + right;
    if (buttonRight) {
      buttonRight.className = "portfolio_gallery_button active";
    }
  }
  if (count >= cards - pageCards) {
    arrowR.className = hiddenClass;
    if (buttonLeft) {
      buttonLeft.className = "portfolio_gallery_button";
    }
  } else {
    arrowR.className = visibleClass + " " + left;
    if (buttonLeft) {
      buttonLeft.className = "portfolio_gallery_button active";
    }
  }
};

const resizeDisplay = () => {
  const displayWidth = window.innerWidth;
  if (displayWidth <= 440) {
    pageCards = 1;
  } else {
    pageCards = 3;
  }
};

window.addEventListener("resize", () => {
  resizeDisplay();
}, {passive: true});

const openGallery = (element) => {
  const img = document.querySelector(".block_photo");
  const imgHeight = img.getBoundingClientRect().height;
  const block = element.parentElement.children;
  for (const key in block) {
    if (block[key].className === "wrapper_library") {
      const slider = setElement(block[key].children);
      checkArrow(slider.right, slider.left, slider.cards, 0, pageCards);
      if (element.checked) {
        block[key].animate([
            {
              height: "0",
            },
            {
              height: `${imgHeight + 50 + "px"}`,
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
        block[key].animate([
            {
              height: `${imgHeight + 50 + "px"}`,
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
    }
  }
};

const setElement = (children) => {
  const gallery = {};
  for (const child of children) {
    if (child.alt === "left") {
      gallery.left = child;
    }
    if (child.alt === "right") {
      gallery.right = child;
    }
    if (child.className === "wrapper") {
      for (const wrapper of child.children) {
        if (wrapper.className === "gallery") {
          gallery.card = wrapper.children[0];
          gallery.cards = wrapper.children.length;
        }
      }
    }
  }
  return gallery;
};

const checkShadow = (elements, count) => {
  for (let i = 0; i < elements.length; i++) {
    if (i === count) {
      elements[i].style.background = "rgb(140 136 136)";
    } else {
      elements[i].style.background = "lightgrey";
    }
  }
};

const nextProject = (element) => {
  const children = element.parentElement.children;
  const slider = setElement(children);

  const elementClass = element.className.split(" ");
  if (elementClass.includes("left")) {
    if (mark) {
      mark = false;
      const block = element.previousElementSibling.children;
      for (const gallery of block) {
      if (gallery.className.includes("increase_block_shadow")){
        checkShadow(gallery.children,countImage+1);
      }
        if (gallery.className === "gallery") {
          const wrapper = gallery.children[countImage + 1];
          const image = wrapper.children[0];
          const classImage = image.className;
          const classWrapper = wrapper.className;
          wrapper.className = "increase_wrapper";
          image.className = "increase_image";
          const moveLength = wrapper.getBoundingClientRect().width;

          gallery.children[countImage].animate([{
            transform: `translateX(${0}px)`,
          }, {
            transform: `translateX(-${moveLength}px)`,
          }], {
            duration: 500,
            easing: "ease-out",
          });

          wrapper.animate([{
            transform: `translateX(${moveLength}px)`,
          }, {
            transform: `translateX(${0}px)`,
          }], {
            duration: 500,
            easing: "ease-out",
            fill: "both"
          });

          Promise.all(
            gallery.children[countImage].getAnimations({subtree: true}).map((animation) => animation.finished),
          ).then(() => {
            pageCards = 1;
            gallery.children[countImage].className = classWrapper;
            gallery.children[countImage].children[0].className = classImage;
            countImage += 1;
            checkArrow(slider.right, slider.left, slider.cards, countImage, pageCards, true);
            mark = true;
          });
        }
      }
    }
  } else {
    const widthCard = slider.card.getBoundingClientRect().width;
    const block = slider.card.parentElement;
    const shadow = block.nextElementSibling.children;

    if (!block.count) {
      block.count = 0;
    }
    checkShadow(shadow, block.count + 1);
    block.animate([{
      transform: `translateX(-${widthCard * block.count}px)`,
    }, {
      transform: `translateX(-${widthCard * (block.count + 1)}px)`,
    }], {
      duration: 500,
      easing: "ease-out",
      fill: "both"
    });
    block.count += 1;
    checkArrow(slider.right, slider.left, slider.cards, block.count, pageCards);
  }
};

const prevProject = (element) => {
  const children = element.parentElement.children;
  const slider = setElement(children);

  const elementClass = element.className.split(" ");
  if (elementClass.includes("right")) {
    if (mark) {
      mark = false;
      const container = element.nextElementSibling.children;
      for (const gallery of container) {
        if (gallery.className.includes("increase_block_shadow")){
          checkShadow(gallery.children,countImage-1);
        }
        if (gallery.className === "gallery") {
          const wrapper = gallery.children[countImage - 1];
          const image = wrapper.children[0];
          const classImage = image.className;
          const classWrapper = wrapper.className;
          wrapper.className = "increase_wrapper";
          image.className = "increase_image";
          const moveLength = wrapper.getBoundingClientRect().width;

          gallery.children[countImage].animate([{
            transform: `translateX(${0}px)`,
          }, {
            transform: `translateX(${moveLength}px)`,
          }], {
            duration: 500,
            easing: "ease-out",
          });

          wrapper.animate([{
            transform: `translateX(-${moveLength}px)`,
          }, {
            transform: `translateX(${0}px)`,
          }], {
            duration: 500,
            easing: "ease-out",
            fill: "both"
          });

          Promise.all(
            gallery.children[countImage].getAnimations({subtree: true}).map((animation) => animation.finished),
          ).then(() => {
            pageCards = 1;
            gallery.children[countImage].className = classWrapper;
            gallery.children[countImage].children[0].className = classImage;
            countImage -= 1;
            checkArrow(slider.right, slider.left, slider.cards, countImage, pageCards, true);
            mark = true;
          });
        }
      }
    }
  } else {
    const widthCard = slider.card.getBoundingClientRect().width;
    const block = slider.card.parentElement;
    const shadow = block.nextElementSibling.children;
    if (!block.count) {
      block.count = 0;
    }
    checkShadow(shadow, block.count - 1);
    block.animate([{
      transform: `translateX(${widthCard * -block.count}px)`,
    }, {
      transform: `translateX(${widthCard * -(block.count - 1)}px)`,
    }], {
      duration: 500,
      easing: "ease-out",
      fill: "both"
    });
    block.count -= 1;
    checkArrow(slider.right, slider.left, slider.cards, block.count, pageCards);
  }
};

const increaseImage = (image) => {
  pageCards = 1;
  const block = image.parentElement;
  const gallery = image.parentElement.parentElement;
  gallery.style.display = "contents";
  const elements = setElement(gallery.parentElement.parentElement.children);
  if (block.className === "wrapper_block") {
    const children = gallery.children;
    let count = 0;
    for (const key of children) {
      if (key === block) {
        indexImage = count;
        countImage = count;
        checkArrow(elements.right, elements.left, elements.cards, countImage, pageCards, true);
      }
      count += 1;
    }
    gallery.nextElementSibling.className = "increase_block_shadow block_shadow"
    image.className = "increase_image";
    block.className = "increase_wrapper";
    document.body.style.overflow = "hidden";
  }
};

const decreaseImage = (event) => {
  const gallery = event.target.parentElement;
  const elements = setElement(gallery.parentElement.parentElement.children);
  if (event.target.className === "increase_wrapper") {
    gallery.style.display = "flex";
    event.target.className = "wrapper_block";
    document.body.style.overflow = "visible";
    elements.left.className = "arrow_library";
    elements.right.className = "arrow_library";
    event.target.children[0].className = "block_photo";
    gallery.nextElementSibling.className = "block_shadow";
    let countElement = 0;
    if (gallery.count) {
      countElement = gallery.count;
    }
    if(!gallery.count){
      gallery.count = 0;
    }
    checkShadow(gallery.nextElementSibling.children,gallery.count);
    checkArrow(elements.right, elements.left, elements.cards, countElement, pageCards, false);
  }
};

const actionSlider = (button) => {
  if (button.className.includes("active")) {
    const slider = document.querySelector(".portfolio_slider").children;
    for (const arrow of slider) {
      if (arrow.alt === "left" && button.id === "btn_minus") {
        prevProject(arrow);
      }
      if (arrow.alt === "right" && button.id === "btn_plus") {
        nextProject(arrow);
      }
    }
  }
};

const setCoordinate = (event) => {
  startX = event.touches[0].screenX;
};

const handleMove = (event) => {
  const moveX = event.touches[0].screenX;
  if (startX - moveX > 0) {
    moveWay = "right";
  }
  if (startX - moveX < 0) {
    moveWay = "left";
  }
};

const handleStop = (event) => {
  if (moveWay === "right") {
    const next = event.target.parentElement.parentElement.parentElement.parentElement.lastElementChild;
    if (next.className.includes("visible_arrow") || next.className.includes("left")) {
      nextProject(next);
    }
  }
  if (moveWay === "left") {
    const prev = event.target.parentElement.parentElement.parentElement.parentElement.firstElementChild;
    if (prev.className.includes("visible_arrow") || prev.className.includes("right")) {
      prevProject(prev);
    }
  }
  startX = null;
  moveWay = null;
};

const slider = document.querySelectorAll(".gallery");
slider.forEach(block => block.addEventListener("touchstart", setCoordinate, false));
slider.forEach(block => block.addEventListener("touchmove", handleMove, false));
slider.forEach(block => block.addEventListener("touchend", handleStop, false));

const startWork = () => {
  checkArrow(arrowRight, arrowLeft, cards, 0, pageCards);
  resizeDisplay();
  const gallery = document.querySelectorAll(".gallery");

  gallery.forEach(block => {
    const blockShadow = document.createElement("div");
    blockShadow.className = "block_shadow";

    const childrenBlock = block.childElementCount;
    block.parentElement.appendChild(blockShadow);
    for (let i = 0; i < childrenBlock; i++) {
      const shadow = document.createElement("span");
      shadow.className = "shadow";
      blockShadow.appendChild(shadow);
    }
  });
};
startWork();