window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  //  //the first way realise tabs:

  // const tabs = document.querySelectorAll(".tabheader__item"),
  //   tabContent = document.querySelector(".tabcontent"),
  //   fitnes = `

  //           Меню "Фитнес" - это новый подход к приготовлению блюд: больше
  //           свежих овощей и фруктов. Для людей, которые интересуются спортом;
  //           активных и здоровых. Это абсолютно новый продукт с оптимальной
  //           ценой и высоким качеством!
  //           `,
  //   elite = `

  //           Меню “Премиум” - мы используем не только красивый дизайн упаковки,
  //           но и качественное исполнение блюд. Красная рыба, морепродукты,
  //           фрукты - ресторанное меню без похода в ресторан!
  //          `,
  //   post = `

  //           Наше специальное “Постное меню” - это тщательный подбор
  //           ингредиентов: полное отсутствие продуктов животного происхождения.
  //           Полная гармония с собой и природой в каждом элементе! Все будет
  //           Ом!
  //        `,
  //   vegy = `

  //           Меню "Сбалансированное" - это соответствие вашего рациона всем
  //           научным рекомендациям. Мы тщательно просчитываем вашу потребность
  //           в к/б/ж/у и создаем лучшие блюда для вас.
  //           `,
  //   arrTabImg = ["vegy.jpg", "elite.jpg", "post.jpg", "vegy.jpg"],
  //   arrTabImgAlt = ["fitnes", "elite", "post", "vegy"],
  //   arrTabDescr = [fitnes, elite, post, vegy];

  // function tabContentMaker(tabImg, tabImgAlt, tabDescr) {
  //   tabContent.innerHTML = `
  //                       <img src="img/tabs/${tabImg}" alt="${tabImgAlt}" />
  //                       <div class="tabcontent__descr">
  //                       ${tabDescr}
  //                       </div>`;
  // }

  // tabContentMaker(arrTabImg[0], arrTabImgAlt[0], arrTabDescr[0]);

  // tabs.forEach((tab, i) => {
  //   tab.addEventListener("click", () => {
  //     tabContentMaker(arrTabImg[i], arrTabImgAlt[i], arrTabDescr[i]);

  //     tabs.forEach((item) => {
  //       if (item.classList.contains("tabheader__item_active")) {
  //         item.classList.remove("tabheader__item_active");
  //       }
  //     });

  //     tab.classList.add("tabheader__item_active");
  //   });
  // });

  // the second way realise tabs:

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

  // Timer

  const deadline = "2022-03-18";

  function getTimeRemaining(timeOff) {
    const totalTime = Date.parse(timeOff) - Date.parse(new Date()),
      days = Math.floor(totalTime / (1000 * 60 * 60 * 24)),
      hours = Math.floor((totalTime / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((totalTime / (1000 * 60)) % 60),
      seconds = Math.floor((totalTime / 1000) % 60);

    return {
      total: totalTime,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setTimer(selector, timeOff) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateTimer, 1000);

    updateTimer();

    function updateTimer() {
      const remainingTime = getTimeRemaining(timeOff);

      days.innerHTML = setZero(remainingTime.days);
      hours.innerHTML = setZero(remainingTime.hours);
      minutes.innerHTML = setZero(remainingTime.minutes);
      seconds.innerHTML = setZero(remainingTime.seconds);

      if (remainingTime.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setTimer(".timer", deadline);

  // //modal

  const modal = document.querySelector(".modal"),
    openModal = document.querySelectorAll("[data-modal]"),
    modalTimerId = setTimeout(() => {
      modalAction("block", "hidden");
    }, 20000000);

  function modalAction(display = "", overflow = "") {
    document.body.style.overflow = overflow;
    modal.style.display = display;
    clearInterval(modalTimerId);
    window.removeEventListener("scroll", showModalByScroll);
  }
  openModal.forEach((item) => {
    item.addEventListener("click", () => modalAction("block", "hidden"));
  });
  modal.addEventListener("click", (e) =>
    e.target === modal ? modalAction() : modal
  );
  modal.addEventListener("click", (e) => {
    if (e.target && e.target.className === "modal__close") {
      modalAction();
    }
  });

  document.addEventListener("keydown", (e) =>
    e.code === "Escape" ? modalAction() : modal
  );

  function showModalByScroll() {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1) {
      modalAction("block", "hidden");
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // openModal.forEach((item) => {
  //   item.addEventListener("click", () => {
  //     // modal.style.display = "block";
  //     // document.body.style.overflow = "hidden";
  //     modalAction("block", "hidden");
  //   });
  // });

  // modal.addEventListener("click", (e) => {
  //   if (e.target === modal) {
  //     // modal.style.display = "";
  //     // document.body.style.overflow = "";
  //     modalAction("", "");
  //   }
  // });

  // closeModal.addEventListener("click", () => {
  //   // modal.style.display = "";
  //   // document.body.style.overflow = "";
  //   modalAction("", "");
  // });

  // //// ------MenuCards

  class MenuCards {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
    }

    render() {
      const div = document.createElement("div");
      if (this.classes === [] || this.classes[0] !== "menu__item") {
        this.classes.unshift("menu__item");
      }
      this.classes.forEach((className) => div.classList.add(className));
      div.innerHTML = `           
      <img src=${this.src} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
      ${this.descr}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total">
          <span>${this.price}</span> грн/день
        </div>
      </div>    
      `;

      this.parent.append(div);
    }
  }

  new MenuCards(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих  овощей и фруктов.
     Продукт активных и здоровых людей. Это абсолютно новый  продукт с оптимальной ценой и высоким качеством!`,
    229,
    ".menu .container",
    // "menu__item",
    "test-class-name"
  ).render();

  new MenuCards(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    `В меню “Премиум” мы используем не только красивый дизайн упаковки,
      но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    550,
    ".menu .container"
    // "menu__item"
  ).render();

  new MenuCards(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения,
     молоко из миндаля,  овса, кокоса или гречки, правильное количество белков за счет тофу   .`,
    430,
    ".menu .container"
    // "menu__item"
  ).render();

  //  ///form

  const forms = document.querySelectorAll("form");

  forms.forEach((item) => {
    postData(item);
  });

  const message = {
    loading: "img/form/spinner.svg",
    success: "We call back soon!",
    failure: "Something is wrong",
  };

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const messageBlock = document.createElement("img");
      messageBlock.setAttribute("src", message.loading);
      messageBlock.style.cssText = `
      display:block;
      margin:0 auto;`;
      form.insertAdjacentElement("afterend", messageBlock);
      const formData = new FormData(form);
      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });

      fetch("server.php", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((data) => data.text())
        .then((data) => {
          messageBlock.remove();
          showFormStatusInfo(message.success);
          console.log(data);
        })
        .catch(() => {
          messageBlock.remove();
          showFormStatusInfo(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showFormStatusInfo(info) {
    modalAction("block", "hidden");
    const modalContent = document.querySelector(".modal__content"),
      parentModalContent = document.querySelector(".modal__dialog"),
      modalInfo = document.createElement("div");

    modalContent.style.display = "none";
    modalInfo.classList.add("modal__content");
    modalInfo.innerHTML = `     
          <form action="#">
            <div data-close  class="modal__close">×</div>
            <div class="modal__title">
              ${info}
            </div>
          </form>        
    `;

    parentModalContent.append(modalInfo);

    setTimeout(() => {
      modalInfo.remove();
      modalAction();
      modalContent.style.display = "";
    }, 4000);
  }

  // jsonPlaceHolder

  // fetch("https://jsonplaceholder.typicode.com/", {
  //   method: "POST",
  //   body: JSON.stringify({ name: "Nick" }),
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));

  // json-server

  // fetch("http://localhost:3000/menu")
  //   .then((data) => data.json())
  //   .then((dataJson) => console.log(dataJson));
});
