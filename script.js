const lightScroll = (name) => {
  const burgerId = document.getElementById("burger");
  burgerId.checked = false;
  const parent = document.getElementById(name);
  for (const key in parent.children) {
    if (parent.children[key].tagName === "INPUT") {
      document.querySelectorAll(`.${parent.children[key].className}`).forEach(input => {
        if (input.checked) {
          input.click();
        }
      });
      parent.children[key].click();
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
  const wrapper = document.createElement("div");
  wrapper.className = "increase_wrapper";
  document.body.appendChild(wrapper);
  const image = event.target.previousElementSibling.cloneNode();
  image.className = "increase_image";
  wrapper.appendChild(image);
};

const closeReview = (event) => {
  event.target.parentElement.remove();
};

const closeList = (e) => {
  const list = document.getElementsByClassName("is_open_menu");
  if (e.target.className !== "navigate_list is_open_menu" && list.length) {
    list[0].className = "navigate_list";
    window.removeEventListener("scroll", closeList);
  }
  if (e.target.className === "navigate_link" && e.target.nextElementSibling) {
    e.target.nextElementSibling.className = "navigate_list is_open_menu";
    window.addEventListener("scroll", closeList, {passive: true});
  }
};

window.addEventListener("click", (event) => closeList(event), {passive: true});
