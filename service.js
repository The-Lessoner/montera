const openService = (element) => {
  const children = element.children;
  for (const key in children) {
    if (children[key].tagName) {
      if (children[key].className.split(" ").filter(value => value === "services_type_content").length) {
        children[key].animate([
          {
            height: "0px",
            position: "relative",
          },
          {
            height: `${children[key].clientHeight}px`,
            visibility: "visible",
            position: "relative",
          }
        ], {
          duration: 200,
          fill: "both"
        });
      }
    }
  }
};

const closeAllServices = () => {
  const allWorksType = document.getElementsByClassName("services_type_content");
  for (const key in allWorksType) {
    if (allWorksType[key].tagName) {
      allWorksType[key].parentElement.name = "";
      allWorksType[key].animate([
        {},
        {
          visibility: "hidden",
          position: "absolute",
        }
      ], {
        duration: 0,
        fill: "both"
      });
    }
  }
};

const openWorkType = (element) => {
  closeAllServices();
  lightScroll(element.name);
  const service = document.getElementById(element.name);
  service.name = "open";
  openService(service);
};

const openClickElement = (element) => {
  if (!element.name) {
    closeAllServices();
    openService(element);
    element.name = "open";
  } else {
    closeAllServices();
  }
};