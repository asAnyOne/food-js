export default function MenuCards() {
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
  //     но и качественное исполнение блюд. Красная рыба, морепродукты,
  //    фрукты - ресторанное меню без похода в ресторан!`,
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
}
