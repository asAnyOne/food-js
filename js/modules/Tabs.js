export default function Tabs({ tabContent, tabItem, tabItems, activeClass }) {
  const tabContents = document.querySelectorAll(tabContent),
    tabs = document.querySelectorAll(tabItem),
    tabsParent = document.querySelector(tabItems);

  function tabsHide() {
    tabContents.forEach((content) => {
      content.classList.add("hide");
      content.classList.remove("fade");
    });
    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }
  function tabsShow(i = 0) {
    tabContents[i].classList.remove("hide");
    tabContents[i].classList.add("fade");
    tabs[i].classList.add(activeClass);
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
