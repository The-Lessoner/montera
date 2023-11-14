const inform = [
  "На данный момент у нас уже выстроены долгосрочные отношения с рядом крупных организаций по городу Гродно и Гродненской области. Мы понимаем, что каждый проект уникален и требует индивидуального подхода. Поэтому мы тщательно изучаем потребности и цели каждого клиента, чтобы предложить оптимальное решение, которое будет соответствовать их ожиданиям.",
  "Также мы придерживаемся высоких стандартов качества и безопасности на всех этапах строительства. Мы работаем с проверенными поставщиками материалов и используем современное оборудование, чтобы гарантировать надежность и долговечность наших объектов.",
  "Мы уже гордимся нашими достижениями и успешно реализованными объектами. Однако, мы не останавливаемся на достигнутом и всегда ищем новые возможности для роста и развития. Строим будущее вместе с нашими клиентами и всеми, кто разделяет нашу идею создания лучшей среды для жизни и работы. Если вы ищите надежного и профессионального партнера для реализации своих строительных проектов, обратитесь к нам. Мы с удовольствием поможем Вам воплотить ваши идеи в реальность и создать объект, которым будете гордиться."
];
const content = document.querySelector(".about_wrapper_text");

const runCheck = () => {
  addEventListener("scroll", checkScroll);
};

const checkScroll = () => {
  const button = document.querySelector(".about_button");
  const field = document.querySelector(".about_history");
  let top = field.getBoundingClientRect().top;
  let height = field.getBoundingClientRect().height;
  if (top <= -height || top >= height) {
    const firstTExt = content.firstElementChild;
    content.innerHTML = "";
    content.appendChild(firstTExt);
    button.style.visibility = "visible";
    removeEventListener("scroll", checkScroll);
  }
};

const addText = (index) => {
  let letter = 0;
  const text = document.createElement("p");
  text.className = "about_text";
  content.appendChild(text);
  const id = setInterval(() => {
    letter += 1;
    text.innerText = inform[index].slice(0, letter);
    if (letter === inform[index].length) {
      clearInterval(id);
      index += 1;
      if (index < inform.length) {
        addText(index);
      } else {
        runCheck()
      }
    }
  }, 20);
};

const closeAboutCompany = (button) => {
  button.style.visibility = "hidden";
  addText(0);
};