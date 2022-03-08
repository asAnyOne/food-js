export default function Calc() {
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
}
