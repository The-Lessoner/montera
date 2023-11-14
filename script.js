const lightScroll = (name) => {
  const parent = document.getElementById(name);
  for (const key in parent.children) {
    if (parent.children[key].tagName === "INPUT") {
      document.querySelectorAll(`.${parent.children[key].className}`).forEach(input => {
        input.checked = false;
      });
      parent.children[key].click()
    }
  }
  window.scroll(0, parent.offsetTop - document.getElementById("header").offsetHeight - 20);
};

const openReview = (event) => {
  document.querySelectorAll(".review_content").forEach(item => {
    if (event.target.textContent === item.id) {
      item.className = "review_content review_visible";
      document.querySelectorAll(`.${event.target.className}`).forEach(button => {
        if (button === event.target) {
          button.className = "review_page active_button";
        } else {
          button.className = "review_page";
        }
      });
    } else {
      item.className = "review_content review_hidden";
    }
  });
};

const reviewIncrease = (event) => {
  const increase = document.querySelector(".increase_wrapper_library");
  increase.className = "increase_wrapper_library open_slider";
  const wrapperImage = document.querySelector(".increase_documents_images")
  wrapperImage.innerHTML = `<img src =${event.target.previousElementSibling.src} alt="review" class="increase_documents_library_photo" />`;
  for (const key in increase.children) {
    if (increase.children[key].tagName === "IMG") {
      increase.children[key].style.visibility = "hidden";
    }
  }
};

const closeList = (e) => {
  const list = document.getElementsByClassName("is_open_menu");
  if (e.target.className !== "navigate_list is_open_menu" && list.length) {
    list[0].className = "navigate_list";
    window.removeEventListener("scroll", closeList);
  }
  if (e.target.className === "navigate_link") {
    e.target.nextElementSibling.className = "navigate_list is_open_menu";
    window.addEventListener("scroll", closeList);
  }
};

window.addEventListener("click", (event) => closeList(event));
