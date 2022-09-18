import Tabs from "./modules/Tabs";
import Timer from "./modules/Timer";
import Modal from "./modules/Modal";
import MenuCards from "./modules/MenuCards";
import Form from "./modules/Form";
import Slider from "./modules/Slider";
import Calc from "./modules/Calc";

window.addEventListener("DOMContentLoaded", () => {
  Tabs({
    tabContent: ".tabcontent",
    tabItem: ".tabheader__item",
    tabItems: ".tabheader__items",
    activeClass: "tabheader__item_active",
  });
  Timer({ selector: ".timer", deadline: "2022-12-18" });
  Modal();
  MenuCards();
  Form();
  Slider({
    selSlides: ".offer__slide",
    selPrev: ".offer__slider-prev",
    selNext: ".offer__slider-next",
    selCurrent: "#current",
    selTotal: "#total",
    selSliderWrapper: ".offer__slider-wrapper",
    selSliderInner: ".offer__slider-inner",
  });
  Calc();
});
