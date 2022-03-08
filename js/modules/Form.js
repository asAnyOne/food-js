import Modal from "./Modal";

export default function Form() {
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
    Modal("block", "hidden");
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
      Modal();
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
}
