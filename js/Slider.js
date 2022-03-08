export default function Slider() {
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
}
