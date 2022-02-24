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
});
