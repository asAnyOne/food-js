export default function Modal() {
  const modal = document.querySelector(".modal"),
    openModal = document.querySelectorAll("[data-modal]"),
    modalTimerId = setTimeout(() => {
      modalAction("block", "hidden");
    }, 2000000);

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
  return modalAction;
}
