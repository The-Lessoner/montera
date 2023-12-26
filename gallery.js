const cards = document.getElementById("slider").children.length;
const arrowLeft = document.querySelector(".left_arrow");
const arrowRight = document.querySelector(".right_arrow");
let countImage = 0;
let mark = true;

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

checkArrow(arrowRight, arrowLeft, cards, 0, 3);

// window.addEventListener("resize", () => {
//   chooseWidth()
// }, {passive: true});

const openGallery = (element) => {
  const img = document.querySelector(".block_photo");
  const imgHeight = img.getBoundingClientRect().height;

  const block = element.parentElement.children;
  for (const key in block) {
    if (block[key].className === "wrapper_library") {
      const slider = setElement(block[key].children);
      checkArrow(slider.right, slider.left, slider.cards, 0, 3);
      if (element.checked) {
        block[key].animate([
            {
              height: "0",
            },
            {
              height: `${imgHeight + "px"}`,
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
              height: `${imgHeight + "px"}`,
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

const nextProject = (element) => {
  const children = element.parentElement.children;
  const slider = setElement(children);

  const elementClass = element.className.split(" ");
  if (elementClass.includes("left")) {
    if (mark) {
      mark = false;
      const block = element.previousElementSibling.children;
      for (const gallery of block) {
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
          duration: 1000,
        });

        wrapper.animate([{
          transform: `translateX(${moveLength}px)`,
        }, {
          transform: `translateX(${0}px)`,
        }], {
          duration: 1000,
          fill: "both"
        });

        Promise.all(
          gallery.children[countImage].getAnimations({subtree: true}).map((animation) => animation.finished),
        ).then(() => {
          gallery.children[countImage].className = classWrapper;
          gallery.children[countImage].children[0].className = classImage;
          countImage += 1;
          checkArrow(slider.right, slider.left, slider.cards, countImage, 1, true);
          mark = true;
        });
      }
    }
  } else {
    const widthCard = slider.card.getBoundingClientRect().width;
    const block = slider.card.parentElement;
    if (!block.count) {
      block.count = 0;
    }
    block.animate([{
      transform: `translateX(-${widthCard * block.count}px)`,
    }, {
      transform: `translateX(-${widthCard * (block.count + 1)}px)`,
    }], {
      duration: 1000,
      fill: "both"
    });
    block.count += 1;
    checkArrow(slider.right, slider.left, slider.cards, block.count, 3);
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
          duration: 1000,
        });

        wrapper.animate([{
          transform: `translateX(-${moveLength}px)`,
        }, {
          transform: `translateX(${0}px)`,
        }], {
          duration: 1000,
          fill: "both"
        });

        Promise.all(
          gallery.children[countImage].getAnimations({subtree: true}).map((animation) => animation.finished),
        ).then(() => {
          gallery.children[countImage].className = classWrapper;
          gallery.children[countImage].children[0].className = classImage;
          countImage -= 1;
          checkArrow(slider.right, slider.left, slider.cards, countImage, 1, true);
          mark = true;
        });
      }
    }
  } else {
    const widthCard = slider.card.getBoundingClientRect().width;
    const block = slider.card.parentElement;
    if (!block.count) {
      block.count = 0;
    }
    block.animate([{
      transform: `translateX(${widthCard * -block.count}px)`,
    }, {
      transform: `translateX(${widthCard * -(block.count - 1)}px)`,
    }], {
      duration: 1000,
      fill: "both"
    });
    block.count -= 1;
    checkArrow(slider.right, slider.left, slider.cards, block.count, 3);
  }
};
let indexImage = 0;

const increaseImage = (image) => {
  const block = image.parentElement;
  image.parentElement.parentElement.style.display = "contents";
  const elements = setElement(block.parentElement.parentElement.parentElement.children);
  if (block.className === "wrapper_block") {
    const children = block.parentElement.children;
    let count = 0;
    for (const key of children) {
      if (key === block) {
        indexImage = count;
        countImage = count;
        checkArrow(elements.right, elements.left, elements.cards, countImage, 1, true);
      }
      count += 1;
    }
    image.className = "increase_image";
    block.className = "increase_wrapper";
    document.body.style.overflow = "hidden";
  } else {
    image.parentElement.parentElement.style.display = "flex";

    elements.left.className = "arrow_library";
    elements.right.className = "arrow_library";
    image.className = "block_photo";
    block.className = "wrapper_block";
    document.body.style.overflow = "visible";
    let countElement = 0;
    if (block.parentElement.count) {
      countElement = block.parentElement.count;
    }
    checkArrow(elements.right, elements.left, elements.cards, countElement, 3, false);
  }
};

const actionSlider = (button) => {
  if (button.className.includes("active")) {
    const slider = document.querySelector(".portfolio_slider").children;
    console.log(slider)
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