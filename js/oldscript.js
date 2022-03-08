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

  // const menuCardsMaker = async (url) => {
  //   const dataArr = await fetch(url).then((data) => data.json());
  //   dataArr.forEach((data) => {
  //     new MenuCards(
  //       data.img,
  //       data.altimg,
  //       data.title,
  //       data.descr,
  //       data.price,
  //       ".menu .container"
  //     ).render();
  //   });
  // };
  const menuCardsMaker = async (url) => {
    const dataArr = await fetch(url).then((data) => data.json());
    dataArr.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCards(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  };
  menuCardsMaker("http://localhost:3000/menu");

  // new MenuCards(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   'Меню "Фитнес"',
  //   `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих  овощей и фруктов.
  //    Продукт активных и здоровых людей. Это абсолютно новый  продукт с оптимальной ценой и высоким качеством!`,
  //   229,
  //   ".menu .container",
  //   // "menu__item",
  //   "test-class-name"
  // ).render();

  // new MenuCards(
  //   "img/tabs/elite.jpg",
  //   "elite",
  //   "Меню “Премиум”",
  //   `В меню “Премиум” мы используем не только красивый дизайн упаковки,
  //     но и качественное исполнение блюд.
  // Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
  //   550,
  //   ".menu .container"
  //   // "menu__item"
  // ).render();

  // new MenuCards(
  //   "img/tabs/post.jpg",
  //   "post",
  //   'Меню "Постное"',
  //   `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения,
  //    молоко из миндаля,  овса, кокоса или гречки, правильное количество белков за счет тофу   .`,
  //   430,
  //   ".menu .container"
  //   // "menu__item"
  // ).render();

  //  ///form

  const forms = document.querySelectorAll("form");

  forms.forEach((item) => {
    sendPostData(item);
  });

  const message = {
    loading: "img/form/spinner.svg",
    success: "We call back soon!",
    failure: "Something is wrong",
  };

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: data,
    });
    return await result.json();
  };

  function sendPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const messageBlock = document.createElement("img");
      messageBlock.setAttribute("src", message.loading);
      messageBlock.style.cssText = `
      display:block;
      margin:0 auto;`;
      form.insertAdjacentElement("afterend", messageBlock);
      const formData = new FormData(form);
      // const obj = {};
      // formData.forEach((value, key) => {
      //   obj[key] = value;
      // });

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
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

  //////       slider

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    sliderWrapper = document.querySelector(".offer__slider-wrapper"),
    sliderInner = sliderWrapper.querySelector(".offer__slider-inner"),
    circleWrapper = document.createElement("div"),
    width = window.getComputedStyle(sliderWrapper).width;
  let slideIndex = 1;
  let innerOffset = 0;

  circleWrapper.style.cssText = `
  display: flex;
  min-width: 80px; 
  margin: 0 auto;  
  padding-top: 30px;
  justify-content: space-between;`;
  sliderWrapper.after(circleWrapper);
  for (let i = 0; i < slides.length; i++) {
    const el = document.createElement("span");
    el.classList.add(i + 1);
    el.style.cssText = `
      display:block;
      height:10px;
      width:10px;
      margin:0 10px;
      border-radius:100%;
      background-color:#cfc7c7;
      cursor:pointer;
      `;
    circleWrapper.append(el);
  }

  circleWrapper.children[0].style.backgroundColor = "red";

  circleWrapper.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "SPAN") {
      slideIndex = e.target.className;
      countSlide(true);
      innerOffset = 100 - slideIndex * 100;
      sliderInner.style.marginLeft = innerOffset + "%";
      circleWrapper.childNodes.forEach(
        (item) => (item.style.backgroundColor = " #cfc7c7")
      );
      circleWrapper.children[e.target.className - 1].style.backgroundColor =
        "red";
    }
  });

  sliderInner.style.width = slides.length * 100 + "%";
  sliderInner.style.display = "flex";
  sliderInner.style.transition = "1s all";

  current.textContent = "01";

  sliderWrapper.style.overflow = "hidden";
  slides.forEach((slide) => (slide.style.width = width));

  countSlide();
  function showSlide(n) {
    innerOffset += n;

    circleWrapper.childNodes.forEach(
      (item) => (item.style.backgroundColor = " #cfc7c7")
    );
    circleWrapper.children[-innerOffset / 100].style.backgroundColor = "red";
    sliderInner.style.marginLeft = innerOffset + "%";
  }
  function countSlide(a = false) {
    if (a) {
      if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
    } else {
      if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
      } else {
        total.textContent = slides.length;
      }
    }
  }

  function listenEvent(a = false) {
    if (a) {
      slideIndex++;
      if (innerOffset <= 100 - slides.length * 100) {
        innerOffset = 100;
        slideIndex = 1;
      }
      countSlide(true);
      showSlide(-100);
    } else {
      slideIndex--;
      if (innerOffset >= 0) {
        innerOffset = -slides.length * 100;
        slideIndex = slides.length;
      }
      countSlide(true);
      showSlide(100);
    }
  }
  next.addEventListener("click", listenEvent);
  prev.addEventListener("click", () => {
    listenEvent(false);
  });

  //////////////// the first way
  // let index = 1;
  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // function showSlide(i) {
  //   if (i > slides.length) {
  //     index = 1;
  //   }
  //   if (i < 1) {
  //     index = slides.length;
  //   }

  //   slides.forEach((slide) => (slide.style.display = "none"));
  //   slides[index - 1].style.display = "";

  //   if (index < 10) {
  //     current.textContent = `0${index}`;
  //   } else {
  //     current.textContent = index;
  //   }
  // }

  // showSlide(index);

  // function plusSlide(n) {
  //   showSlide((index += n));
  // }
  // prev.addEventListener("click", () => {
  //   plusSlide(-1);
  // });
  // next.addEventListener("click", () => {
  //   plusSlide(1);
  // });
  /////////////////////////////////////second way
  // let index = 1;
  // showSlide(index);
  // function showSlide(i) {
  //   slides.forEach((slide) => (slide.style.display = "none"));
  //   slides[i - 1].style.display = "";

  //   current.textContent = `0${i}`;
  //   total.textContent = `0${slides.length}`;
  // }

  // prev.addEventListener("click", () => {
  //   if (index == 1) {
  //     showSlide(slides.length);
  //     index = slides.length;
  //   } else {
  //     index--;
  //     showSlide(index);
  //     console.log(index);
  //   }
  // });
  // next.addEventListener("click", () => {
  //   if (index == slides.length) {
  //     index = 1;
  //     showSlide(1);
  //   } else {
  //     index++;
  //     showSlide(index);
  //   }
  // });

  /////        calc

  const genderParent = document.querySelector("#gender"),
    gender = genderParent.querySelectorAll(".calculating__choose-item"),
    inputBtn = document.querySelector(".calculating__choose_medium "),
    inputs = inputBtn.querySelectorAll("input"),
    activeParent = document.querySelector(".calculating__choose_big"),
    active = activeParent.querySelectorAll(".calculating__choose-item"),
    calcResultParent = document.querySelector(".calculating__result span"),
    activity = { low: 1.2, small: 1.375, medium: 1.55, high: 1.725 };

  let paramObj = {},
    act = "calculating__choose-item_active";

  gender.forEach((item, i) => {
    item.addEventListener("click", () => {
      gender.forEach((item) => {
        item.classList.remove(act);
      });
      item.classList.add(act);

      active.forEach((item) => {
        if (item.classList[1] == act) {
          showResult(activity[item.id]);
        }
      });
      localStorage.setItem("gender", i);
    });
  });
  inputBtn.addEventListener("input", (e) => {
    if (e.target.value.match(/\D/g)) {
      e.target.style.cssText = `
       border :1px solid red;
       color : red;
       font-size:16px;`;

      e.target.value = "enter a number";
      setTimeout(() => {
        e.target.style.cssText = "";
        e.target.value = "";
      }, 2500);
    }
    if (e.target && e.target.tagName == "INPUT") {
      paramObj[e.target.id] = e.target.value;
      localStorage.setItem(e.target.id, e.target.value);
      showResult();
    }
  });
  active.forEach((item, i) => {
    item.addEventListener("click", () => {
      active.forEach((item) => {
        item.classList.remove(act);
      });
      item.classList.add(act);
      showResult(activity[item.id]);
      localStorage.setItem("active", i);
    });
  });

  function showResult(act = activity.small) {
    if (!paramObj.weight || !paramObj.height || !paramObj.age) {
      calcResultParent.textContent = "____";
    } else {
      if (gender[0].classList[1] == act) {
        calcResultParent.innerHTML = Math.floor(
          (44.76 +
            9.2 * paramObj.weight +
            3.1 * paramObj.height +
            4.3 * paramObj.age) *
            act
        );
      } else {
        calcResultParent.innerHTML = Math.floor(
          (88.36 +
            13.4 * paramObj.weight +
            4.8 * paramObj.height +
            5.7 * paramObj.age) *
            act
        );
      }
    }

    localStorage.setItem("personAction", act);
    localStorage.setItem("personParams", JSON.stringify(paramObj));
  }
  if (localStorage.personParams || localStorage.active || localStorage.gender) {
    paramObj = JSON.parse(localStorage.personParams);
    active[localStorage.active].classList.add(act);
    gender[localStorage.gender].classList.add(act);
    inputs.forEach((input) => {
      switch (input.id) {
        case "weight":
          input.value = localStorage.weight;
          break;
        case "age":
          input.value = localStorage.age;
          break;
        case "height":
          input.value = localStorage.height;
          break;
      }
    });
    showResult(localStorage.personActions);
  } else {
    showResult(activity.small);
    gender[0].classList.add(act);
    active[1].classList.add(act);
  }
});
