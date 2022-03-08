export default function Tabs() {
  const tabContents = document.querySelectorAll(".tabcontent"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsParent = document.querySelector(".tabheader__items");

  function tabsHide() {
    tabContents.forEach((content) => {
      content.classList.add("hide");
      content.classList.remove("fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  function tabsShow(i = 0) {
    tabContents[i].classList.remove("hide");
    tabContents[i].classList.add("fade");
    tabs[i].classList.add("tabheader__item_active");
  }
  tabsHide();
  tabsShow();

  tabsParent.addEventListener("click", (event) => {
    tabs.forEach((item, i) => {
      if (event.target == item) {
        tabsHide();
        tabsShow(i);
      }
    });
  });
}
